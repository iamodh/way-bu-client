import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { client } from "../../../libs/supabase";
import { loggedInUserState, loggedInUserProfileState } from "../../atom";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import {
  Form,
  Title,
  ErrorMsg,
  WriteTopBox,
  TagInput,
  WriteTitle,
  WriteContent,
  WriteBtn,
  WriteBtnBox,
  WriteTagBox,
} from "./components/WriteLayout";

export default function PostWrite() {
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

  useEffect(() => {
    if (!loggedInUser || !loggedInUserProfile) {
      navigate("/login");
    }
  }, []);

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
          sport: formData.sport,
        },
      ])
      .select();
    if (error) {
      console.error(error);
      return;
    }
    console.log(data);
    // navigate(`/community/${data[0].post_id}`);
  };

  return (
    <Form onSubmit={handleSubmit(addComPost)}>
      <Title>글쓰기</Title>
      <WriteTopBox>
        <WriteTagBox>
          <TagInput name="tag" id="tag" {...register("tag")}>
            <option value="자유">자유</option>
            <option value="질문">질문</option>
            <option value="후기">후기</option>
            <option value="꿀팁">꿀팁</option>
          </TagInput>
          <TagInput name="sport" id="sport" {...register("sport")}>
            <option value="서핑">서핑</option>
            <option value="패들보드">패들보드</option>
            <option value="낚시">낚시</option>
            <option value="카약">카약</option>
            <option value="기타">기타</option>
          </TagInput>
        </WriteTagBox>
        <WriteTitle
          {...register("title")}
          id="title"
          type="text"
          placeholder="제목"
        />
        <ErrorMsg>{errors?.email?.message}</ErrorMsg>
      </WriteTopBox>
      <WriteContent
        rows="30"
        {...register("content")}
        id="content"
        placeholder="내용"
      ></WriteContent>
      <ErrorMsg>{errors?.content?.message}</ErrorMsg>
      <WriteBtnBox>
        <WriteBtn>글쓰기</WriteBtn>
        <WriteBtn
          onClick={(e) => {
            e.preventDefault();
            navigate(`/community/${postId}`);
          }}
        >
          취소
        </WriteBtn>
      </WriteBtnBox>
    </Form>
  );
}
