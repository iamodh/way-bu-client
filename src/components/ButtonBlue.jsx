import styled from "styled-components";

const Div = styled.div`
  position: relative;
  font-size: inherit;
  line-height: 20px;
  font-family: inherit;
  color: inherit;
  text-align: center;
  display: inline-block;
  white-space: nowrap;
`;

const Button = styled.button`
  cursor: pointer;
  border: none;
  width: ${(props) => props.width};
  font-size: ${(props) => props.fontsize};
  padding: var(--padding-base) var(--padding-base);
  background-color: var(--color-blue-main);
  color: var(--color-white);
  border-radius: var(--br-3xs);
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: var(--color-blue-dark);
    box-sizing: border-box;
  }
  @media screen and (max-width: 768px) {
    padding: var(--padding-3xs) var(--padding-3xs);
  }
`;

const ButtonBlue = ({ text, size }) => {
  /* default */
  let width = "160px";
  let fontsize = "var(--font-size-m)";
  if (size == "m") {
    width = "160px";
    fontsize = "var(--font-size-m)";
  } else if (size == "l") {
    width = "200px";
    fontsize = "var(--font-size-l)";
  } else {
    width = size;
  }
  return (
    <Button width={width} fontSize={fontsize}>
      <Div>{text}</Div>
    </Button>
  );
};

export default ButtonBlue;
