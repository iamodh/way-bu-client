// 
import { styled } from "styled-components";

const Label = styled.label`
  position: relative;
  font-size: var(--font-size-m);
  line-height: 20px;
  font-family: inherit;
  color: inherit;
  text-align: center;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  cursor: pointer;
  border: 1px solid ${(props) => props.color};
  color: ${(props) => props.color};
  padding: var(--padding-9xs) var(--padding-3xs);
  background-color: ${(props) => props.bgcolor};
  border-radius: var(--br-mini);
  overflow: hidden;
  &:hover {
    border: 2px solid ${(props) => props.color};
    box-shadow: 1px 1px 1px var(--color-gray);
  }
  @media screen and (max-width: 768px) {
    padding: 1px var(--padding-5xs);
    font-size: var(--font-size-s);
  }
`;

const Tag = styled.input`
  display: none;
  &:checked + label {
    background-color: ${(props) => props.color};
    color: ${(props) => props.bgcolor};
    border: 2px solid var(--color-navy);
  }
`;

export default function SportsTag({ sport }) {
  let color = `var(--color-tag-${sport.theme_color}-front)`;
  let bgcolor = `var(--color-tag-${sport.theme_color}-back)`;

  return (
    <>
      <Tag
        type="checkbox"
        value={sport.title}
        name={sport.title}
        id={sport.title}
        color={color}
        bgcolor={bgcolor}
      />
      <Label htmlFor={sport.title} color={color} bgcolor={bgcolor}>
        {sport.title}
      </Label>
    </>
  );
}
