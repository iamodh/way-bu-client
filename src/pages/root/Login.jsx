import styled from "styled-components";
import { useForm } from "react-hook-form";
import { client } from "../../../libs/supabase";
import { useRecoilState } from "recoil";
import { loggedInUserState, loggedInUserProfileState } from "../../atom";
import { useState, useEffect } from "react";

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
  // 로그인 폼을 이용한 로그인
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
  const [loggedInUserProfile, setLoggedInUserProfile] = useRecoilState(
    loggedInUserProfileState
  );
  const [isLoading, setIsLoading] = useState(true);

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
    checkLogin();
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
