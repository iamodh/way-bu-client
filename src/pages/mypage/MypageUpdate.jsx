import styled from "styled-components";
import Button from "../../components/ButtonBlue";
import { client } from "../../../libs/supabase";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const MypageUpdateWrapper = styled.form`
  width: 80%;
  margin: var(--padding-base) auto;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--gap-21xl);
  text-align: left;
  font-size: var(--font-size-m);
  @media screen and (max-width: 768px) {
    gap: var(--gap-17xl);
    font-size: var(--font-size-s);
  }
`;
const Title = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  font-weight: bold;
  font-size: var(--font-size-xl);
  @media screen and (max-width: 768px) {
    font-size: var(--font-size-l);
  }
`;
const ItemBox = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 3fr;
  justify-items: flex-start;
  align-items: center;
  gap: var(--gap-base);
  text-align: left;
  @media screen and (max-width: 768px) {
    gap: var(--gap-3xs);
  }
`;
const ItemTitle = styled.label`
  display: flex;
  align-content: center;
`;
const InputText = styled.input`
  width: 100%;
  border: 1px solid var(--color-gray);
  border-radius: var(--br-8xs);
  padding: var(--padding-5xs);
  font-size: inherit;
`;
const InputWith = styled.div`
  display: grid;
  grid-template-columns: 4fr 1fr;
  gap: var(--gap-5xs);
`;
const BtnConfirm = styled.button`
  cursor: pointer;
  border: 1px solid var(--color-blue-main);
  padding: var(--padding-9xs);
  border-radius: var(--br-mini);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-blue-main);
  background-color: transparent;
  &:hover {
    background-color: var(--color-skyblue-background);
  }
  &:active {
    background-color: var(--color-blue-main);
    color: var(--color-white);
  }
`;

export default function MypageUpdate() {
  const user_id = "aa4005a5-5f17-40d0-bce1-a022a2002f28";
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  /* 폼이 제출되었을 때 개인정보 업데이트 */
  const onSubmit = (formData) => {
    updateUserInfo(formData);
    console.log("UPDATE::", formData);
  };

  /* 렌더링 될 때마다 개인정보 읽어옴 */
  useEffect(() => {
    getUserProfile();
    console.log("START::", userProfile);
    if (!isLoading) console.log("NAME::", userProfile.user_nickname);
  }, []);

  /* 개인정보 불러오는 함수 */
  async function getUserProfile() {
    const { data, error } = await client
      .from("USER_PROFILE")
      .select("user_nickname, birth_date")
      .eq("user_id", user_id);
    setUserProfile(data);
    setIsLoading(false);
    if (error) {
      console.log(error.message);
      return;
    }
  }

  // 이메일 불러오기
  // async function getUser() {
  //   client.auth.email({
  //     email: formData.email,
  //     password: formData.password,
  //   });
  // }

  /* 개인정보 수정하는 함수 */
  async function updateUserInfo(formData) {
    const { data, error } = await client.auth.updateUser({
      email: formData.email,
      password: formData.password,
    });
  }
  return (
    <MypageUpdateWrapper onSubmit={handleSubmit(onSubmit)}>
      <Title>개인정보 수정하기</Title>
      {isLoading ? (
        "Loading..."
      ) : (
        <ItemBox>
          <ItemTitle htmlFor="myName">이름</ItemTitle>
          <InputText
            {...register("name")}
            type="text"
            id="myName"
            placeholder={userProfile.user_nickname}
          />
          <ItemTitle htmlFor="myBirth">생년월일</ItemTitle>
          <InputText
            {...register("birth")}
            type="date"
            id="myBirth"
            placeholder={userProfile.birth_date}
          />
          <ItemTitle htmlFor="myEmail">이메일</ItemTitle>
          <InputText {...register("email")} type="email" id="myEmail" />
          <ItemTitle htmlFor="myPassword">비밀번호 변경</ItemTitle>
          <InputText {...register("password")} type="text" id="myPassword" />
          <ItemTitle htmlFor="myPassword2">비밀번호 확인</ItemTitle>
          <InputText {...register("password2")} type="text" id="myPassword2" />
          <ItemTitle htmlFor="myPhone">전화번호</ItemTitle>
          <InputWith>
            <InputText {...register("phone")} type="text" id="myPhone" />
            <BtnConfirm>인증</BtnConfirm>
          </InputWith>
        </ItemBox>
      )}

      <Button type="submit" text={"저장하기"} size={"m"} />
    </MypageUpdateWrapper>
  );
}
