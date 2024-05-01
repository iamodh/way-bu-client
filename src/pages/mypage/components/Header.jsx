import { useCallback } from "react";
import styled from "styled-components";

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
const LogoWrapper = styled.div`
  width: 182px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;
const LinkText = styled.b`
  position: relative;
  display: inline-block;
  min-width: 74px;
  white-space: nowrap;
`;
const LinkText1 = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: var(--padding-5xs);
`;
const LinkText2 = styled.b`
  position: relative;
  display: inline-block;
  min-width: 60px;
`;
const LinkTextWrapper = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: var(--padding-5xs) var(--padding-7xs);
`;
const LinkText3 = styled.b`
  flex: 1;
  position: relative;
`;
const LinkTextContainer = styled.div`
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
  justify-content: flex-start;
  padding: 0px var(--padding-xl) 0px var(--padding-13xl);
  gap: var(--gap-80xl);
  text-align: left;
  font-size: var(--l-bold-size);
  color: var(--color-darkslategray);
  font-family: var(--l-bold);
  @media screen and (max-width: 725px) {
    gap: var(--gap-30xl);
  }
  @media screen and (max-width: 450px) {
    gap: var(--gap-6xl);
  }
`;
const PageListWrapper = styled.nav`
  margin: 0;
  width: 465px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: var(--padding-mini) 0px 0px;
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
const SearchbarWrapper = styled.div`
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
const SporttagIcon = styled.img`
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
const HeaderRoot = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  padding: 0px var(--padding-45xl) 0px var(--padding-13xl);
  box-sizing: border-box;
  gap: var(--gap-xl);
  max-width: 100%;
  text-align: left;
  font-size: var(--font-size-13xl);
  color: var(--main-blue);
  font-family: var(--font-mansalva);
`;

const Header = () => {
  const onLogoContainerClick = useCallback(() => {
    // Please sync "Index-1" to the project
  }, []);

  const onSporttagClick = useCallback(() => {
    // Please sync "mypage_following" to the project
  }, []);

  return (
    <HeaderRoot>
      <LogoWrapper>
        <Logo onClick={onLogoContainerClick}>
          <WayBu>WAY_BU</WayBu>
        </Logo>
      </LogoWrapper>
      <PageListWrapper>
        <PageList>
          <LinkText1>
            <LinkText>프로그램</LinkText>
          </LinkText1>
          <LinkTextWrapper>
            <LinkText2>스포츠</LinkText2>
          </LinkTextWrapper>
          <LinkTextContainer>
            <LinkText3>매칭</LinkText3>
          </LinkTextContainer>
          <LinkText1>
            <LinkText>커뮤니티</LinkText>
          </LinkText1>
        </PageList>
      </PageListWrapper>
      <Menubox>
        <SearchbarWrapper>
          <Searchbar>
            <IconSerch loading="lazy" alt="" src="/icon-serch2.svg" />
          </Searchbar>
        </SearchbarWrapper>
        <AlarmWrapper>
          <AlarmIcon loading="lazy" alt="" src="/alarm2.svg" />
        </AlarmWrapper>
        <SporttagIcon
          loading="lazy"
          alt=""
          src="/frame-1512.svg"
          onClick={onSporttagClick}
        />
      </Menubox>
    </HeaderRoot>
  );
};

export default Header;
