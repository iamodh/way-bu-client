import { styled } from "styled-components";

const Tag = styled.div`
  white-space: nowrap;
  width: fit-content;
  background-color: ${(props) => props.$bgColor};
  color: ${(props) => props.$color};
  padding: 4px 8px;
  border-radius: var(--br-mini);
  border: 1px solid ${(props) => props.$hoverColor};
  font-size: var(--font-size-s);
  cursor: pointer;
  &:hover {
    box-shadow: 1px 1px 1px var(--color-gray);
  }
  transition: all 0.2s ease-in-out;
  &:active {
    background-color: ${(props) => props.$color};
    color: ${(props) => props.$bgColor};
  }
`;

const ClickedTag = styled(Tag)`
  opacity: 1;
`;

export default function SportsTag({ themeColor, text, onClick, hasClicked }) {
  const frontColor = `var(--color-tag-${themeColor}-front)`;
  const backColor = `var(--color-tag-${themeColor}-back)`;
  return (
    <>
      {hasClicked ? (
        <ClickedTag $bgColor={frontColor} $color={backColor} onClick={onClick}>
          {text}
        </ClickedTag>
      ) : (
        <Tag $bgColor={backColor} $color={frontColor} onClick={onClick}>
          {text}
        </Tag>
      )}
    </>
  );
}
