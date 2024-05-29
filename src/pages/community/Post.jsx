import { useParams } from "react-router-dom";
import { loggedInUserState, loggedInUserProfileState } from "../../atom";
import { useState, useEffect } from "react";
import { client } from "../../../libs/supabase";
import { useRecoilState } from "recoil";
import { useForm } from "react-hook-form";
import styled from "styled-components";

const PostWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  max-width: 1000px;
  width: 80%;
  min-width: 350px;
  margin: 2rem auto;
  flex-direction: column;
  & * {
    box-sizing: border-box;
    border-collapse: collapse;
  }
  border: 1px solid var(--color-blue-main);
  padding: 1rem;
  border-radius: 0.5rem;
`;

const PostTitleContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 1rem 0%;
  align-items: center;
`;

const PostTitle = styled.div`
  font-size: var(--font-size-xl);
  margin-left: 1.5rem;
  font-weight: 700;
`;

const PostTag = styled.div`
  border-radius: 0.6rem;
  margin: 0.5rem;
  border: 1px solid rgba(0, 0, 0, 0.6);
  width: 4rem;
  height: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PostInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  width: 100%;
  border: 1px solid var(--color-blue-main);
  border-radius: 0.5rem;
  position: relative;
  margin-bottom: 1rem;
`;

const PostInfoBottom = styled.div`
  display: flex;
  margin-top: 0.5rem;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const PostInfoBox = styled.div`
  display: flex;
  &:nth-child(2) {
    position: absolute;
    right: 2rem;
  }
`;

const PostInfoItem = styled.div`
  &:first-child {
    margin-right: 0.5rem;
    background-color: var(--color-skyblue-main);
    font-weight: 600;
  }
  padding: 0.4rem;
`;

const PostContent = styled.div`
  width: 100%;
  border: 1px solid var(--color-blue-main);
  border-radius: 0.5rem;
  min-height: 15rem;
  padding: 2rem;
  position: relative;
