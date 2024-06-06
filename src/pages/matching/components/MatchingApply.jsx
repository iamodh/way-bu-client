import styled from "styled-components";
import { useRecoilState } from "recoil";
import { loggedInUserState, loggedInUserProfileState } from "../../../atom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { client } from "../../../../libs/supabase";
import { useForm } from "react-hook-form";
import { Button, FrameWrapper, FrameParent, TitleBox, TitleText, TagGroup, Text, Group, GroupDiv,TextBox, Schedule, RequiredBox, ButtonText, GroupRoot } from "./MatchingLayout";

const MembersContainer = styled.div`
  display: flex;
  font-weight: bold;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.1);
  height: 40px;
  width: 450px;
  border-radius: var(--br-8xs);
  gap: var(--gap-5xs);
  cursor: pointer;
  @media screen and (max-width: 376px) {
    width: 240px;
    height: 30px;
    line-height: 30px;
  }
`;

const UserProfile = styled.div`
  display: flex;
`;

const Avatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
  margin: 5px;
  @media screen and (max-width: 376px) {
    width: 20px;
    height: 20px;
    border-radius: 50%;
  }
`;

// const Nickname = styled.div`
//   text-align: center;
//   font-size: 8px;
// `;


const Textbox1 = styled.div`
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 100px;
  border-radius: 5px;
  border: none;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  text-align: left;
  font-size: var(--font-size-m);
  color: var(--color-navy);
  padding: 10px;
  resize: none;
  outline: none;
  @media screen and (max-width: 376px) {
    width: 300px;
    height: 70px;
    font-size: var(--font-size-s);
  }
`;

const DivRoot = styled.div`
  margin: 0px;
  margin-top: 10px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-sizing: border-box;
  gap: var(--gap-base);
  @media screen and (max-width: 675px) {
    gap: var(--gap-base);
    box-sizing: border-box;
  }
`;

const CommentContainer = styled.div`
  width: 100%;
`;

const CommentForm = styled.form`
  margin: 1rem 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CommentInput = styled.textarea`
  @media (max-width: 768px) {
    height: 3rem;
  }
  height: 3.5rem;
  border-radius: 0.2rem;
  flex: 1;
  padding: 0.3rem;
  border: 1px solid rgba(0, 0, 0, 0.3);
`;

const CommentInputBtn = styled.button`
  @media (max-width: 768px) {
    width: 4rem;
    height: 3rem;
  }
  border: none;
  background-color: var(--color-blue-main);
  color: white;
  height: 3.5rem;
  width: 6rem;
  margin-left: 0.5rem;
  border-radius: 0.2rem;
`;

const CommentBox = styled.div`
  margin: 1rem 0;
  background-color: var(--color-skyblue-background);
  padding: 1rem;
  border-radius: 0.3rem;
`;

const CommentInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const CommentItem = styled.div`
  margin-right: 0.5rem;
  &:nth-child(2) {
    opacity: 0.6;
  }
`;

const CommentContent = styled.div`
  background-color: white;
  margin: 0 1rem;
  padding: 0.5rem;
  border-radius: 0.3rem;
`;

const CommentBtn = styled.button`
  background-color: rgba(0, 0, 0, 0);
  border: none;
  &:hover {
    cursor: pointer;
  }
