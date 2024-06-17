import React from "react";
import { set, useForm } from "react-hook-form";
import { client } from "../../../libs/supabase";
import { useState, useEffect } from "react";
import { loggedInUserState, loggedInUserProfileState } from "../../atom";
import { useRecoilState } from "recoil";
import { useParams, useNavigate } from "react-router-dom";
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

export default function PostEdit() {
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useRecoilState(loggedInUserState);
  const [loggedInUserProfile, setLoggedInUserProfile] = useRecoilState(
    loggedInUserProfileState
  );
  const [postInfo, setPostInfo] = useState({});
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { id: postId } = useParams();

  const setFormValues = (data) => {
    setValue("title", data.title);
    setValue("content", data.contents);
    setValue("tag", data.post_type);
    setValue("sport", data.sport);
  };

  const getPost = async () => {
    const { data, error } = await client
      .from("POST")
      .select("post_id, title, contents, post_type, sport")
      .eq("post_id", postId)
      .single();
    if (error) {
      console.error(error);
    }
    setPostInfo(data);
    setFormValues(data);
  };

  useEffect(() => {
    getPost();
  }, []);

  const editComPost = async (formData) => {
    const { data, error } = await client
      .from("POST")
      .update([
        {
          title: formData.title,
          contents: formData.content,
          post_type: formData.tag,
          sport: formData.sport,
          updated_at: new Date(),
        },
      ])
      .eq("post_id", postId)
      .select();
    if (error) {
      console.error(error);
      return;
    }
    navigate(`/community/${data[0].post_id}`);
  };

  return (
    <Form onSubmit={handleSubmit(editComPost)}>
      <WriteTopBox>
        <WriteTagBox>
          <TagInput
            name="tag"
            id="tag"
            defaultValue="자유"
            required
            {...register("tag")}
          >
            <option value="자유">자유</option>
            <option value="질문">질문</option>
            <option value="후기">후기</option>
            <option value="꿀팁">꿀팁</option>
          </TagInput>
          <TagInput
            name="sport"
            id="sport"
            defaultValue="서핑"
            {...register("sport")}
          >
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
          defaultValue=""
        />
        <ErrorMsg>{errors?.email?.message}</ErrorMsg>
      </WriteTopBox>
      <WriteContent
        rows="30"
        {...register("content")}
        id="content"
        placeholder="내용"
        defaultValue=""
        required
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
