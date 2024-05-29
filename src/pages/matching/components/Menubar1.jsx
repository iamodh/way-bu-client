import { useCallback } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

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
const Div = styled.div`
  position: relative;
  display: inline-block;
  min-width: 6px;
`;
const Wrapper = styled.div`
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
const Sign = styled.nav`
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
const WayBu = styled.h1`
  margin: 0;
  position: relative;
  font-size: inherit;
  font-weight: 400;
  font-family: inherit;
`;
const Logo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: var(--padding-3xl-5) 0px var(--padding-5xs-5);
  cursor: pointer;
`;
const LinkText3 = styled.b`
  position: relative;
  display: inline-block;
  min-width: 74px;
  white-space: nowrap;
`;
const LinkText4 = styled.b`
  position: relative;
  display: inline-block;
  min-width: 60px;
`;
const LinkTextFrame = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: var(--padding-5xs) var(--padding-7xs);
`;
const LinkText5 = styled.b`
  flex: 1;
  position: relative;
`;
const FrameDiv = styled.div`
  width: 53px;
  overflow: hidden;
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: var(--padding-5xs) var(--padding-7xs);
  box-sizing: border-box;
`;
const PageList = styled.nav`
  margin: 0;
  align-self: stretch;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  padding: 0px var(--padding-xl);
  gap: var(--gap-xl);
  text-align: left;
  font-size: var(--l-bold-size);
  color: var(--color-darkslategray);
  font-family: var(--l-bold);
`;
const PageListWrapper = styled.nav`
  margin: 0;
  width: 642px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: var(--padding-xl) 0px 0px;
  box-sizing: border-box;
  max-width: 100%;
`;
const IconSerch = styled.img`
  height: 25px;
  width: 25px;
  position: relative;
`;
const Searchbar = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding: var(--padding-5xs);
`;
const SearchBarContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: var(--padding-lgi-5) 0px 0px;
`;
const AlarmIcon = styled.img`
  width: 57px;
  height: 62px;
  position: relative;
`;
const AlarmWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: var(--padding-4xs) 0px 0px;
`;
const MenuboxChild = styled.img`
  height: 80px;
  width: 80px;
  position: relative;
  cursor: pointer;
`;
const Menubox = styled.div`
  width: 337px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  max-width: 100%;
`;
const Header = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  padding: 0px var(--padding-28xl-5);
  box-sizing: border-box;
  gap: var(--gap-xl);
  max-width: 100%;
  @media screen and (max-width: 750px) {
    padding-left: var(--padding-4xl);
    padding-right: var(--padding-4xl);
    box-sizing: border-box;
  }
`;
const MenubarRoot = styled.header`
  align-self: stretch;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.1);
  background-color: var(--white);
  border: 1px solid var(--background-skyblue);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  max-width: 100%;
  text-align: left;
  font-size: var(--font-size-13xl);
  color: var(--main-blue);
  font-family: var(--font-mansalva);
`;

const Menubar1 = () => {
  const navigate = useNavigate();

  const onLogoContainerClick = useCallback(() => {
    // Please sync "Index-1" to the project
  }, []);

  const onFrameClick = useCallback(() => {
    navigate("/mypage-following");
  }, [navigate]);

  return (
    <MenubarRoot>
      <Sign>
        <LinkTextWrapper>
          <LinkText1>
            <LinkText>로그인</LinkText>
          </LinkText1>
        </LinkTextWrapper>
        <Wrapper>
          <Div>|</Div>
        </Wrapper>
        <LinkTextContainer>
          <LinkText2>회원가입</LinkText2>
        </LinkTextContainer>
      </Sign>
      <Header>
        <Logo onClick={onLogoContainerClick}>
          <WayBu>WAY_BU</WayBu>
        </Logo>
        <PageListWrapper>
          <PageList>
            <LinkTextContainer>
              <LinkText3>프로그램</LinkText3>
            </LinkTextContainer>
            <LinkTextFrame>
              <LinkText4>스포츠</LinkText4>
            </LinkTextFrame>
            <FrameDiv>
              <LinkText5>매칭</LinkText5>
            </FrameDiv>
            <LinkTextContainer>
              <LinkText3>커뮤니티</LinkText3>
            </LinkTextContainer>
          </PageList>
        </PageListWrapper>
        <Menubox>
          <SearchBarContainer>
            <Searchbar>
              <IconSerch loading="lazy" alt="" src="/icon-serch11.svg" />
            </Searchbar>
          </SearchBarContainer>
          <AlarmWrapper>
            <AlarmIcon loading="lazy" alt="" src="/alarm1.svg" />
          </AlarmWrapper>
          <MenuboxChild
            loading="lazy"
            alt=""
            src="/frame-1511.svg"
            onClick={onFrameClick}
          />
        </Menubox>
      </Header>
    </MenubarRoot>
  );
};

export default Menubar1;