`;

const MatchingApply = ({ matching, sport, beach }) => {
  const [loggedInUser, setLoggedInUser] = useRecoilState(loggedInUserState);
  const [isHostUser, setIsHostUser] = useState(matching.host_userId === loggedInUser.id);
  const [isApplied, setIsApplied] = useState(false);
  const [isUserJoined, setIsUserJoined] = useState(false);
  const [isMatchingFull, setIsMatchingFull] = useState(false);
  const [userProfiles, setUserProfiles] = useState([]);
  const [comments, setComments] = useState([]);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [loggedInUserProfile, setLoggedInUserProfile] = useRecoilState(loggedInUserProfileState);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  useEffect(() => {
    setIsUserJoined(matching.joining_users && matching.joining_users.includes(loggedInUser.id));
  }, [matching, loggedInUser.id]);

  useEffect(() => {
    setIsHostUser(matching.host_userId === loggedInUser.id);
  }, [matching.host_userId, loggedInUser.id]);

  useEffect(() => {
    const currentParticipants = matching.joining_users ? matching.joining_users.length : 0;
    if (currentParticipants >= matching.total_people) {
      matching.state = "모집완료";
      setIsMatchingFull(true);
    } else {
      matching.state = "모집중";
      setIsMatchingFull(false);
    }
  }, [matching]);

  useEffect(() => {
    const fetchComments = async () => {
      const comments = await getComments(matching.id);
      setComments(comments);
    };
    fetchComments();
  }, [matching.id]);

  const getUserProfiles = async (userIds) => {
    try {
      const { data, error } = await client
        .from('USER_PROFILE')
        .select('id, avatar_url, user_nickname')
        .in('user_id', userIds);
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching user profiles:', error.message);
      return [];
    }
  };

  const formatTime = (time) => {
    const date = new Date(time);
    const koreanDate = new Date(
      date.toLocaleString("en-US", { timeZone: "Asia/Seoul" })
    );
    const padZero = (num) => String(num).padStart(2, "0");
    const formattedDate = `${koreanDate.getFullYear()}.${padZero(
      koreanDate.getMonth() + 1
    )}.${padZero(koreanDate.getDate())}.${padZero(
      koreanDate.getHours()
    )}:${padZero(koreanDate.getMinutes())}:${padZero(koreanDate.getSeconds())}`;

    return formattedDate;
  };

  const getComments = async (matchingId) => {
    try {
      const { data, error } = await client
        .from('MATCHING_COMMENT')
        .select('*')
        .eq('matching_id', matchingId);
      if (error) {
        throw error;
      }
      return data;
    } catch (error) {
      console.error('Error fetching comments:', error.message);
      return [];
    }
  };

  const onCommentSubmit = async (formData) => {
    const { content } = formData;
    try {
      const { data, error } = await client
        .from('MATCHING_COMMENT')
        .insert([{
          matching_id: matching.id,
          user_id: loggedInUser.id,
          content: content,
          user_nickname: loggedInUserProfile.user_nickname,
        }]);
      if (error) {
        throw error;
      }
      const updatedComments = await getComments(matching.id);
      setComments(updatedComments);
      reset();  // Reset the form fields after submission
    } catch (error) {
      console.error('Error adding comment:', error.message);
    }
  };

  const startEditComment = (comment) => {
    setEditingCommentId(comment.id);
    setEditContent(comment.content);
  };

  const saveEditComment = async (commentId) => {
    try {
      const { data, error } = await client
        .from("MATCHING_COMMENT")
        .update({ content: editContent, updated_at: new Date() })
        .eq("id", commentId);
      if (error) {
        console.error(error.message);
        return;
      }
      setEditingCommentId(null);
      setEditContent("");
      const updatedComments = await getComments(matching.id);
      setComments(updatedComments);
    } catch (error) {
      console.error('Error updating comment:', error.message);
    }
  };

  const deleteComment = async (commentId) => {
    try {
      const { data, deleteError } = await client
        .from("MATCHING_COMMENT")
        .delete()
        .eq("id", commentId);
      if (deleteError) {
        throw new Error(deleteError.message);
      }
      const updatedComments = await getComments(matching.id);
      setComments(updatedComments);
    } catch (error) {
      console.error(error.message);
      return;
    }
  };

  const commentList = () => {
    comments.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    const list = comments.map((comment, key) => {
      return (
        <CommentBox key={comment.id}>
          <CommentInfo>
            <CommentItem>{comment.user_nickname}</CommentItem>
            <CommentItem>{formatTime(comment.created_at)}</CommentItem>
            {comment.updated_at && (
              <CommentItem>{formatTime(comment.updated_at)} 수정됨</CommentItem>
            )}
            {loggedInUser && comment.user_id === loggedInUser.id && (
              <>
                <CommentBtn onClick={() => startEditComment(comment)}>수정하기</CommentBtn>
                <CommentBtn onClick={() => deleteComment(comment.id)}>삭제하기</CommentBtn>
              </>
            )}
          </CommentInfo>
          {editingCommentId === comment.id ? (
            <div>
              <input
                type="text"
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
              />
              <button onClick={() => saveEditComment(comment.id)}>Save</button>
              <button onClick={() => setEditingCommentId(null)}>Cancel</button>
            </div>
          ) : (
            <CommentContent>{comment.content}</CommentContent>
          )}
        </CommentBox>
      );
    });
    return list;
  };

  useEffect(() => {
    const fetchUserProfiles = async () => {
      if (matching.joining_users) {
        const profiles = await getUserProfiles(matching.joining_users);
        setUserProfiles(profiles);
      }
    };
    fetchUserProfiles();
  }, [matching.joining_users]);

  const handleButtonClick = async () => {
    if (isHostUser) {
      return;
    } else {
      if (isUserJoined) {
        const cancel = window.confirm('매칭을 취소하시겠습니까?');
        if (cancel) {
          setIsUserJoined(false);
          try {
            const updatedJoiningUsers = Array.isArray(matching.joining_users) ? matching.joining_users.filter(userId => userId !== loggedInUser.id) : [];
            await client
              .from('MATCHING')
              .update({ joining_users: updatedJoiningUsers })
              .eq('id', matching.id);
            window.location.reload();
          } catch (error) {
            console.error('Error cancelling application for matching:', error.message);
            setIsUserJoined(true);
          }
        }
      } 
    }
  };

  return (
    <FrameWrapper>
      <FrameParent key={matching.id}>
        <TitleBox>
          <TitleText>{matching.title}</TitleText>
        </TitleBox>
        <TagGroup>
          <Text style={{width:"110px"}}>#{sport.title}</Text>
          <Text>#{matching.difficulty}</Text>
          <Text style={{width:"150px"}}>#{beach.beach_name}</Text>
        </TagGroup>
        <Group>
          <GroupDiv>
            <TextBox>참가인원</TextBox>
            <Text>{matching.joining_users ? matching.joining_users.length : 0}/{matching.total_people}명</Text>
          </GroupDiv>
          <GroupDiv>
            <TextBox>모집상태</TextBox>
            <Text>{matching.state}</Text>
          </GroupDiv>
        </Group>
        <GroupDiv style={{paddingTop:"0px"}}>
          <TextBox>일정</TextBox>
          <Schedule>{matching.matching_date} {matching.matching_time}</Schedule>
        </GroupDiv>
        <GroupDiv style={{ paddingTop: "0px" }}>
          <TextBox>멤버</TextBox>
          <MembersContainer>
            {userProfiles.map(profile => (
              <UserProfile key={profile.id} style={{display:"flex", flexDirection:"column"}}>
                <Avatar src={profile.avatar_url} alt="user avatar"  />
                {/* <Nickname>{profile.user_nickname}</Nickname> */}
              </UserProfile>
            ))}
          </MembersContainer>
        </GroupDiv>
        <GroupRoot>
          <RequiredBox>{matching.required}<br/><br/>준비물 : {matching.necessity_details}</RequiredBox>
          <Textbox1>
            <CommentContainer>
              <CommentForm onSubmit={handleSubmit(onCommentSubmit)}>
                <CommentInput
                  {...register("content", { required: "댓글을 입력해주세요" })}
                  col="3"
                ></CommentInput>
                <CommentInputBtn type="submit">댓글 추가</CommentInputBtn>
              </CommentForm>
            </CommentContainer>
            {commentList()}
          </Textbox1>
          {isHostUser ? (
            <Link to={`/matching/update/${matching.id}`}>
              <Button>
                <ButtonText>수정하기</ButtonText>
              </Button>
            </Link>
          ) : (
            <Button onClick={handleButtonClick}>
              <ButtonText>신청 취소하기</ButtonText>
            </Button>
          )}
        </GroupRoot>
      </FrameParent>
    </FrameWrapper>
  );
};

export default MatchingApply;