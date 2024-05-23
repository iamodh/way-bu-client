import React, { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { client } from "../../../libs/supabase";
import { useRecoilState } from "recoil";
import { loggedInUserState } from "../../atom";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
`;

const Form = styled.form`
  width: 600px;
  padding: 60px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--color-blue-vivid);
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 15px;
  color: var(--color-navy);
`;

const GreyHR = styled.hr`
  border-top: 1px solid #b9b9b9;
  margin-bottom: 50px;
`;

const InputBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 75%;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const Check = styled.div`
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
`;

const Find = styled.div`
  padding: 1px;
`;

const Remember = styled.div`
  margin-left: 90px;
  padding: 1px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: bold;
`;

const ErrorMsg = styled.span`
  display: block;
  color: red;
  font-size: 16px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%; /* 부모 컨테이너의 너비를 100%로 설정 */
  padding: 20px 0; /* 옵션: 상하좌우 패딩 추가 */
`;

const Button = styled.button`
  width: 70%;
  padding: 15px; /* 변경된 부분 */
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  margin-bottom: 12px; /* 아래쪽 여백 추가 */
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #0056b3;
  }
`;

const Alert = styled.span`
  display: block;
  margin-top: 20px;
  padding: 15px;
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
  border-radius: 6px;
  font-size: 16px;
`;

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loggedInUser, setLoggedInUser] = useRecoilState(loggedInUserState);
  const [alert, setAlert] = useState({ cnt: 0, err: null });

  const onSubmit = async (formData) => {
    const { data, error } = await client.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });
    if (error) {
      setAlert({ cnt: alert.cnt + 1, err: error.message });
      return;
    }
    setLoggedInUser(data.session.user);
    console.log("로그인 정보", data.session.user);

    const rememberMe = formData.rememberMe;
    if (rememberMe) {
      await saveCredentials(formData.email, formData.password);
    }
  };

  const saveCredentials = async (email, password) => {
    try {
      const { data, error } = await client
        .from("credentials")
        .insert([{ email, password }]);
      if (error) {
        console.error("Error saving credentials:", error.message);
      } else {
        console.log("Credentials saved successfully:", data);
      }
    } catch (error) {
      console.error("Error saving credentials:", error.message);
    }
  };

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {alert.cnt !== 0 && alert ? (
          <Alert>{alert.err + " (횟수: " + alert.cnt + ")"}</Alert>
        ) : null}
        <Title>로그인</Title>
        <GreyHR />
        <InputBox>
          <Label htmlFor="email">이메일</Label>
          <Input
            {...register("email", { required: "이메일을 입력해 주세요." })}
            id="email"
            type="email"
          />
        </InputBox>
        {errors?.email && <ErrorMsg>{errors.email.message}</ErrorMsg>}
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
          />
          {errors?.password && <ErrorMsg>{errors.password.message}</ErrorMsg>}
        </InputBox>
        <Check>
          <Remember>
            <input type="checkbox" {...register("rememberMe")} />
            기억하기
          </Remember>
          <Find>
            <Link to="/find-id">이메일 찾기</Link> |{" "}
            <Link to="/find-pwd">비밀번호 찾기</Link>
          </Find>
        </Check>
        <ButtonContainer>
          <Button type="submit">로그인</Button>
          <Link to="/signup"></Link>
          <Button type="button">회원가입</Button>
          <Link to="/signup"></Link>
        </ButtonContainer>
      </Form>
    </Wrapper>
  );
}
