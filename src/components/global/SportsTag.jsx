import { styled } from "styled-components";

const Tag = styled.div`
  background-color: ${(props) => props.bgColor};
  color: ${(props) => props.color};
  padding: 4px 8px;
  border-radius: 6px;
  border: 2px solid ${(props) => props.hoverColor};
  font-size: var(--font-size-s);
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.hoverColor};
  }
  transition: all 0.2s ease-in-out;
`;

export default function SportsTag({ color, bgColor, hoverColor, text }) {
  return (
    <Tag bgColor={bgColor} hoverColor={hoverColor} color={color}>
      {text}
    </Tag>
  );
}
