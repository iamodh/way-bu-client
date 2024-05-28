import styled from "styled-components";
import { useForm } from "react-hook-form";
import { client } from "../../../libs/supabase";
import { useRecoilState } from "recoil";
import { loggedInUserState, loggedInUserProfileState } from "../../atom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import kakaoLogo from "/img/kakao.png";
import googleLogo from "/img/google.png";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
`;

const Form = styled.form`
  width: 100%;
  max-width: 800px;
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
  display: block;
  width: 75%;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const Check = styled.div`
  /* margin-bottom: 20px; */
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
`;

const Find = styled.div`
  padding: 1px;
`;

const Remember = styled.div`
  display: flex;
  align-items: center;
  margin-left: 150px;
  /* padding: 1px; */
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px 20px;
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
  width: 100%;
  padding: 20px 0;
`;

const Button = styled.button`
  width: 50%;
  padding: 15px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 19px;
  margin-bottom: 12px;
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

const LogoLoginContainer = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-top: 20px;
`;

const StyledButton = styled.button`
  padding: 10px;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e0e0e0;
  }

  img {
    width: 100%;
    height: 100%;
  }
`;

const KakaoButton = styled(StyledButton)`
  background-color: #fee500;
`;

const GoogleButton = styled(StyledButton)`
  background-color: #ffffff;
  border: 1px solid;
  border-color: gray;
`;

