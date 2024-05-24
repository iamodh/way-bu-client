import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { client } from "../../../libs/supabase";
import { Link } from "react-router-dom";
import {
  LoginLayout,
  InputBox,
  Input,
  Label,
  ErrorMsg,
  ButtonContainer,
  Button,
  LinkBtn,
} from "../../components/layout/LoginLayout";

export default function FindId() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [alert, setAlert] = useState({ cnt: 0, err: null });

  const onSubmit = async (formData) => {
    const { name, phoneNumber, email } = formData;
    // 여기서는 실제로 이메일을 보내는 대신 로그로 출력합니다.
    console.log("Name:", name);
    console.log("Phone Number:", phoneNumber);
    console.log("Email:", email);
    setAlert({
      cnt: alert.cnt + 1,
      err: "아이디 찾기 이메일이 전송되었습니다.",
    });
  };

  return (
    <LoginLayout
      title="이메일 찾기"
      alert={
        alert.cnt !== 0 && alert.err && `${alert.err} (횟수: ${alert.cnt})`
      }
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputBox>
          <Label htmlFor="name">이름</Label>
          <Input
            {...register("name", { required: "이름을 입력해 주세요." })}
            id="name"
            type="text"
          />
          {errors.name && <ErrorMsg>{errors.name.message}</ErrorMsg>}
        </InputBox>
        <InputBox>
          <Label htmlFor="phoneNumber">전화번호</Label>
          <Input
            {...register("phoneNumber", {
              required: "전화번호를 입력해 주세요.",
            })}
            id="phoneNumber"
            type="tel"
          />
          {errors.phoneNumber && (
            <ErrorMsg>{errors.phoneNumber.message}</ErrorMsg>
          )}
        </InputBox>
        <ButtonContainer>
          <Button type="submit">이메일 찾기</Button>
          <LinkBtn to="/login">로그인</LinkBtn>
        </ButtonContainer>
      </form>
    </LoginLayout>
  );
}
