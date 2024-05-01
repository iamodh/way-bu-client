import styled from "styled-components";

const Pw = styled.div`
  align-self: stretch;
  position: relative;
`;
const PwWrapper = styled.div`
  width: 120px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: var(--padding-2xs-5) 0px 0px;
  box-sizing: border-box;
`;
const InputSignupChild = styled.div`
  height: 40px;
  flex: 1;
  position: relative;
  border-radius: var(--br-8xs);
  background-color: var(--white);
  border: 1px solid var(--gray);
  box-sizing: border-box;
  min-width: 240px;
  max-width: 100%;
`;
const InputSignupRoot = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
  gap: var(--gap-base);
  max-width: 100%;
  text-align: left;
  font-size: var(--m-size);
  color: var(--black);
  font-family: var(--l-bold);
`;

const InputSignup = ({ pw }) => {
  return (
    <InputSignupRoot>
      <PwWrapper>
        <Pw>{pw}</Pw>
      </PwWrapper>
      <InputSignupChild />
    </InputSignupRoot>
  );
};

export default InputSignup;
