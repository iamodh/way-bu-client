import { styled } from "styled-components";

const Tag = styled.div`
  background-color: ${(props) => props.bgcolor};
  color: ${(props) => props.color};
  padding: 4px 8px;
  border-radius: 6px;
  border: 2px solid ${(props) => props.hovercolor};
  font-size: var(--font-size-s);
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.hovercolor};
  }
  transition: all 0.2s ease-in-out;
`;

export default function SportsTag({
  color,
  bgcolor,
  hovercolor,
  text,
  onClick,
}) {
  return (
    <Tag
      bgcolor={bgcolor}
      hovercolor={hovercolor}
      color={color}
      onClick={onClick}
    >
      {text}
    </Tag>
  );
}
