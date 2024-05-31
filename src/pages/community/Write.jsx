import React from "react";
import { useForm } from "react-hook-form";
import { client } from "../../../libs/supabase";
import { loggedInUserState, loggedInUserProfileState } from "../../atom";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { Form, Title, InputBox, ErrorMsg } from "./components/WriteLayout";

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
