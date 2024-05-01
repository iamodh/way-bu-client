import styled from "styled-components";

const LinkText = styled.div`
  flex: 1;
  position: relative;
  line-height: 19.33px;
`;
const LinkText1 = styled.div`
  align-self: stretch;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: var(--padding-5xs) var(--padding-7xs);
`;
const LinkTextWrapper = styled.div`
  width: 70px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0px var(--padding-4xs) 0px 0px;
  box-sizing: border-box;
`;
const Logo = styled.div`
  position: relative;
  display: inline-block;
  min-width: 6px;
`;
const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: var(--padding-5xs-5) 0px 0px;
`;
const LinkText2 = styled.div`
  position: relative;
  line-height: 19.33px;
  display: inline-block;
  min-width: 59px;
`;
const LinkTextContainer = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: var(--padding-5xs);
`;
const SignRoot = styled.nav`
  margin: 0;
  align-self: stretch;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-end;
  padding: var(--padding-2xs) var(--padding-59xl) var(--padding-3xs);
  gap: var(--gap-12xs);
  text-align: left;
  font-size: var(--m-size);
  color: var(--black);
  font-family: var(--l-bold);
  @media screen and (max-width: 450px) {
    padding-left: var(--padding-xl);
    padding-right: var(--padding-xl);
    box-sizing: border-box;
  }
`;

const Sign = () => {
  return (
    <SignRoot>
      <LinkTextWrapper>
        <LinkText1>
          <LinkText>로그인</LinkText>
        </LinkText1>
      </LinkTextWrapper>
      <Header>
        <Logo>|</Logo>
      </Header>
      <LinkTextContainer>
        <LinkText2>회원가입</LinkText2>
      </LinkTextContainer>
    </SignRoot>
  );
};

export default Sign;
