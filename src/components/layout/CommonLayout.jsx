import { Link, Outlet, useLocation } from "react-router-dom";
import { styled } from "styled-components";

const Header = styled.header`
  display: flex;
  flex-direction: column;
  font-family: "Pretendard-regular";
  box-shadow: 0px 5px 10px 0px lightgray;
`;
const Sign = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  font-size: var(--font-size-m);
`;
const Logo = styled.img`
  width: 140px;
  height: 40px;
  background-color: var(--color-blue-main);
`;

const Menubar = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Nav = styled.ul`
  width: 30%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;
const NavItem = styled.li`
  border: 2px solid salmon;

  padding: var(--padding-9xs) var(--padding-xl);
  list-style: none;
  cursor: pointer;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`;
const Search = styled.div``;
const SearchInput = styled.input``;

const SearchButton = styled.button``;
const Alarm = styled.button``;
const ProfileImage = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  margin-right: 64px;
`;

export default function CommonLayout() {
  return (
    <>
      <Header>
        <Sign>
          <StyledLink to={"/login"}>
            <NavItem>로그인</NavItem>
          </StyledLink>
          <StyledLink to={"/signup"}>
            <NavItem>회원가입</NavItem>
          </StyledLink>
        </Sign>
        <Menubar>
          <StyledLink to={"/"}>
            <Logo />
          </StyledLink>
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
          <Search>
            <SearchInput type="text" />
            <SearchButton />
          </Search>
          <Alarm />
          <StyledLink to="/mypage">
            <ProfileImage src="/img/ellipse-13@2x.png" />
          </StyledLink>
        </Menubar>
      </Header>
      <Outlet />
    </>
  );
}
