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
} from "../../components/layout/LoginLayout";

export default function FindId() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [alert, setAlert] = useState({ cnt: 0, err: null });
  const [foundEmail, setFoundEmail] = useState(null);

  const onSubmit = async (formData) => {
    const { name, phoneNumber } = formData;

    // 이름과 전화번호로 사용자 인증
    const { data: users, error } = await client
      .from("users")
      .select("email")
      .eq("name", name)
      .eq("phoneNumber", phoneNumber);

    if (error) {
      console.error("Error retrieving user data:", error.message);
      setAlert({
        cnt: alert.cnt + 1,
        err: "사용자를 인증하는 중에 오류가 발생했습니다.",
      });
      return;
    }

    if (users.length === 0) {
      setAlert({
        cnt: alert.cnt + 1,
        err: "일치하는 사용자가 없습니다.",
      });
      return;
    }

    // 사용자가 존재하면 이메일을 보여줌
    setFoundEmail(users[0].email);
  };

  return (
    <LoginLayout
      title="이메일 찾기"
      alert={
        alert.cnt !== 0 && alert.err && `${alert.err} (횟수: ${alert.cnt})`
      }
    >
      {foundEmail ? (
        <div>
          <p>가입된 이메일: {foundEmail}</p>
          <ButtonContainer>
            <Link to="/login" style={{ fontSize: "0.8rem" }}>
              로그인
            </Link>
          </ButtonContainer>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputBox>
            <Label htmlFor="name">이름</Label>
            <Input
              {...register("name", { required: "이름을 입력해 주세요." })}
              id="name"
              type="text"
              placeholder="이름을 입력하세요"
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
              placeholder="전화번호를 입력하세요"
            />
            {errors.phoneNumber && (
              <ErrorMsg>{errors.phoneNumber.message}</ErrorMsg>
            )}
          </InputBox>
          <ButtonContainer>
            <Button type="submit">이메일 찾기</Button>
            <Link to="/login" style={{ fontSize: "0.8rem" }}>
              로그인
            </Link>
          </ButtonContainer>
        </form>
      )}
    </LoginLayout>
  );
}