`;

const PostBtn = styled.button``;

const ThumbBtn = styled.button`
  position: absolute;
  bottom: 1rem;
  right: 50%;
  background-color: rgba(0, 0, 0, 0);
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 0.5rem;
  font-size: 2rem;
  padding: 0.8rem;
  transform: translate(50%, 0);
  &:hover {
    cursor: pointer;
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
  height: 3.5rem;
  border-radius: 0.2rem;
  flex: 1;
  padding: 0.3rem;
  border: 1px solid rgba(0, 0, 0, 0.3);
`;

const CommentInputBtn = styled.button`
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

export default function Post() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { id: postId } = useParams();

  const [post, setPost] = useState([]);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loggedInUser, setLoggedInUser] = useRecoilState(loggedInUserState);
  const [loggedInUserProfile, setLoggedInUserProfile] = useRecoilState(
    loggedInUserProfileState
  );
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editContent, setEditContent] = useState("");

  const getPost = async () => {
    try {
      const { data: post, error: fetchError } = await client
        .from("POST")
        .select(
          "post_id, title, contents, post_type, user_nickname, user_id, views, thumbs, created_at, updated_at, comment_count, user_recommend"
        )
        .eq("post_id", postId)
        .single();

      if (fetchError) {
        throw new Error(fetchError.message);
      }

      const { data: updatedPost, error: updateError } = await client
        .from("POST")
        .update({ views: post.views + 1 })
        .eq("post_id", postId)
        .select();

      if (updateError) {
        throw new Error(updateError.message);
      }

      const { data: comments, error: commentError } = await client
        .from("COMMENT")
        .select("*")
        .eq("post_id", postId);

      if (commentError) {
        throw new Error(commentError.message);
      }

      setPost(updatedPost[0]);
      setComments(comments);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const onCommentSubmit = async (formData) => {
    console.log(loggedInUserProfile);
    const { comment } = formData;
    try {
      const { data, commentError } = await client.from("COMMENT").insert([
        {
          post_id: postId,
          user_id: loggedInUser.id,
          content: comment,
          user_nickname: loggedInUserProfile.user_nickname,
        },
      ]);
      if (commentError) {
        throw new Error(commentError.message);
      }
      const { data: countData, error: countError } = await client
        .from("POST")
        .update({ comment_count: post.comment_count + 1 })
        .eq("post_id", postId)
        .select();
      if (countError) {
        throw new Error(countError.message);
      }
    } catch (error) {
      console.error(error);
      return;
    }
    getPost();
  };

  const startEditComment = (comment) => {
    setEditingCommentId(comment.comment_id);
    setEditContent(comment.content);
  };

  const saveEditComment = async (commentId) => {
    const { data, error } = await client
      .from("COMMENT")
      .update({ content: editContent, updated_at: new Date() })
      .eq("comment_id", commentId)
      .select();
    if (error) {
      console.error(error.message);
      return;
    }
    setEditingCommentId(null);
    setEditContent("");
    getPost();
  };

  const deleteComment = async (commentId) => {
    try {
      const { data, deleteError } = await client
        .from("COMMENT")
        .delete()
        .eq("comment_id", commentId)
        .select();
      if (deleteError) {
        throw new Error(deleteError.message);
      }
      const { postData, postError } = await client
        .from("POST")
        .update({ comment_count: post.comment_count - 1 })
        .eq("post_id", postId)
        .select();
      if (postError) {
        throw new Error(postError.message);
      }
      getPost();
    } catch (error) {
      console.error(error.message);
      return;
    }
  };

  const deletePost = async () => {
    const { data, error } = await client
      .from("POST")
      .delete()
      .eq("post_id", postId)
      .select();
    if (error) {
      console.error(error.message);
      return;
    }
    console.log(data, "게시글 삭제 완료");
    window.history.back();
  };

  const clickThumb = async () => {
    if (!loggedInUser || post.user_recommend.includes(loggedInUser.id)) {
      return;
    }
    const { data, error } = await client
      .from("POST")
      .update({
        thumbs: post.thumbs + 1,
        user_recommend: [...post.user_recommend, loggedInUser.id],
      })
      .eq("post_id", postId)
      .select();
    if (error) {
      console.error(error.message);
      return;
    }
    getPost();
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

  const commentList = () => {
    comments.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    const list = comments.map((comment, key) => {
      return (
        <CommentBox key={comment.comment_id}>
          <CommentInfo>
            <CommentItem>{comment.user_nickname}</CommentItem>
            <CommentItem>{formatTime(comment.created_at)}</CommentItem>
            {comment.updated_at && (
              <CommentItem>
                {" "}
                {formatTime(comment.updated_at)} 수정됨{" "}
              </CommentItem>
            )}
            {loggedInUser && comment.user_id === loggedInUser.id && (
              <>
                <CommentBtn onClick={() => startEditComment(comment)}>
                  수정하기
                </CommentBtn>
                <CommentBtn onClick={() => deleteComment(comment.comment_id)}>
                  삭제하기
                </CommentBtn>
              </>
            )}
          </CommentInfo>
          {editingCommentId === comment.comment_id ? (
            <div>
              <input
                type="text"
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
              />
              <button onClick={() => saveEditComment(comment.comment_id)}>
                Save
              </button>
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
    getPost();
  }, []);

  if (isLoading) return <>Loading...</>;

  return (
    <PostWrapper>
      <PostTitleContainer>
        <PostTag>{post.post_type}</PostTag>
        <PostTag>{post.sport}</PostTag>
        <PostTitle>{post.title}</PostTitle>
      </PostTitleContainer>
      <PostInfoContainer>
        <PostInfoBox>
          <PostInfoItem>작성자</PostInfoItem>
          <PostInfoItem>{post.user_nickname}</PostInfoItem>
        </PostInfoBox>
        <PostInfoBottom>
          <PostInfoBox>
            <PostInfoItem>작성일</PostInfoItem>
            <PostInfoItem>{formatTime(post.created_at)}</PostInfoItem>
          </PostInfoBox>
          <PostInfoBox>
            <PostInfoItem>조회수</PostInfoItem>
            <PostInfoItem>{post.views}</PostInfoItem>
          </PostInfoBox>
        </PostInfoBottom>
      </PostInfoContainer>
      <PostContent>
        {post.contents}
        <ThumbBtn onClick={() => clickThumb()}>{post.thumbs} 👍🏻</ThumbBtn>
      </PostContent>
      {loggedInUser && post.user_id == loggedInUser.id && (
        <PostBtn onClick={() => deletePost()}>삭제하기</PostBtn>
      )}
      <CommentContainer>
        <CommentForm onSubmit={handleSubmit(onCommentSubmit)}>
          <CommentInput
            {...register("comment", { required: "댓글을 입력해주세요" })}
            col="3"
          ></CommentInput>
          <CommentInputBtn type="submit">댓글 추가</CommentInputBtn>
        </CommentForm>
        {commentList()}
      </CommentContainer>
    </PostWrapper>
  );
}