export default function Login() {
  /* Form */
  // 로그인 폼을 이용한 로그인
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loggedInUser, setLoggedInUser] = useRecoilState(loggedInUserState);
  const [loggedInUserProfile, setLoggedInUserProfile] = useRecoilState(
    loggedInUserProfileState
  );
  const [isLoading, setIsLoading] = useState(true);

  const onSubmit = async (formData) => {
    signInWithEmail(formData);
  };

  async function signInWithEmail(formData) {
    const { data, error } = await client.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });
    if (error) {
      setAlert({ cnt: alert.cnt + 1, err: error.message });
      return;
    }
    setLoggedInUser(data.session.user);
    checkLogin();
    console.log("로그인 정보", data.session.user);

    const rememberMe = () => formData.rememberMe;

    if (rememberMe) {
      await saveCredentials(formData.email, formData.password);
    }
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

  async function checkLogin() {
    // 세션 정보를 가져옵니다.
    // 세션으로부터 현재 로그인된 유저 정보를 받고 로그인 유저가 변경될 시 반영
    const { data: authData, error: authError } = await client.auth.getSession();
    if (authError) {
      console.error("Authentication error:", authError);
      return;
    }
    const { session } = authData;
    if (session) {
      const { user } = session;

      if (user) {
        // session으로부터 auth.user 정보를 받아오고 auth.user로 부터 userProfle 정보를 받아옴
        setLoggedInUser(user);
        const { data: userProfile, error: profileError } = await client
          .from("USER_PROFILE")
          .select("*")
          .eq("user_id", user.id);

        if (profileError) {
          console.error("Error fetching user profile:", profileError);
        } else {
          setLoggedInUserProfile(userProfile[0]);
          console.log("User profile:", userProfile[0]);
        }
      }
    } else {
      console.log("No active session found");
    }
    setIsLoading(false);
  }

  useEffect(() => {
    checkLogin();
  }, []);

  const [avatarFile, setAvatarFile] = useState(null);

  const uploadFile = async () => {
    // db에 avatar 이미지 파일을 저장
    if (!avatarFile) {
      console.log("no file exist");
      return;
    }
    const filePath = `${loggedInUser.id}-${new Date().getTime()}`;
    // 저장하는 파일명을 user_id로 해서 주인을 구분하고
    // 동일한 파일명을 사용시 변경을 인지하지 못해 page가 rendering되지 않는 문제를 해결하기 위해 뒤에 시간 값을 추가

    if (loggedInUserProfile.avatar_url) {
      // 기존의 avatar가 존재할 경우 삭제
      const oldPath = loggedInUserProfile.avatar_url.replace(
        import.meta.env.VITE_STORE_URL + "avatar/",
        ""
      );
      const { data: deleteData, error: deleteError } = await client.storage
        .from("avatar")
        .remove([oldPath]);
      if (deleteError) {
        console.error("Error deleting file:", deleteError);
        return;
      }
      console.log("File deleted successfully:", deleteData);
    }

    const { data, error } = await client.storage
      .from("avatar")
      .upload(filePath, avatarFile, {
        cacheControl: "no-cache, no-store, must-revalidate",
        upsert: true,
      });
    const {
      data: { publicUrl },
    } = await client.storage.from("avatar").getPublicUrl(filePath);

    updateUserAvatar(publicUrl);
    if (error) {
      console.log(error);
    } else {
      console.log(data);
      console.log("file uploaded");
    }
  };

  const updateUserAvatar = async (url) => {
    // user_profile의 avatar_url을 변경된 url로 업데이트
    const { data, error } = await client
      .from("USER_PROFILE")
      .update({ avatar_url: url })
      .eq("user_id", loggedInUser.id)
      .select();
    if (error) {
      console.log(error);
    } else {
      console.log(data);
      console.log("avatar url is changed");

      setLoggedInUserProfile(data);
    }
  };

  const handleImage = (e) => {
    //선택한 파일 정보를 저장
    console.log(e.target.files[0]);
    setAvatarFile(e.target.files[0]);
  };

  /* Login Error 처리 */
  const [alert, setAlert] = useState({ cnt: 0, err: null });

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

  const UnLoggedPage = () => {
    return (
      <Wrapper>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Title>로그인</Title>
          <GreyHR />
          <InputBox>
            <Label htmlFor="email">이메일</Label>
            <Input
              {...register("email")}
              id="email"
              type="email"
              placeholder="이메일을 입력하세요"
              required
            />
            {errors?.email && <ErrorMsg>{errors.email.message}</ErrorMsg>}
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
              required
              placeholder="비밀번호를 입력하세요"
            />
            {errors?.password && <ErrorMsg>{errors.password.message}</ErrorMsg>}
          </InputBox>
          <Check>
            <Remember>
              <input
                type="checkbox"
                id="remember"
                {...register("rememberMe")}
              />
              <Label htmlFor="remember">기억하기</Label>
            </Remember>
            <Find>
              <Link to="/find-id">이메일 찾기</Link> |{" "}
              <Link to="/find-pwd">비밀번호 찾기</Link>
            </Find>
          </Check>
          <ButtonContainer>
            <Button type="submit">로그인</Button>
            <Link to="/signup">회원가입</Link>
          </ButtonContainer>
          <LogoLoginContainer>
            <KakaoButton onClick={kakaoLogin}>
              <img src={kakaoLogo} alt="카카오 로그인" />
            </KakaoButton>
            <GoogleButton onClick={googleLogin}>
              <img src={googleLogo} alt="구글 로그인" />
            </GoogleButton>
          </LogoLoginContainer>
        </Form>
      </Wrapper>
    );
  };

  const LoggedPage = () => {
    if (isLoading) return <>Loading...</>;

    const user = loggedInUserProfile ? loggedInUserProfile : null;
    const userName = user
      ? user.user_nickname
      : loggedInUser.user_metadata.name;
    const avatarUrl = user
      ? user.avatar_url
      : loggedInUser.user_metadata.avatar_url;
    const birthDate = user ? user.birth_date : null;
    const joinPath = user ? user.join_path : null;

    return (
      <Wrapper>
        <p>{loggedInUser.email}</p>
        <p>{userName}</p>
        <img width={"150px"} height={"200px"} src={avatarUrl} alt="프사" />
        <p>{birthDate}</p>
        <p>{joinPath}</p>
        <form action="/">
          <input
            type="file"
            accept="image/jpeg, image/png"
            name="input_avatar"
            onChange={handleImage}
          />
        </form>
        <button onClick={uploadFile}>변경</button>
      </Wrapper>
    );
  };

  return <>{loggedInUser ? <LoggedPage /> : <UnLoggedPage />}</>;
}
//   );
