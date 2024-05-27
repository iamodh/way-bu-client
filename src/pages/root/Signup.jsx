import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { client } from "../../../libs/supabase";
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

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [alert, setAlert] = useState(null);

  const onSubmit = async (formData) => {
    const { email, password, nickname, birthDate, joinPath } = formData;
    try {
      const { data, error } = await client.auth.signUp({
        email,
        password,
      });

      if (error) {
        setAlert(error.message);
        return;
      }

      const { user } = data;
      if (user) {
        await client.from("USER_PROFILE").insert([
          {
            user_id: user.id,
            user_nickname: nickname,
            birth_date: birthDate,
            join_path: joinPath,
          },
        ]);
        navigate("/login");
      }
    } catch (error) {
      setAlert(error.message);
    }
  };

  return (
    <LoginLayout title="회원가입" alert={alert}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputBox>
          <Label htmlFor="email">이메일</Label>
          <Input
            {...register("email", { required: "이메일을 입력해 주세요." })}
            id="email"
            type="email"
            placeholder="이메일을 입력하세요"
          />
          {errors?.email && <ErrorMsg>{errors.email.message}</ErrorMsg>}
        </InputBox>
        <InputBox>
          <Label htmlFor="password">비밀번호</Label>
          <Input
            {...register("password", {
              required: "비밀번호를 입력해 주세요.",
              minLength: {
                value: 6,
                message: "비밀번호는 최소 6자리 입니다.",
              },
            })}
            id="password"
            type="password"
            placeholder="비밀번호를 입력하세요"
          />
          {errors?.password && <ErrorMsg>{errors.password.message}</ErrorMsg>}
        </InputBox>
        <InputBox>
          <Label htmlFor="nickname">닉네임</Label>
          <Input
            {...register("nickname", { required: "닉네임을 입력해 주세요." })}
            id="nickname"
            type="text"
            placeholder="닉네임을 입력하세요"
          />
          {errors?.nickname && <ErrorMsg>{errors.nickname.message}</ErrorMsg>}
        </InputBox>
        <InputBox>
          <Label htmlFor="birthDate">생일</Label>
          <Input
            {...register("birthDate", { required: "생일을 입력해 주세요." })}
            id="birthDate"
            type="date"
          />
          {errors?.birthDate && <ErrorMsg>{errors.birthDate.message}</ErrorMsg>}
        </InputBox>
        <InputBox>
          <Label htmlFor="joinPath">가입경로</Label>
          <Input
            {...register("joinPath", { required: "가입경로를 입력해 주세요." })}
            id="joinPath"
            type="text"
            placeholder="가입경로를 입력하세요"
          />
          {errors?.joinPath && <ErrorMsg>{errors.joinPath.message}</ErrorMsg>}
        </InputBox>
        <ButtonContainer>
          <Button type="submit">회원가입</Button>
          <LinkBtn to="/login">이미 계정이 있으신가요? 로그인</LinkBtn>
        </ButtonContainer>
      </form>
    </LoginLayout>
  );
}
