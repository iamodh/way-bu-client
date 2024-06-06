import { styled } from "styled-components";
import React from "react";

const Label = styled.label`
  position: relative;
  font-size: var(--font-size-m);
  height: 40px;
  line-height: 30px;
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
  @media screen and (max-width: 376px) {
    padding: 1px;
    font-size: var(--font-size-xs);
    height: 30px;
    line-height: 28px;
    width: 31px;
    font-weight: bold;
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

const BeachTag = ({ beach, onClick, hasClicked }) => {
  let color = `var(--color-tag-${beach.theme_color}-front)`;
  let bgcolor = `var(--color-tag-${beach.theme_color}-back)`;

  const beachName = beach.beach_name.replace("해수욕장","")

  return (
    <>
      <Tag
        type="radio"
        id={beach.beach_name}
        checked={hasClicked}
        onChange={onClick}
        color={color}
        bgcolor={bgcolor}
        name="beach"
      />
      <Label htmlFor={beach.beach_name} color={color} bgcolor={bgcolor} checked={hasClicked}>
        {beachName}
      </Label>
    </>
  );
};

export default BeachTag;
