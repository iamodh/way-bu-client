import styled from "styled-components";

const Div = styled.div`
  position: relative;
  font-size: var(--font-size-l);
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
  padding: var(--padding-xl) var(--padding-xl);
  background-color: var(--color-blue-main);
  color: var(--color-white);
  border-radius: var(--br-3xs);
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: var(--color-navy);
    box-sizing: border-box;
  }
`;

const IndexButton = ({ width, text }) => {
  return (
    <Button width={width}>
      <Div>{text}</Div>
    </Button>
  );
};

export default IndexButton;
