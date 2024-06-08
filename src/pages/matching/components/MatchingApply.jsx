import styled from "styled-components";
import { useRecoilState } from "recoil";
import { loggedInUserState, loggedInUserProfileState } from "../../../atom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { client } from "../../../../libs/supabase";
import { useForm } from "react-hook-form";
import { Button, FrameWrapper, FrameParent, TitleBox, TitleText, TagGroup, Text, Group, GroupDiv,TextBox, Schedule, RequiredBox, ButtonText, GroupRoot, ButtonGroup, TextDifficulty, TextBeach, TextSport, TextHost, TextState } from "./MatchingLayout";

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
    width: 260px;
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

const CommentWrapper = styled.div`
  width: 550px;
  height: auto;
  overflow: auto;
  padding: 25px 0px;
  @media screen and (max-width: 376px) {
    width: 330px;
    height: auto;
    padding: 15px 0px;
  }
`;

const CommentForm = styled.form`
  width: 550px;
  display: flex;
  gap: var(--gap-9xs);
  @media screen and (max-width: 376px) {
    width: 330px;
    gap: var(--gap-5xs);
  }
`;

const CommentInput = styled.textarea`
  width: 466px;
  height: 40px;
  resize: none;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.1);
  border: none;
  border-radius: 5px;
  @media screen and (max-width: 376px) {
    width: 250px;
    height: 30px;
    font-size: var(--font-size-s);
  }
`;

const CommentInputBtn = styled.button`
  width: 80px;
  height: 40px;
  background-color: var(--color-blue-main);
  border: none;
  border-radius: 5px;
  color: white;
  @media screen and (max-width: 376px) {
    width: 70px;
    height: 30px;
    font-size: var(--font-size-s);
  }
`;

const CommentBox = styled.div`
  padding: 5px;
  width: 550px;
  height: auto;
  margin-top: 15px;
  margin-bottom: 0px;
  background-color: aliceblue;
  @media screen and (max-width: 376px) {
    width: 320px;
  }
`;

const CommentInfo = styled.div`
  padding-left: 5px;
  height: 16px;
  line-height: 16px;
  display: flex;
  align-items: center;
  margin-bottom: 1px;
  gap: var(--gap-3xs);
  @media screen and (max-width: 376px) {
    width: 320px;
  }
`;

const CommentName = styled.div`
  font-weight: bold;
  background-color: aliceblue;
  font-size: 15px;
  @media screen and (max-width: 376px) {
    font-size: 12px;
  }
`;

const CommentTime = styled.div`
  opacity: 0.5;
  font-size: var(--font-size-s);
  @media screen and (max-width: 376px) {
    font-size: var(--font-size-xs);
  }
`;

const EditBtn = styled.button`
  background-color: var(--color-blue-main);
  border: none;
  color: white;
  font-size: var(--font-size-s);
  padding: 3px 5px;
  border-radius: 3px;
  cursor: pointer;
`;

const CommentContent = styled.div`
  background-color: white;
  width: 540px;
  height:auto;
  line-height: 19px;
  padding: 3px 8px;
  font-size: var(--font-size-s);
  text-align: left;
  @media screen and (max-width: 376px) {
    width: 310px;
  }
`;

const CommentBtnBox = styled.div`
  @media screen and (max-width: 376px) {
    gap: var(--gap-9xs);
    margin-bottom: 6px;
  }
`;

const CommentBtn = styled.button`
  background-color: transparent;
  font-size: var(--font-size-s);
  border: none;
  &:hover {
    cursor: pointer;
  }
  @media screen and (max-width: 376px) {
    font-size: var(--font-size-xs);
  }
`;

const EditInput = styled.input`
  width: 200px;
`;

const Edit = styled.div`
  display: flex;
  flex-direction: row;
  gap: var(--gap-9xs);
  margin-left: 5px;
  margin-top: 5px;
`;

