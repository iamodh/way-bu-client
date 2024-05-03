import styled from "styled-components";

const Div = styled.div`
  position: relative;
  font-size: 18px;
  line-height: 20px;
  font-family: inherit;
  color: var(--color-blue-main);
  text-align: center;
  display: inline-block;
  white-space: nowrap;
`;

const SportTag = styled.button`
  cursor: pointer;
  border: 1px solid var(--color-blue-main);
  padding: var(--padding-9xs) var(--padding-3xs);
  background-color: var(--color-skyblue-light);
  border-radius: var(--br-mini);
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  &:hover {
    border: 2px solid var(--color-blue-main);
    box-shadow: 1px 1px 1px var(--color-gray);
    box-sizing: border-box;
  }
`;

const IndexButton = ({ prop }) => {
  return (
    <SportTag>
      <Div>{prop}</Div>
    </SportTag>
  );
};

export default IndexButton;
