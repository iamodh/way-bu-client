import { Link, Outlet } from "react-router-dom";
import { styled } from "styled-components";
import { client } from "../../../libs/supabase";
import { useRecoilState, useRecoilValue } from "recoil";
import { loggedInUserState } from "../../atom";
import { useEffect, useState } from "react";

const Header = styled.header`
  height: 80px;
  background-color: beige;
`;

const Nav = styled.ul`
  height: 100%;
  display: flex;
  align-items: center;
`;

const NavItem = styled.li`
  list-style: none;
  padding: 20px;
  cursor: pointer;
`;

export default function CommonLayout() {
  /* 새로고침 마다 getSession 해서 로그인 체크 */
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useRecoilState(loggedInUserState);
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
    console.log("로그아웃 되었습니다.");
  };

  return (
    <>
      <Header>
        <Nav>
          <Link to={"/"}>
            <NavItem>Home</NavItem>
          </Link>
          <Link to={"/login"}>
            <NavItem>Login</NavItem>
          </Link>
          <Link to={"signup"}>
            <NavItem>Signup</NavItem>
          </Link>
          <Link to={"/program"}>
            <NavItem>Program</NavItem>
          </Link>
          {loggedInUser ? (
            <button onClick={handleLogout}>로그아웃</button>
          ) : null}
        </Nav>
      </Header>
      <Outlet />
    </>
  );
}
