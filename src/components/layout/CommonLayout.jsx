import { Link, Outlet } from "react-router-dom";
import { styled } from "styled-components";

const Header = styled.header`
  display: flex;
  flex-direction: column;
  font-family: "Pretendard-regular";
  box-shadow: 0px 5px 10px 0px lightgray;
`;
const Sign = styled.div`
  grid-row-start: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: var(--font-size-m);
`;
const Logo = styled.img`
  width: 120px;
  object-fit: cover;
  margin: var(--padding-3xs) var(--padding-13xl);
  @media screen and (max-width: 768px) {
    width: 80px;
    margin: var(--padding-9xs) var(--padding-3xs);
  }
`;
const Div = styled.div`
  flex: 1;
`;
const SignItem = styled.div`
  padding: var(--padding-9xs) var(--padding-xs);
  cursor: pointer;
  font-size: inherit;
`;
const Search = styled.div``;
const SearchInput = styled.input`
  display: none;
`;

const SearchButton = styled.button`
  width: var(--font-size-m);
  height: var(--font-size-m);
  background-image: url("/icon/search.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-color: transparent;
  border: none;
  margin: 0 var(--padding-5xs);
`;
const Alarm = styled.button`
  width: var(--font-size-m);
  height: var(--font-size-m);
  background-image: url("/icon/alarm.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-color: transparent;
  border: none;
  margin: 0 var(--padding-5xs);
`;
const ProfileImage = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  margin: var(--padding-5xs) 64px var(--padding-5xs);
  @media screen and (max-width: 768px) {
    width: 40px;
    height: 40px;
    margin: var(--padding-9xs) var(--padding-xs) var(--padding-9xs);
  }
`;
const Nav = styled.div`
  max-width: 1000px;
  width: 70%;
  margin: 0 auto;
  padding: 10px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  @media screen and (max-width: 768px) {
    /* background-color: salmon; */
    width: 100%;
    padding: var(--padding-9xs) var(--padding-3xs);
  }
`;
const NavItem = styled.div`
  padding: var(--padding-9xs) var(--padding-xl);
  cursor: pointer;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

export default function CommonLayout() {
  return (
    <>
      <Header>
        <Sign>
          <StyledLink to={"/"}>
            <Logo src="/img/logo.png" />
          </StyledLink>
          <Div />
          <StyledLink to={"/login"}>
            <SignItem>로그인</SignItem>
          </StyledLink>
          <StyledLink to={"/signup"}>
            <SignItem>회원가입</SignItem>
          </StyledLink>
          <Search>
            <SearchInput type="text" />
            <SearchButton />
          </Search>
          <Alarm />
          <StyledLink to="/mypage">
            <ProfileImage src="/img/ellipse-13@2x.png" />
          </StyledLink>
        </Sign>
        <Nav>
          <StyledLink to={"/program"}>
            <NavItem>프로그램</NavItem>
          </StyledLink>
          <StyledLink to={"/sports"}>
            <NavItem>스포츠</NavItem>
          </StyledLink>
          <StyledLink to={"/matcing"}>
            <NavItem>매칭</NavItem>
          </StyledLink>
          <StyledLink to={"/"}>
            <NavItem>커뮤니티</NavItem>
          </StyledLink>
        </Nav>
      </Header>
      <Outlet />
    </>
  );
}
