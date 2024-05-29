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
  grid-row-start: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: var(--font-size-m);
  @media screen and (max-width: 768px) {
    font-size: var(--font-size-s);
  }
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
  @media screen and (max-width: 768px) {
    padding: var(--padding-9xs) var(--padding-5xs);
  }
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
    margin: var(--padding-5xs) var(--padding-xs) var(--padding-5xs);
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
  @media screen and (max-width: 768px) {
    font-size: var(--font-size-s);
  }
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`;
const Footer = styled.footer``;

export default function CommonLayout() {
  /* 새로고침 마다 getSession 해서 로그인 체크 */
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useRecoilState(loggedInUserState);
  const [loggedInUserProfile, setLoggedInUserProfile] = useRecoilState(
    loggedInUserProfileState
  );

  async function checkLogin() {
    // 세션 정보를 가져옵니다.
    // 세션으로부터 현재 로그인된 유저 정보를 받고 로그인 유저가 변경될 시 반영
    const { data: authData, error: authError } = await client.auth.getSession();
    if (authError) {
      console.error("Authentication error:", authError);
      return;
    }
    const { session } = authData;
    if (session) {
      const { user } = session;

      if (user) {
        // session으로부터 auth.user 정보를 받아오고 auth.user로 부터 userProfle 정보를 받아옴
        setLoggedInUser(user);
        const { data: userProfile, error: profileError } = await client
          .from("USER_PROFILE")
          .select("*")
          .eq("user_id", user.id);

        if (profileError) {
          console.error("Error fetching user profile:", profileError);
        } else {
          setLoggedInUserProfile(userProfile[0]);
          console.log("User profile:", userProfile[0]);
        }
      }
    } else {
      console.log("No active session found");
    }
  }

  useEffect(() => {
    checkLogin();
  }, []);

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
          <StyledLink to={"/"}>
            <Logo src="/img/logo.png" />
          </StyledLink>
          <Div />
          <StyledLink to={"/login"}>
            <SignItem>로그인</SignItem>
          </StyledLink>
          {loggedInUser ? (
            <button onClick={handleLogout}>로그아웃</button>
          ) : null}
          {!loggedInUser ? (
            <Link to={"/signup"}>
              <NavItem>Signup</NavItem>
            </Link>
          ) : null}
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
          <StyledLink to={"/matching"}>
            <NavItem>매칭</NavItem>
          </StyledLink>
          <StyledLink to={"/community"}>
            <NavItem>커뮤니티</NavItem>
          </StyledLink>
        </Nav>
      </Header>
      <Outlet />
      <Footer></Footer>
    </>
  );
}
