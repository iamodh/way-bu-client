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
    let { data: post, error } = await client
      .from("POST")
      .select(
        "post_id, title, contents, post_type, user_nickname, user_id, views, thumbs, created_at, updated_at, comment_count"
      )
      .eq("post_id", postId);
    let { data: comments, error: commentError } = await client
      .from("COMMENT")
      .select("*")
      .eq("post_id", postId);
    setPost(post[0]);
    setComments(comments);
    setIsLoading(false);
  };

  const onCommentSubmit = async (formData) => {
    console.log(loggedInUserProfile);
    const { comment } = formData;
    const { data, error } = await client.from("COMMENT").insert([
      {
        post_id: postId,
        user_id: loggedInUser.id,
        content: comment,
        user_nickname: loggedInUserProfile.user_nickname,
      },
    ]);
    if (error) {
      console.log(error.message);
      return;
    }
    console.log(data, loggedInUser);
    const { data: countData, error: countError } = await client
      .from("POST")
      .update({ comment_count: post.comment_count + 1 })
      .eq("post_id", postId)
      .select();
    if (countError) {
      console.log(countError.message);
      return;
    }
    console.log(countData);
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
      console.log(error.message);
      return;
    }
    setEditingCommentId(null);
    setEditContent("");
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
            <button onClick={() => startEditComment(comment)}>수정하기 </button>
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
      <h1>{post.title}</h1>
      <p>{post.user_nickname}</p>
      <div>{post.contents}</div>
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
