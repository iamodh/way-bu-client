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

export default function FindPwd() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [alert, setAlert] = useState({ cnt: 0, err: null });

  const onSubmit = async (formData) => {
    const { data, error } = await client.auth.api.resetPasswordForEmail(
      formData.email
    );
    if (error) {
      setAlert({ cnt: alert.cnt + 1, err: error.message });
      return;
    }
    setAlert({
      cnt: alert.cnt + 1,
      err: "비밀번호 재설정 이메일이 전송되었습니다.",
    });
    console.log("Password reset request sent", data);
  };

  return (
    <LoginLayout
      title="비밀번호 찾기"
      alert={
        alert.cnt !== 0 && alert.err && `${alert.err} (횟수: ${alert.cnt})`
      }
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputBox>
          <Label htmlFor="email">이메일</Label>
          <Input
            {...register("email", { required: "이메일을 입력해 주세요." })}
            id="email"
            type="email"
            placeholder="이메일을 입력하세요"
          />
        </InputBox>
        {errors?.email && <ErrorMsg>{errors.email.message}</ErrorMsg>}
        <ButtonContainer>
          <Button type="submit">비밀번호 찾기</Button>
          <Link to="/change-pwd" style={{ fontSize: "0.7rem" }}>
            비밀번호 변경하기
          </Link>
        </ButtonContainer>
      </form>
    </LoginLayout>
  );
}
