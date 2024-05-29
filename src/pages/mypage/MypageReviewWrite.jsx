import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Rating } from "react-simple-star-rating";
import { useRecoilState } from "recoil";
import { loggedInUserState, loggedInUserProfileState } from "../../atom";
import { client } from "../../../libs/supabase";

const Wrapper = styled.form`
  width: 70%;
  max-width: 700px;
  min-width: 200px;
  margin: var(--padding-base) auto;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--gap-21xl);
  text-align: left;
  font-size: var(--font-size-m);
  @media screen and (max-width: 768px) {
    gap: var(--gap-xl);
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
const ProgramBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--padding-9xs);
  padding: var(--padding-xs);
  border-radius: var(--br-mini);
  background-color: var(--color-skyblue-background);
`;
const BlueText = styled.div`
  color: var(--color-blue-main);
  font-size: var(--font-size-m);
  font-weight: bold;
`;
const ProgramName = styled.div`
  /* font-size: var(--font-size-m); */
  font-weight: bold;
`;
const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: var(--padding-5xs);
`;
const Label = styled.label`
  font-weight: bold;
  margin-right: var(--padding-5xs);
`;
const Div = styled.div`
  margin-left: var(--padding-5xs);
`;

const RatingBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const TextBox = styled.div`
  display: flex;
  flex-direction: row;
`;
const Textarea = styled.textarea`
  flex: 1;
  margin: var(--padding-9xs) 0;
  padding: var(--padding-5xs);
  border-radius: var(--br-8xs);
  margin: 0;
`;
const Button = styled.div`
  cursor: pointer;
  border: none;
  width: 160px;
  font-size: var(--font-size-m);
  padding: var(--padding-xs);
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
    padding: var(--padding-5xs);
    width: 100px;
  }
`;

export default function MypageReviewWrite() {
  /* 회원정보 불러오기 */
  const [loggedInUser, setLoggedInUser] = useRecoilState(loggedInUserState);
  const [loggedInUserProfile, setLoggedInUserProfile] = useRecoilState(
    loggedInUserProfileState
  );

  /* 프로그램 데이터 파싱 받기 */
  const navigate = useNavigate();
  const program = useLocation().state;

  /* 별점 매기기 */
  const [rating, setRating] = useState(0);
  const handleRating = (rate) => {
    setRating(rate);
  };
  const onPointerEnter = () => {};

  /* 후기 작성하기 */
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const addReview = async (formData) => {
    const { data, error } = await client
      .from("PROGRAM_REVIEW")
      .insert([
        {
          content: formData.content,
          writter: loggedInUserProfile.id,
          score: rating,
          program_id: program.id,
        },
      ])
      .select();
    if (error) {
      console.error(error);
      return;
    }
    console.log("작성완료");
    reset();
    navigate("/mypage/" + loggedInUserProfile.id, {
      replace: true,
    });
  };

  return (
    <Wrapper onSubmit={handleSubmit(addReview)}>
      <Title>후기 작성하기</Title>
      <ProgramBox>
        <BlueText>프로그램 정보</BlueText>
        <ProgramName>{program.program_name}</ProgramName>
        <Div>업체 : {program.BUSINESS.business_name}</Div>
        <Div>가격 : {program.price}원</Div>
        <Div>난이도 : {program.difficulty}</Div>
      </ProgramBox>
      <InputBox>
        <RatingBox>
          <Label htmlFor="rating">별점</Label>
          <Rating
            onClick={handleRating}
            size="24px"
            fillColor="var(--color-blue-main)"
          />
          <Div>({rating}.0)</Div>
        </RatingBox>
        <TextBox>
          <Label htmlFor="content">내용</Label>
          <Textarea
            rows="8"
            {...register("content", {
              required: "내용을 입력해 주세요.",
            })}
            id="content"
          ></Textarea>
        </TextBox>
      </InputBox>
      <Button>작성하기</Button>
    </Wrapper>
  );
}
