import { styled, keyframes } from "styled-components";
import { useForm } from "react-hook-form";
import { client } from "../../../libs/supabase";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ButtonContainer,
  Button,
  InputBox,
  Input,
  ErrorMsg,
  Label,
} from "../../components/layout/LoginLayout";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 100px 0;

  @media (max-width: 480px) {
    margin-top: 10px;
    padding: 40px;
  }
`;

const Form = styled.form`
  width: 100%;
  max-width: 600px;
  padding: 60px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--color-blue-vivid);

  @media (max-width: 480px) {
    padding: 30px;
  }
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 15px;
  color: var(--color-navy);

  @media (max-width: 480px) {
    font-size: 18px;
    margin-bottom: 10px;
  }
`;

const GreyHR = styled.hr`
  border-top: 1px solid #b9b9b9;
  margin-bottom: 35px;

  @media (max-width: 480px) {
    margin-bottom: 20px;
  }
`;

const alertAnimation = keyframes`
  0% {
    top: -120px;
  }
  50% {
    top: 0px;
  }
  100% {
    top: -120px;
  }
`;

const Alert = styled.span`
  position: absolute;
  width: 400px;
  height: 100px;
  background-color: whitesmoke;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 50%;
  transform: translateX(-50%);
  top: -120px;
  animation: ${alertAnimation} 2s ease-out;
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
`;

export default function Signup() {
  /* Form */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (formData) => {
    signUpNewUser(formData);
  };

  /* Supabase */
  const signUpNewUser = async (formData) => {
    const { data, error } = await client.auth.signUp({
      email: formData.email,
      password: formData.password,
    });
    console.log(data.user.id);
    addUserProfile(data.user.id, formData);
    if (error) {
      setAlert((prev) => {
        return { ...prev, cnt: prev.cnt + 1, err: error.message };
      });
      return;
    }
    console.log(data);
  };

  const addUserProfile = async (id, formData) => {
    const { data, error } = await client
      .from("USER_PROFILE")
      .insert([
        {
          user_id: id,
          user_nickname: formData.nickName,
          birth_date: formData.birthDate,
          join_path: formData.joinPath,
        },
      ])
      .select();
  };

  /* Error 처리 */
  const [alert, setAlert] = useState({ cnt: 0, err: null });
  return (
    <>
      {alert.cnt !== 0 && alert ? (
        <Alert key={alert.cnt}>{alert.err + " count: " + alert.cnt}</Alert>
      ) : null}
      <Wrapper>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Title>회원가입</Title>
          <GreyHR />
          <InputBox>
            <Label htmlFor="email">이메일</Label>
            <Input
              {...register("email")}
              id="email"
              type="email"
              required
              placeholder="이메일을 입력하세요"
            />
            <ErrorMsg>{errors?.email?.message}</ErrorMsg>
          </InputBox>
          <InputBox>
            <Label htmlFor="password">비밀번호</Label>
            <Input
              {...register("password", {
                minLength: {
                  value: 6,
                  message: "비밀번호는 최소 6자리 입니다.",
                },
              })}
              id="password"
              type="password"
              placeholder="비밀번호를 입력하세요"
              required
            />
            <ErrorMsg>{errors?.password?.message}</ErrorMsg>
          </InputBox>
          <InputBox>
            <Label htmlFor="nickName">닉네임</Label>
            <Input
              {...register("nickName", {
                minLength: {
                  value: 2,
                  message: "닉네임은 최소 2자리 입니다.",
                },
              })}
              id="nickName"
              type="text"
              required
              placeholder="닉네임을 입력하세요"
            />
            <ErrorMsg>{errors?.nickName?.message}</ErrorMsg>
          </InputBox>
          <InputBox>
            <Label htmlFor="birthDate">생년월일</Label>
            <Input
              {...register("birthDate")}
              id="birthDate"
              type="date"
              required
            />
            <ErrorMsg>{errors?.birthDate?.message}</ErrorMsg>
          </InputBox>
          <InputBox>
            <Label htmlFor="joinPath">가입경로</Label>
            <Input
              {...register("joinPath")}
              id="joinPath"
              type="text"
              required
            />
            <ErrorMsg>{errors?.joinPath?.message}</ErrorMsg>
          </InputBox>
          <ButtonContainer>
            <Button type="submit" to="/login">
              회원가입
            </Button>
            <Link to="/login" style={{ fontSize: "0.7rem" }}>
              로그인
            </Link>
          </ButtonContainer>
        </Form>
      </Wrapper>
    </>
  );
}
