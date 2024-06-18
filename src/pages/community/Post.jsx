import { useParams } from "react-router-dom";
import { loggedInUserState, loggedInUserProfileState } from "../../atom";
import { useState, useEffect } from "react";
import { client } from "../../../libs/supabase";
import { useRecoilState } from "recoil";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import {
  PostWrapper,
  PostTitleContainer,
  PostTitle,
  PostTag,
  PostAvatar,
  PostInfoContainer,
  PostInfoBox,
  PostInfoItem,
  PostInfoBottom,
  PostContent,
  ThumbBtn,
  PostBtn,
  PostBtnContainer,
  CommentContainer,
  CommentForm,
  CommentInput,
  CommentInputBtn,
  CommentBox,
  CommentInfo,
  CommentItem,
  CommentContent,
  CommentBtn,
  CommentCount,
} from "./components/PostLayout";

export default function Post() {
  const {
    register,
    handleSubmit,
    reset,
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
          "post_id, title, contents, post_type, user_nickname, user_id, views, thumbs, created_at, updated_at, comment_count, user_recommend, sport"
        )
        .eq("post_id", postId)
        .single();
      if (fetchError) {
        throw new Error(fetchError.message);
      }

      const { data: user, error: userError } = await client
        .from("USER_PROFILE")
        .select("avatar_url")
        .eq("user_id", post.user_id)
        .single();

      if (userError) {
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

      setPost({ ...updatedPost[0], user_avatar: user.avatar_url });
      setComments(comments);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const onCommentSubmit = async (formData) => {
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
      try {
        const { data: notiData, error: notiError } = await client
          .from("NOTIFICATION")
          .delete()
          .eq("post_id", postId)
          .select();
      } catch (error) {}
      if (post.user_id !== loggedInUser.id) {
        const { data: notificationData, notificationError } = await client
          .from("NOTIFICATION")
          .insert([
            {
              user_id: post.user_id,
              content: "회원님의 게시물에 새로운 댓글이 달렸습니다.",
              post_id: postId,
              title: post.title,
            },
          ]);
        if (notificationError) {
          throw new Error(notificationError.message);
        }
      }
    } catch (error) {
      console.error(error);
      return;
    }
    reset({ comment: "" });
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
              <CommentItem>{formatTime(comment.updated_at)} 수정됨</CommentItem>
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
  }, postId);

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
          <PostAvatar src={post.user_avatar} />
          <PostInfoItem>{post.user_nickname}</PostInfoItem>
        </PostInfoBox>
        <PostInfoBottom>
          <PostInfoBox>
            <PostInfoItem>작성일</PostInfoItem>
            <PostInfoItem>{formatTime(post.created_at)}</PostInfoItem>
          </PostInfoBox>
          {post.updated_at && (
            <PostInfoBox>
              <PostInfoItem>수정일</PostInfoItem>
              <PostInfoItem>{formatTime(post.updated_at)}</PostInfoItem>
            </PostInfoBox>
          )}
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
        <PostBtnContainer>
          <PostBtn>
            <Link to={`edit`}>수정하기</Link>
          </PostBtn>
          <PostBtn onClick={() => deletePost()}>삭제하기</PostBtn>
        </PostBtnContainer>
      )}
      <CommentContainer>
        <CommentCount>댓글 {comments.length}개</CommentCount>
        {commentList()}
        <CommentForm onSubmit={handleSubmit(onCommentSubmit)}>
          <CommentInput
            {...register("comment", { required: "댓글을 입력해주세요" })}
            col="3"
          ></CommentInput>
          <CommentInputBtn type="submit">댓글 추가</CommentInputBtn>
        </CommentForm>
      </CommentContainer>
    </PostWrapper>
  );
}
