import styled from "styled-components";
import UserProgramItem from "./components/UserProgramItem";
import UserReviewItem from "./components/UserReviewItem";

const MypageReviewWrapper = styled.form`
  width: 90%;
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
const UserProgramArea = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
`;
const UserProgramList = styled.ul`
  width: 88%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--padding-9xs);
`;
const ButtonLeft = styled.button`
  position: absolute;
  top: 45%;
  left: 0px;
  width: 5%;
  padding: 0;
  border: none;
  background-color: transparent;
  font-weight: bold;
`;
const ButtonRight = styled.button`
  position: absolute;
  top: 45%;
  right: 0px;
  width: 5%;
  padding: 0;
  border: none;
  background-color: transparent;
  font-weight: bold;
`;
const UserReviewArea = styled(UserProgramArea)`
  width: 90%;
  flex-direction: column;
  margin-bottom: var(--padding-base);
`;
const UserReviewList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: var(--padding-5xs);
  margin-bottom: var(--padding-xs);
`;
const Hr = styled.div`
  width: 100%;
  height: 0.5px;
  background-color: var(--color-gray);
`;
const PageIndex = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: var(--padding-9xs);
`;
const Page = styled.a`
  font-size: var(--font-size-m);
  padding: var(--padding-9xs);
`;
const test = [
  {
    program_name: "test",
    business_id: 88,
    price: 88000,
    open_time: "10:00",
    close_time: "19:00",
  },
];
export default function MypageReview() {
  return (
    <MypageReviewWrapper>
      <Title>후기 작성</Title>
      <UserProgramArea>
        <ButtonLeft>{"<"}</ButtonLeft>
        <UserProgramList>
          <UserProgramItem program={test[0]} />
          <UserProgramItem program={test[0]} />
          <UserProgramItem program={test[0]} />
        </UserProgramList>
        <ButtonRight>{">"}</ButtonRight>
      </UserProgramArea>
      <Hr />
      <Title>내가 작성한 후기</Title>
      <UserReviewArea>
        <UserReviewList>
          <UserReviewItem />
          <UserReviewItem />
          <UserReviewItem />
        </UserReviewList>
        <PageIndex>
          <Page>1</Page>
          <Page>2</Page>
          <Page>3</Page>
          <Page>4</Page>
        </PageIndex>
      </UserReviewArea>
    </MypageReviewWrapper>
  );
}
