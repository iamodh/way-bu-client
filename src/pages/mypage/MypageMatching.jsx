import styled from "styled-components";
import UserMatchingItem from "./components/UserMatchingItem";
import UserDoneMatchingItem from "./components/UserDoneMatchingItem";

const MypageMatchingWrapper = styled.form`
  width: 90%;
  max-width: 1000px;
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
const UserMatchingArea = styled.div`
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
const UserDoneMatchingArea = styled(UserMatchingArea)`
  width: 90%;
  flex-direction: column;
  margin-bottom: var(--padding-base);
`;
const UserDoneMatchingList = styled.ul`
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
    state: "진행중",
    title: "매칭이름",
    date: "2024-05-24",
  },
];
const test_done = [
  {
    title: "매칭이름",
    sport: "스노쿨링",
    date: "2024-05-24",
    members: [
      {
        img: "/img/ellipse-13@2x.png",
        name: "괴도 김다현",
      },
      {
        img: "/img/ellipse-13@2x.png",
        name: "괴도 키드",
      },
      {
        img: "/img/ellipse-13@2x.png",
        name: "괴도",
      },
    ],
  },
];
export default function MypageMatching() {
  return (
    <MypageMatchingWrapper>
      <Title>진행 중인 매칭</Title>
      <UserMatchingArea>
        <ButtonLeft>{"<"}</ButtonLeft>
        <UserProgramList>
          <UserMatchingItem matching={test[0]} />
          <UserMatchingItem matching={test[0]} />
          <UserMatchingItem matching={test[0]} />
        </UserProgramList>
        <ButtonRight>{">"}</ButtonRight>
      </UserMatchingArea>
      <Hr />
      <Title>진행 종료된 매칭</Title>
      <UserDoneMatchingArea>
        <UserDoneMatchingList>
          <UserDoneMatchingItem matching={test_done[0]} />
          <UserDoneMatchingItem matching={test_done[0]} />
          <UserDoneMatchingItem matching={test_done[0]} />
        </UserDoneMatchingList>
        <PageIndex>
          <Page>1</Page>
          <Page>2</Page>
          <Page>3</Page>
          <Page>4</Page>
        </PageIndex>
      </UserDoneMatchingArea>
    </MypageMatchingWrapper>
  );
}
