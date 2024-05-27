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
  align-items: center;
  width: 1000px;
  margin: 0 auto;
  flex-direction: column;
  & * {
    box-sizing: border-box;
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

  const commentList = () => {
    return comments.map((comment, key) => {
      return (
        <div key={comment.comment_id}>
          <p>{comment.user_nickname}</p>
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
            <p>{comment.content}</p>
          )}
          {loggedInUser && comment.user_id === loggedInUser.id && (
            <div>
              <button onClick={() => startEditComment(comment)}>
                수정하기
              </button>
              <button onClick={() => deleteComment(comment.comment_id)}>
                삭제하기
              </button>
            </div>
          )}
        </div>
      );
    });
  };

  useEffect(() => {
    getPost();
  }, []);

  if (isLoading) return <>Loading...</>;

  return (
    <PostWrapper>
      <h1>제목: {post.title}</h1>
      <p>작성자: {post.user_nickname}</p>
      <div>내용: {post.contents}</div>
      <p>조회수: {post.views}</p>
      <p>추천수: {post.thumbs}</p>
      <p>{post.created_at}</p>
      <button onClick={() => clickThumb()}>추천하기</button>
      {loggedInUser && post.user_id == loggedInUser.id && (
        <button onClick={() => deletePost()}>삭제하기</button>
      )}
      <form onSubmit={handleSubmit(onCommentSubmit)}>
        <textarea
          rows="3"
          cols="50"
          {...register("comment", { required: "댓글을 입력해주세요" })}
          type="text"
        ></textarea>
        <button type="submit">댓글</button>
      </form>
      {commentList()}
    </PostWrapper>
  );
}
