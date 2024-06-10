import styled from "styled-components";
import { Link } from "react-router-dom";

const Wrapper = styled(Link)`
  width: 100%;
  height: 100%;
  @media screen and (max-width: 768px) {
    height: 160px;
  }
  background-color: black;
`;
const Item = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  flex-wrap: wrap;
  padding: var(--padding-13xl) var(--padding-5xs);
  height: 100%;
  margin: 0 var(--padding-9xs);

  background: var(--color-skyblue-background, #edf4f7);
  border-radius: var(--br-mini);
  @media screen and (max-width: 768px) {
    border-radius: var(--br-8xs);
    padding: var(--padding-base) var(--padding-5xs);
  }
`;
const Tag = styled.div`
  display: flex;
  font-size: 14px;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  border: 1px solid ${(props) => props.color};
  color: ${(props) => props.color};
  padding: var(--padding-9xs) var(--padding-5xs);
  background-color: ${(props) => props.bgcolor};
  border-radius: var(--br-mini);
  @media screen and (max-width: 768px) {
    padding: var(--padding-9xs);
    font-size: var(--font-size-s);
  }
`;
const MatchingTitle = styled.div`
  font-size: var(--font-size-m);
  font-weight: bold;
  margin-top: var(--padding-5xs);
`;
const Date = styled.div`
  font-size: var(--font-size-s);
  margin-bottom: var(--padding-xs);
`;

export default function UserMatchingItem({ matching }) {
  let color = `var(--color-tag-${matching.SPORT.theme_color}-front)`;
  let bgcolor = `var(--color-tag-${matching.SPORT.theme_color}-back)`;

  return (
    <Wrapper to={"/matching/" + matching.id}>
      <Item>
        <Tag color={color} bgcolor={bgcolor}>
          {matching.SPORT.title}
        </Tag>
        <MatchingTitle>{matching.title}</MatchingTitle>
        <Date>{matching.date}</Date>
      </Item>
    </Wrapper>
  );
}
