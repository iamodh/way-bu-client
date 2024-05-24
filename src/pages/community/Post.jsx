import { useParams } from "react-router-dom";
import { loggedInUserState, loggedInUserProfileState } from "../../atom";
import { useState, useEffect } from "react";
import { client } from "../../../libs/supabase";
import { useRecoilState } from "recoil";
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
  const { id: postId } = useParams();

  const [post, setPost] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getPost = async () => {
    let { data: post, error } = await client
      .from("POST")
      .select(
        "post_id, title, contents, post_type, user_nickname, user_id, views, thumbs, created_at, updated_at"
      )
      .eq("post_id", postId);
    console.log(post);
    setPost(post[0]);
    setIsLoading(false);
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
    </PostWrapper>
  );
}
