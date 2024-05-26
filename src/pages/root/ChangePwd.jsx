import React, { useState } from "react";
import { useForm } from "react-hook-form";
// import { supabase } from "../../../libs/supabase";
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

export default function ChangePwd() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [alert, setAlert] = useState({ cnt: 0, err: null });

  const onSubmit = async (formData) => {
    const { newPassword, confirmPassword } = formData;
    if (newPassword !== confirmPassword) {
      setAlert({
        cnt: alert.cnt + 1,
        err: "새 비밀번호와 확인용 비밀번호가 일치하지 않습니다.",
      });
      return;
    }
    try {
      const user = supabase.auth.user();
      if (!user) {
        throw new Error("사용자 정보를 가져올 수 없습니다.");
      }
      const { error } = await supabase.auth.api.updateUser(user.id, {
        password: newPassword,
      });
      if (error) {
        throw error;
      }
      setAlert({
        cnt: alert.cnt + 1,
        err: "비밀번호가 성공적으로 변경되었습니다.",
      });
    } catch (error) {
      console.error("비밀번호 변경 실패:", error.message);
      setAlert({
        cnt: alert.cnt + 1,
        err: "비밀번호 변경에 실패했습니다.",
      });
    }
  };

  return (
    <LoginLayout
      title="비밀번호 변경"
      alert={
        alert.cnt !== 0 && alert.err && `${alert.err} (횟수: ${alert.cnt})`
      }
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputBox>
          <Label htmlFor="newPassword">새 비밀번호</Label>
          <Input
            {...register("newPassword", {
              required: "새 비밀번호를 입력해 주세요.",
            })}
            id="newPassword"
            type="password"
          />
          {errors.newPassword && (
            <ErrorMsg>{errors.newPassword.message}</ErrorMsg>
          )}
        </InputBox>
        <InputBox>
          <Label htmlFor="confirmPassword">비밀번호 확인</Label>
          <Input
            {...register("confirmPassword", {
              required: "비밀번호 확인을 입력해 주세요.",
            })}
            id="confirmPassword"
            type="password"
          />
          {errors.confirmPassword && (
            <ErrorMsg>{errors.confirmPassword.message}</ErrorMsg>
          )}
        </InputBox>
        <ButtonContainer>
          <Button type="submit">비밀번호 변경</Button>
          <LinkBtn to="/login">로그인</LinkBtn>
        </ButtonContainer>
      </form>
    </LoginLayout>
  );
}
