import styled from "styled-components";
import Button from "../../../components/ButtonBlue";

const Wrapper = styled.li`
  display: flex;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
  padding: var(--padding-5xs);
  width: 100%;
  /* aspect-ratio: 1.25 / 1;s */
  background: var(--color-skyblue-background, #edf4f7);
  border-radius: var(--br-8xs);
`;
const Tag = styled.div`
  display: flex;
  font-size: var(--font-size-m);
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  border: 1px solid var(--color-blue-main);
  color: var(--color-blue-main);
  padding: var(--padding-9xs) var(--padding-5xs);
  background-color: var(--color-skyblue-light);
  border-radius: var(--br-mini);
  @media screen and (max-width: 768px) {
    padding: var(--padding-9xs);
    font-size: var(--font-size-s);
  }
`;
const MatchingTitle = styled.div`
  font-size: var(--font-size-m);
  font-weight: bold;
`;
const Date = styled.div`
  font-size: var(--font-size-s);
  margin-bottom: var(--padding-xs);
`;

export default function UserMatchingItem({ matching }) {
  return (
    <Wrapper>
      <Tag>{matching.state}</Tag>
      <MatchingTitle>{matching.title}</MatchingTitle>
      <Date>{matching.date}</Date>
    </Wrapper>
  );
}
