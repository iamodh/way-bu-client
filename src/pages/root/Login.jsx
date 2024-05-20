import styled from "styled-components";
import { useForm } from "react-hook-form";
import { client } from "../../../libs/supabase";
import { useRecoilState } from "recoil";
import { loggedInUserState } from "../../atom";
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

const Alert = styled.span`
  position: absolute;
  width: 400px;
  height: 300px;
  background-color: whitesmoke;
`;

export default function Login() {
  /* Form */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (formData) => {
    signInWithEmail(formData);
  };

  /* login 후 session에서 user 정보를 가져와 전역 state에 저장함 */
  const [loggedInUser, setLoggedInUser] = useRecoilState(loggedInUserState);
  async function signInWithEmail(formData) {
    const { data, error } = await client.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });
    if (error) {
      setAlert((prev) => {
        return { ...prev, cnt: prev.cnt + 1, err: error.message };
      });
      return;
    }
    setLoggedInUser(data.session.user);
    console.log("로그인 정보", data.session.user);
  }

  async function googleLogin() {
    let { data, error } = await client.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:5173/login",
      },
    });
    if (error) console.log(error);
  }

  async function kakaoLogin() {
    let { data, error } = await client.auth.signInWithOAuth({
      provider: "kakao",
      options: {
        redirectTo: "http://localhost:5173/login",
      },
    });
    if (error) console.log(error);
  }

  async function addUserProfile() {}

  /* Login Error 처리 */
  const [alert, setAlert] = useState({ cnt: 0, err: null });

  const UnLoggedPage = () => {
    return (
      <Wrapper>
        {alert.cnt !== 0 && alert ? (
          <Alert key={alert.cnt}>{alert.err + " count: " + alert.cnt}</Alert>
        ) : null}
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Title>로그인</Title>
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
          <button style={{ padding: "10px" }}>로그인</button>
        </Form>
        <button onClick={kakaoLogin} style={{ padding: "10px" }}>
          카카오 로그인
        </button>
        <button onClick={googleLogin} style={{ padding: "10px" }}>
          구글 로그인
        </button>
      </Wrapper>
    );
  };

  const LoggedPage = () => {
    <Wrapper>
      <p>{loggedInUser.email}</p>
      <p>{loggedInUser.user_metadata.name}</p>
      <img
        width={"150px"}
        height={"200px"}
        src={loggedInUser.user_metadata.avatar_url}
        alt=""
      />
    </Wrapper>;
  };

  return <>{loggedInUser ? <LoggedPage /> : <UnLoggedPage />}</>;
}
