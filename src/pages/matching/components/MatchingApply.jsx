import styled from "styled-components";
import { useRecoilState } from "recoil";
import { loggedInUserState, loggedInUserProfileState } from "../../../atom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { client } from "../../../../libs/supabase";
import { useForm } from "react-hook-form";

const FrameWrapperRoot = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  max-width: 100%;
  height: 100%;
  gap: var(--gap-base);
  margin: auto;
  @media screen and (max-width: 376px) {
    width: 310px;
    height: 560px;
  }
`;

const Div = styled.div`
  width: 274px;
  position: relative;
  font-size: var(--m-size);
  font-family: var(--l-bold);
  color: var(--gray);
  text-align: center;
  display: inline-block;
  font-weight: bold;
`;

const Title = styled.div`
  margin: 10px;
  box-sizing: border-box;
  max-width: 100%;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  height: 50px;
  width: 95%;
  line-height: 50px;
  text-align: center;
  background-color: aliceblue;
`;

const FrameGroup = styled.nav`
  margin: 0px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: var(--gap-9xs);
  white-space: nowrap;
  margin-bottom: 10px;
  @media screen and (max-width: 750px) {
    flex-wrap: wrap;
  }
`;
const FrameGroup1 = styled.nav`
  margin: 0px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: var(--gap-9xs);
  white-space: nowrap;
  margin-bottom: 10px;
  @media screen and (max-width: 376px) {
  
  }
`;

const Schedulebox = styled.div`
  font-weight: bold;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.1);
  height: 40px;
  line-height: 40px;
  flex: 1;
  border-radius: var(--br-8xs);
  box-sizing: border-box;
  overflow: hidden;
  min-width: 374px;
  max-width: 100%;
 @media screen and (max-width: 376px) {
    min-width: 210px;
    height: 30px;
    line-height: 30px;
    font-size: var(--font-size-s);
  }
`;

const FrameDiv = styled.div`
  width: 767px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: var(--gap-3xs);
  box-sizing: border-box;
  max-width: 100%;
  padding: 5px 10px;
`;
const FrameParent1 = styled.div`
  margin-top: 10px;
  margin-bottom: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  height: 200px;
`;
const Divbox = styled.div`
  padding: 5px;
  border: none;
  border-radius: 5px;
  text-align: center;
  font-weight: bold;
  height: 40px;
  line-height: 30px;
  background-color: var(--color-blue-vivid);
  width: 80px;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.1);
  @media screen and (max-width: 376px) {
    width: 70px;
    height: 30px;
    line-height: 20px;
    font-size: var(--font-size-s);
  }
`
const Textbox = styled.div`
  font-weight: bold;
  height: 256px;
  width: 100%;
  padding: 20px;
  text-align: left;
  box-sizing: border-box;
  font-size: var(--font-size-m);
  background-color: aliceblue;
  border-radius: 15px;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.1);
  @media screen and (max-width: 376px) {
    width: 300px;
    height: 130px;
  }
