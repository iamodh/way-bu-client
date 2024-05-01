import styled from "styled-components";

const Div = styled.div`
  align-self: stretch;
  position: relative;
`;
const Wrapper = styled.div`
  width: 120px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: var(--padding-xs) 0px 0px;
  box-sizing: border-box;
`;
const FrameChild = styled.input`
  border: 1px solid var(--gray);
  outline: none;
  background-color: var(--white);
  align-self: stretch;
  height: 40px;
  position: relative;
  border-radius: var(--br-8xs);
  box-sizing: border-box;
  min-width: 178px;
`;
const ConfirmSignupInner = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: var(--padding-11xs-5) 0px 0px;
  box-sizing: border-box;
  min-width: 193px;
`;
const Div1 = styled.div`
  position: relative;
  font-size: var(--m-size);
  line-height: 19.33px;
  font-family: var(--l-bold);
  color: var(--color-cornflowerblue-100);
  text-align: center;
  display: inline-block;
  min-width: 32px;
`;
const BtnConfirm = styled.button`
  cursor: pointer;
  border: 1px solid var(--main-blue);
  padding: var(--padding-3xs) var(--padding-2xs) var(--padding-3xs)
    var(--padding-xs);
  background-color: transparent;
  width: 57px;
  border-radius: var(--br-xl);
  box-sizing: border-box;
  overflow: hidden;
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  &:hover {
    background-color: var(--color-dodgerblue-200);
    border: 1px solid var(--color-dodgerblue-100);
    box-sizing: border-box;
  }
`;
const ConfirmSignupRoot = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
  gap: var(--gap-base);
  text-align: left;
  font-size: var(--m-size);
  color: var(--black);
  font-family: var(--l-bold);
`;

const ConfirmSignup = () => {
  return (
    <ConfirmSignupRoot>
      <Wrapper>
        <Div>전화번호</Div>
      </Wrapper>
      <ConfirmSignupInner>
        <FrameChild type="text" />
      </ConfirmSignupInner>
      <BtnConfirm>
        <Div1>인증</Div1>
      </BtnConfirm>
    </ConfirmSignupRoot>
  );
};

export default ConfirmSignup;
