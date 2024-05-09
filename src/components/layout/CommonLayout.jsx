import { Link, Outlet } from "react-router-dom";
import { styled } from "styled-components";

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
          <Link to={"/signup"}>
            <NavItem>Signup</NavItem>
          </Link>
          <Link to={"/program"}>
            <NavItem>Program</NavItem>
          </Link>
        </Nav>
      </Header>
      <Outlet />
    </>
  );
}
