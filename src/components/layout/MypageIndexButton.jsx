import styled from "styled-components";

const EditIcon = styled.img`
  width: 48px;
  height: 48px;
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
  @media screen and (max-width: 768px) {
    width: 32px;
    height: 32px;
  }
`;
const Div = styled.div`
  position: relative;
  line-height: 20px;
  display: inline-block;
  min-width: 32px;
`;
const Text = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0px var(--padding-3xs) 0px var(--padding-5xs);
  text-align: center;
`;
const Button = styled.button`
  min-width: 100px;
  min-height: 100px;
  border: none;
  border-radius: var(--br-xl);
  background-color: var(--color-skyblue-background);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--padding-5xs) var(--padding-9xs);
  gap: var(--gap-5xs);
  text-align: left;
  font-size: var(--font-size-m);
  color: var(--color-black);
  font-family: var(--pretendard-regular);
  transition: transform 0.2 ease-in-out;
  @media screen and (max-width: 768px) {
    font-size: var(--font-size-s);
  }
  &:hover{
    box-shadow: 4px 4px 4px 0px var(--color-gray);
    transform: translate(-2px, -4px);
  }
`;

const IndexButton = ({ edit, prop }) => {
  return (
    <Button>
      <EditIcon loading="lazy" alt={prop} src={edit} />
      <Text>
        <Div>{prop}</Div>
      </Text>
    </Button>
  );
};

export default IndexButton;
