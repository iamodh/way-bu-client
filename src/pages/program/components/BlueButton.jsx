import styled from "styled-components";

const Button = styled.button`
  width: ${(props) => props.$width};
  margin: 10px 0 20px 0;
  font-size: ${(props) => props.$fontSize};
  color: ${(props) => props.$textColor};
  height: ${(props) => props.$height};
  background-color: ${(props) => props.$bgColor};
  &:hover {
    background-color: ${(props) => props.$hoverColor};
  }
  transition: all 0.2s ease-in-out;
  border-radius: var(--br-3xs);
  border: ${(props) => props.$border};
  cursor: pointer;
`;

export default function BlueButton({
  text,
  onClick,
  bgColor,
  height,
  hoverColor,
  fontSize,
  textColor,
  width,
}) {
  return (
    <Button
      $bgColor={bgColor ? bgColor : "var(--color-blue-main)"}
      $textColor={textColor ? textColor : "var(--color-white)"}
      $hoverColor={hoverColor ? hoverColor : "var(--color-blue-dark)"}
      $width={width ? width : "calc(100% - 40px)"}
      $height={height ? height : "40px"}
      $fontSize={fontSize ? fontSize : "var(--font-size-m)"}
      onClick={onClick}
      $border={
        bgColor === "var(--color-white)"
          ? "2px solid var(--color-blue-main)"
          : "none"
      }
    >
      {text}
    </Button>
  );
}
