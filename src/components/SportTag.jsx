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

export default function SportsTag({ prop }) {
  console.log(prop.name, prop.theme);
  let color = `var(--color-tag-${prop.theme}-front)`;
  let bgColor = `var(--color-tag-${prop.theme}-back)`;

  return (
    <Tag color={color} bgColor={bgColor}>
      <Div>{prop.name}</Div>
    </Tag>
  );
}

// 정환님 코드
const Object = (props) => {
  const ObjBox = styled.div`
    border: 1px solid rgba(0, 0, 0, 0.5);
    margin: 0.3rem;
    padding: 0 0.5rem;
    border-radius: 0.5rem;
    opacity: 0.5;
    color: ${props.color};
    background-color: ${props.bgColor};
    &:hover {
      cursor: pointer;
      background-color: #5090e9;
      color: white;
      opacity: 1;
    }
  `;
  return <ObjBox color={props.color}>{props.name}</ObjBox>;
};