`;

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

const Button = styled.button`
  border: none;
  width: 150px;
  padding: var(--padding-base) var(--padding-base);
  background-color: var(--color-blue-main);
  color: var(--color-white);
  border-radius: var(--br-3xs);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  &:hover {
    background-color: ${({ disabled }) => (disabled ? 'gray' : 'var(--color-navy)')};
    box-sizing: border-box;
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
const Div2 = styled.div`
  position: relative;
  font-size: var(--font-size-m);
  color: inherit;
  text-align: center;
  display: inline-block;
  white-space: nowrap;
  
`;
const Divbox1 = styled.div`
  padding: 10px;
  border: none;
  border-radius: 5px;
  text-align: center;
  font-weight: bold;
  height: 40px;
  line-height: 20px;
  width: 90px;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.1);
  @media screen and (max-width: 376px) {
    width: 70px;
    height: 30px;
    line-height: 10px;
    font-size: var(--font-size-s);
  }
`

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  margin: 5px;
`;

const Nickname = styled.div`
  text-align: center;
  font-size: 12px;
  margin-top: 5px;
`;

const MembersContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const CommentContainer = styled.div`
  width: 100%;
`;

export const CommentForm = styled.form`
  margin: 1rem 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CommentInput = styled.textarea`
  @media (max-width: 768px) {
    height: 3rem;
  }
  height: 3.5rem;
  border-radius: 0.2rem;
  flex: 1;
  padding: 0.3rem;
  border: 1px solid rgba(0, 0, 0, 0.3);
`;

export const CommentInputBtn = styled.button`
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
  const [loggedInUserProfile, setLoggedInUserProfile] = useRecoilState(loggedInUserProfileState);
  const { register, handleSubmit, formState: { errors } } = useForm();

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
    const { comment } = formData;
    try {
      const { data, error } = await client
        .from('MATCHING_COMMENT')
        .insert([{
          matching_id: matching.id,
          user_id: loggedInUser.id,
          content: comment,
          user_nickname: loggedInUserProfile.user_nickname,
        }]);
      if (error) {
        throw error;
      }
      const updatedComments = await getComments(matching.id);
      setComments(updatedComments);
    } catch (error) {
      console.error('Error adding comment:', error.message);
    }
  };

  const startEditComment = (comment) => {
    setEditingCommentId(comment.id);
    setEditContent(comment.comment);
  };

  const saveEditComment = async (commentId) => {
    const { data, error } = await client
      .from("MATCHING_COMMENT")
      .update({ comment: editContent, updated_at: new Date() })
      .eq("id", commentId)
      .select();
    if (error) {
      console.error(error.message);
      return;
    }
    setEditingCommentId(null);
    setEditContent("");
  };

  const deleteComment = async (commentId) => {
    try {
      const { data, deleteError } = await client
        .from("MATCHING_COMMENT")
        .delete()
        .eq("id", commentId)
        .select();
      if (deleteError) {
        throw new Error(deleteError.message);
      }
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
            <CommentItem>{comment.user_id}</CommentItem>
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
            <CommentContent>{comment.comment}</CommentContent>
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
    <FrameWrapperRoot>
      <FrameParent1 key={matching.id}>
        <Title>
          <Div>{matching.title}</Div>
        </Title>
        <FrameGroup>
          <Divbox1 style={{width:"110px"}}>#{sport.title}</Divbox1>
          <Divbox1>#{matching.difficulty}</Divbox1>
          <Divbox1 style={{width:"150px"}}>#{beach.beach_name}</Divbox1>
        </FrameGroup>
        <FrameGroup1>
          <FrameDiv>
            <Divbox>참가인원</Divbox>
            <Divbox1>{matching.joining_users ? matching.joining_users.length : 0}/{matching.total_people}명</Divbox1>
          </FrameDiv>
          <FrameDiv>
            <Divbox>모집상태</Divbox>
            <Divbox1>{matching.state}</Divbox1>
          </FrameDiv>
        </FrameGroup1>
        <FrameDiv style={{paddingTop:"0px"}}>
          <Divbox>일정</Divbox>
          <Schedulebox>{matching.matching_date} {matching.matching_time}</Schedulebox>
        </FrameDiv>
        <FrameDiv style={{ paddingTop: "0px" }}>
          <Divbox>멤버</Divbox>
          <MembersContainer>
            {userProfiles.map(profile => (
              <div key={profile.id} style={{display:"flex", flexDirection:"column"}}>
                <Avatar src={profile.avatar_url} alt="user avatar" />
                <Nickname>{profile.user_nickname}</Nickname>
              </div>
            ))}
          </MembersContainer>
        </FrameDiv>
        <DivRoot>
          <Textbox>{matching.required}<br/><br/>준비물 : {matching.necessity_details}</Textbox>
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
          </Textbox1>
          {isHostUser ? (
            <Link to={`/matching/update/${matching.id}`}>
              <Button>
                <Div2>수정하기</Div2>
              </Button>
            </Link>
          ) : (
            <Button onClick={handleButtonClick} disabled={isMatchingFull}>
              <Div2>{isMatchingFull ? '신청마감' : isUserJoined ? '신청 취소하기' : '신청하기'}</Div2>
            </Button>
          )}
        </DivRoot>
      </FrameParent1>
    </FrameWrapperRoot>
  );
};

export default MatchingApply;

