import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { client } from "../../../libs/supabase";
import { loggedInUserState, loggedInUserProfileState } from "../../atom";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

const ComWrapper = styled.div`
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

const Form = styled.form`
  width: 100%;
  margin: 0 auto;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: bold;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const ErrorMsg = styled.span`
  color: red;
`;

const PostNameBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const PostsBox = styled.div`
  display: flex;
  margin: 10px 0;
  width: 100%;
`;

const PostBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  border-bottom: 1px solid #b9b9b9;
  padding: 0.5rem 0;
`;

const PostLeft = styled.div`
  display: flex;
  flex-direction: column;
`;

const PostLeftTop = styled.div`
  display: flex;
  margin-bottom: 0.5rem;
`;

const PostLeftBottom = styled.div`
  display: flex;
`;

const PostCenter = styled.div``;

const PostRight = styled.div`
  display: flex;
`;

const PostTitle = styled.div`
  font-weight: 700;
`;

const PostUser = styled.div`
  margin-right: 0.5rem;
`;

const PostDate = styled.div`
  font-size: 0.8rem;
  opacity: 0.8;
`;

const PostTag = styled.div``;

const PostView = styled.div``;

const PostThumb = styled.div`
  margin: 0 1rem;
`;

const PostComment = styled.div`
  margin-left: 1rem;
`;

const ComponentBox = styled.div`
  margin: 0 10px;
  width: 50px;
  &:nth-child(4) {
    width: 200px;
  }
  &:nth-child(6) {
    width: 100px;
  }
  &:nth-child(2):hover,
  &:nth-child(3):hover,
  &:nth-child(5):hover,
  &:nth-child(7):hover {
    cursor: pointer;
  }
`;

export default function Write() {
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useRecoilState(loggedInUserState);
  const [loggedInUserProfile, setLoggedInUserProfile] = useRecoilState(
    loggedInUserProfileState
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const addComPost = async (formData) => {
    const { data, error } = await client
      .from("POST")
      .insert([
        {
          title: formData.title,
          contents: formData.content,
          user_id: loggedInUser.id,
          user_nickname: loggedInUserProfile.user_nickname,
          post_type: formData.tag,
        },
      ])
      .select();
    if (error) {
      console.error(error);
      return;
    }
    console.log("작성완료", data);
    navigate(`/community/${data[0].post_id}`);
  };

  return (
    <Form onSubmit={handleSubmit(addComPost)}>
      <Title>글쓰기</Title>
      <InputBox>
        <label htmlFor="title">제목</label>
        <input {...register("title")} id="title" type="text" />
        <ErrorMsg>{errors?.email?.message}</ErrorMsg>
      </InputBox>
      <select name="tag" id="tag" {...register("tag")}>
        <option value="자유">자유</option>
        <option value="질문">질문</option>
        <option value="후기">후기</option>
        <option value="꿀팁">꿀팁</option>
      </select>
      <InputBox>
        <label htmlFor="content">내용</label>
        <textarea rows="10" {...register("content")} id="content"></textarea>
        <ErrorMsg>{errors?.content?.message}</ErrorMsg>
      </InputBox>
      <button style={{ padding: "10px" }}>글쓰기</button>
    </Form>
  );
}
