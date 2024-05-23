import { Link, Outlet, useLocation } from "react-router-dom";
import { styled } from "styled-components";
import { client } from "../../../libs/supabase";
import { useRecoilState, useRecoilValue } from "recoil";
import { loggedInUserState, loggedInUserProfileState } from "../../atom";
import { useEffect, useState } from "react";

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
  /* 새로고침 마다 getSession 해서 로그인 체크 */
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useRecoilState(loggedInUserState);
  const [loggedInUserProfile, setLoggedInUserProfile] = useRecoilState(
    loggedInUserProfileState
  );

  useEffect(() => {
    getCurrentSession();
  }, []);

  const getCurrentSession = async () => {
    const { data, error } = await client.auth.getSession();
    if (!data.session) {
      return;
    }
    if (error) {
      console.log(error.message);
      return;
    }
    if (data.session) {
      setLoggedInUser(data.session.user);
    }
  };

  /* logout */
  const handleLogout = async () => {
    const { error } = await client.auth.signOut();
    if (error) {
      console.log(error.message);
      return;
    }
    setLoggedInUser(null);
    setLoggedInUserProfile(null);
    console.log("로그아웃 되었습니다.");
  };

  return (
    <>
      <Header>
        <Sign>
          <StyledLink to={"/login"}>
            <NavItem>로그인</NavItem>
          </StyledLink>
          {loggedInUser ? (
            <button onClick={handleLogout}>로그아웃</button>
          ) : null}
          {!loggedInUser ? (
            <Link to={"/signup"}>
              <NavItem>Signup</NavItem>
            </Link>
          ) : null}
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
            <StyledLink to={"/community"}>
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
