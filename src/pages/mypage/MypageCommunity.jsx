import styled from "styled-components";
import UserPostItem from "./components/UserPostItem";

const MypageCommunityWrapper = styled.form`
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
const TypeList = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: var(--padding-5xs);
  width: 100%;
`;
const Label = styled.label`
  display: flex;
  font-size: var(--font-size-m);
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  border: 1px solid var(--color-gray);
  color: var(--color-gray);
  padding: var(--padding-9xs) var(--padding-5xs);
  background-color: var(--color-white);
  border-radius: var(--br-8xs);
  overflow: hidden;
  &:hover {
    border: 1px solid var(--color-blue-main);
    color: var(--color-blue-main);
  }
  @media screen and (max-width: 768px) {
    padding: var(--padding-9xs);
    font-size: var(--font-size-s);
  }
`;

const Type = styled.input`
  display: none;
  &:checked + label {
    background-color: var(--color-skyblue-light);
    color: var(--color-blue-main);
    border: 1px solid var(--color-blue-main);
  }
`;

const UserPostList = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--padding-5xs);
  margin-bottom: var(--padding-xs);
  border-bottom: 1px solid var(--color-gray);
`;

const test = [
  {
    title: "test",
    sport: "서핑",
    view: 88,
    writer: "괴도 김다현",
    date: "2024-04-08",
  },
];
export default function MypageCommunity() {
  return (
    <MypageCommunityWrapper>
      <Title>커뮤니티</Title>
      <TypeList>
        {[
          "내가 쓴 게시글",
          "내가 쓴 댓글",
          "좋아요한 게시글",
          "스크랩 게시글",
        ].map((type) => {
          return (
            <>
              <Type type="radio" value={type} name="typeitem" id={type} />
              <Label htmlFor={type}>{type}</Label>
            </>
          );
        })}
      </TypeList>
      <UserPostList>
        <UserPostItem post={test[0]} />
        <UserPostItem post={test[0]} />
        <UserPostItem post={test[0]} />
      </UserPostList>
    </MypageCommunityWrapper>
  );
}
