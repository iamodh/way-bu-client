import { styled, keyframes } from "styled-components";
import { useForm } from "react-hook-form";
import { client } from "../../../libs/supabase";
import { useState } from "react";

const Wrapper = styled.div`
  padding: 32px;
`;

const Form = styled.form`
  max-width: 800px;
  margin: 0 auto;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: bold;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const ErrorMsg = styled.span`
  color: red;
`;

const alertAnimation = keyframes`
  0%{
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
    if (error) {
      setAlert((prev) => {
        return { ...prev, cnt: prev.cnt + 1, err: error.message };
      });
      return;
    }
    console.log(data);
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
          <InputBox>
            <label htmlFor="email">이메일</label>
            <input
              {...register("email", { required: "이메일을 입력해 주세요." })}
              id="email"
              type="email"
            />
            <ErrorMsg>{errors?.email?.message}</ErrorMsg>
          </InputBox>
          <InputBox>
            <label htmlFor="password">비밀번호</label>
            <input
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
            <ErrorMsg>{errors?.password?.message}</ErrorMsg>
          </InputBox>
          <button style={{ padding: "10px" }}>회원가입</button>
        </Form>
      </Wrapper>
    </>
  );
}
