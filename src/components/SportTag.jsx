import styled from "styled-components";

const Div = styled.div`
  position: relative;
  font-size: 18px;
  line-height: 20px;
  font-family: inherit;
  color: inherit;
  text-align: center;
  display: inline-block;
  white-space: nowrap;
`;

const Tag = styled.button`
  cursor: pointer;
  border: 1px solid ${(props) => props.color};
  color: ${(props) => props.color};
  padding: var(--padding-9xs) var(--padding-3xs);
  background-color: ${(props) => props.bgColor};
  border-radius: var(--br-mini);
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  &:hover {
    border: 2px solid ${(props) => props.color};
    box-shadow: 1px 1px 1px var(--color-gray);
    box-sizing: border-box;
  }
`;

export default function SportsTag({ sport }) {
  let color = `var(--color-tag-${sport.theme_color}-front)`;
  let bgColor = `var(--color-tag-${sport.theme_color}-back)`;

  return (
    <Tag color={color} bgColor={bgColor}>
      <Div>{sport.title}</Div>
    </Tag>
  );
}
