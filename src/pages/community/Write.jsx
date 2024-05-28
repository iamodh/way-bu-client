import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
export default function Write() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