const MatchingApply = ({ matching, sport, beach, hostProfile }) => {
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
      const confirmEdit = window.confirm("댓글을 수정하시겠습니까?");
      if (!confirmEdit) {
        return;
      }
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
      const confirmDelete = window.confirm("댓글을 삭제하시겠습니까?");
      if (!confirmDelete) {
        return;
      }
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
            <CommentName>{comment.user_nickname}</CommentName>
            <CommentTime>{formatTime(comment.created_at)}</CommentTime>
            {comment.updated_at && (
              <CommentTime>{formatTime(comment.updated_at)} 수정됨</CommentTime>
            )}
            {loggedInUser && comment.user_id === loggedInUser.id && (
              <CommentBtnBox>
                <CommentBtn onClick={() => startEditComment(comment)}>수정하기</CommentBtn>
                <CommentBtn onClick={() => deleteComment(comment.id)}>삭제하기</CommentBtn>
              </CommentBtnBox>
            )}
          </CommentInfo>
          {editingCommentId === comment.id ? (
            <Edit>
              <EditInput
                type="text"
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
              />
              <EditBtn onClick={() => saveEditComment(comment.id)}>수정</EditBtn>
              <EditBtn onClick={() => setEditingCommentId(null)}>취소</EditBtn>
            </Edit>
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

  const handleDeleteMatching = async () => {
    const confirmDelete = window.confirm('매칭을 삭제하시겠습니까?');
    if (confirmDelete) {
      try {
        await client.from('MATCHING').delete().eq('id', matching.id);
        window.location.reload();
      } catch (error) {
        console.error('Error deleting matching:', error.message);
      }
    }
  };

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

  const closeModal = () => {
    document.body.style.overflow = 'auto';
  };

  const formatScheduleTime = (timeString) => {
    const [hour, minute] = timeString.split(':');
    return `${hour}시${minute}분`;
  };
  
  return (
    <FrameWrapper>
      <FrameParent key={matching.id}>
        <TitleBox>
          <TitleText>{matching.title}</TitleText>
        </TitleBox>
        <TagGroup>
          <TextSport>#{sport.title}</TextSport>
          <TextDifficulty>#{matching.difficulty}</TextDifficulty>
          <TextBeach>#{beach.beach_name}</TextBeach>
        </TagGroup>
        <Group>
          <GroupDiv>
            <TextBox>참가인원</TextBox>
            <TextState>{matching.joining_users ? matching.joining_users.length : 0}/{matching.total_people}명</TextState>
          </GroupDiv>
          <GroupDiv style={{paddingLeft:"0px"}}>
            <TextBox>모집상태</TextBox>
            <Text>{matching.state}</Text>
          </GroupDiv>
        </Group>
        <Group style={{marginTop:"0px"}}>
          <GroupDiv style={{paddingTop:"0px"}}>
            <TextBox>일정</TextBox>
            <Schedule>{matching.matching_date} {formatScheduleTime(matching.matching_time)}</Schedule>
          </GroupDiv>
          <GroupDiv style={{paddingTop:"0px", paddingLeft:"0px"}}>
            <TextBox>호스트</TextBox>
            <TextHost>{hostProfile ? hostProfile.user_nickname : "불러오는 중..."}</TextHost>
          </GroupDiv>
        </Group>
        <GroupDiv style={{ paddingTop: "0px"}}>
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
          <RequiredBox>
            상세위치: {matching.location}<br/><br/>
            {matching.necessity_details ? `준비물 : ${matching.necessity_details}` : '준비물이 없습니다.'}<br/><br/>
            [공지사항]<br />
            {matching.required}
          </RequiredBox>
        </GroupRoot>
        <GroupRoot>
          <CommentWrapper>
            <CommentForm onSubmit={handleSubmit(onCommentSubmit)}>
              <CommentInput
                {...register("content", { required: "댓글을 입력해주세요" })}
              ></CommentInput>
              <CommentInputBtn type="submit">댓글 추가</CommentInputBtn>
            </CommentForm>
            {commentList()}
          </CommentWrapper>
        </GroupRoot>
          <ButtonGroup>
            {
              isHostUser ? (
                <>
                  <Link to={`/matching/update/${matching.id}`}>
                    <Button onClick={closeModal}>
                      <ButtonText>수정하기</ButtonText>
                    </Button>
                  </Link>
                  <Button onClick={handleDeleteMatching}>
                    <ButtonText>삭제하기</ButtonText>
                  </Button>
                </>
              ) : (
                <Button onClick={handleButtonClick}>
                  <ButtonText>매칭 취소하기</ButtonText>
                </Button>
              )
            }
          </ButtonGroup>
      </FrameParent>
    </FrameWrapper>
  );
};

export default MatchingApply;