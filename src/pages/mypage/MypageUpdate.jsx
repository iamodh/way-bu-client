import styled from "styled-components";
import { client } from "../../../libs/supabase";
import { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { loggedInUserState, loggedInUserProfileState } from "../../atom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const MypageUpdateWrapper = styled.form`
  width: 80%;
  max-width: 700px;
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

const SportSelect = styled.select`
  font-size: inherit;
  padding: 2px var(--padding-xs);
  border: 1px solid var(--color-gray);
  border-radius: var(--br-8xs);
  color: var(--color-black);
  &:hover {
    background-color: var(--color-skyblue-light);
  }
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

const Button = styled.button`
  cursor: pointer;
  border: none;
  width: 160px;
  font-size: var(--font-size-m);
  padding: var(--padding-base) var(--padding-base);
  background-color: var(--color-blue-main);
  color: var(--color-white);
  border-radius: var(--br-3xs);
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: var(--color-blue-dark);
    box-sizing: border-box;
  }
  @media screen and (max-width: 768px) {
    padding: var(--padding-5xs) var(--padding-xs);
  }
`;

export default function MypageUpdate() {
  const [loggedInUser, setLoggedInUser] = useRecoilState(loggedInUserState);
  const [loggedInUserProfile, setLoggedInUserProfile] = useRecoilState(
    loggedInUserProfileState
  );
  const [sportList, setSportList] = useState([]);
  const navigate = useNavigate();
  /* 스포츠 목록 불러오기 */
  async function getSportList() {
    const { data, error } = await client.from("SPORT").select("id, title");
    setSportList(data);
    console.log(data);
  }
  useEffect(() => {
    getSportList();
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  /* 폼이 제출되었을 때 개인정보 업데이트 */
  const onSubmit = (formData) => {
    updateUserInfo(formData);
    reset();
    navigate("/mypage/" + loggedInUserProfile.id);
  };

  /* 개인정보 수정하는 함수 */
  async function updateUserInfo(formData) {
    // not null인 항목만 업데이트 되도록 함
    const updateProfile = {};
    const updateAccount = {};

    if (formData.name) {
      updateProfile.user_nickname = formData.name;
    }
    if (formData.birth_date) {
      updateProfile.birth_date = formData.birth_date;
    }
    if (formData.email) {
      updateAccount.email = formData.email;
    }
    // if (formData.password) {
    //   updateAccount.password = formData.password;
    // }
    if (formData.phone) {
      updateProfile.phone = formData.phone;
    }
    if (formData.favoriteSport) {
      updateProfile.favoriteSports = formData.favoriteSport;
    }
    const { data, error } = await client
      .from("USER_PROFILE")
      .update(updateProfile)
      .eq("id", loggedInUserProfile.id)
      .select();
    if (error) {
      console.log(error);
    } else {
      console.log(data);
      console.log("avatar url is changed");
      console.log(data[0]);
      setLoggedInUserProfile(data[0]);
    }

    // setLoggedInUserProfile(data1[0]);
    // const { data2 } = await client.auth.updateUser(updateAccount);
    // setLoggedInUser(data2[0]);
  }

  return (
    <MypageUpdateWrapper onSubmit={handleSubmit(onSubmit)}>
      <Title>개인정보 수정하기</Title>
      <ItemBox>
        <ItemTitle htmlFor="myName">이름</ItemTitle>
        <InputText
          {...register("name")}
          type="text"
          id="myName"
          placeholder={loggedInUserProfile.user_nickname}
        />
        <ItemTitle htmlFor="myBirth">생년월일</ItemTitle>
        <InputText
          {...register("birth_date")}
          type="date"
          id="myBirth"
          defaultValue={loggedInUserProfile.birth_date}
        />
        <ItemTitle htmlFor="myEmail">이메일</ItemTitle>
        <InputText
          {...register("email")}
          type="email"
          id="myEmail"
          placeholder={loggedInUser.email}
        />
        <ItemTitle htmlFor="myPassword">비밀번호 변경</ItemTitle>
        <InputText {...register("password")} type="text" id="myPassword" />
        <ItemTitle htmlFor="myPassword2">비밀번호 확인</ItemTitle>
        <InputText {...register("password2")} type="text" id="myPassword2" />
        <ItemTitle htmlFor="myPhone">전화번호</ItemTitle>
        <InputWith>
          <InputText
            {...register("phone")}
            type="text"
            id="myPhone"
            placeholder={loggedInUserProfile.phone}
          />
          <BtnConfirm>인증</BtnConfirm>
        </InputWith>
        <ItemTitle htmlFor="myFavoriteSport">선호종목 설정</ItemTitle>
        {sportList != null ? (
          <SportSelect {...register("favoriteSport")} id="myFavoriteSport">
            <option value="none">== 선택 ==</option>
            {sportList.map((sport, i) => {
              return (
                <option key={i} value={sport.id}>
                  {sport.title}
                </option>
              );
            })}
          </SportSelect>
        ) : (
          "Loading..."
        )}
      </ItemBox>
      <Button>저장하기</Button>
    </MypageUpdateWrapper>
  );
}
