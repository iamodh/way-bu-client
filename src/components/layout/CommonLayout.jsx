import {
  Link,
  Outlet,
  useLocation,
  useMatch,
  useNavigate,
} from "react-router-dom";
import { styled } from "styled-components";
import { client } from "../../../libs/supabase";
import { useRecoilState, useRecoilValue } from "recoil";
import { loggedInUserState, loggedInUserProfileState } from "../../atom";
import { useEffect, useState } from "react";

const Wrapper = styled.div`
  font-family: "Pretendard-regular";
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  font-family: "Pretendard-regular";
  background-color: var(--color-white);
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.1);
  position: ${(props) => (props.$fixed ? "fixed" : "block")};
  width: ${(props) => (props.$fixed ? "100%" : "auto")};
  z-index: 10;
  font-size: var(--font-size-l);
  padding-bottom: var(--padding-xs);
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
  margin-right: 1rem;
  @media screen and (max-width: 768px) {
    padding: var(--padding-9xs) var(--padding-5xs);
  }
`;
const Search = styled.div``;
const SearchInput = styled.input`
  display: none;
`;

const SearchButton = styled.button`
  width: var(--font-size-l);
  height: var(--font-size-l);
  background-image: url("/icon/search.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-color: transparent;
  border: none;
`;
const Alarm = styled.button`
  width: var(--font-size-l);
  height: var(--font-size-l);
  background-image: url("/icon/alarm.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-color: transparent;
  border: none;
  margin: 0 var(--padding-5xs);
  cursor: pointer;
  position: relative;
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
const Footer = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(27, 73, 101, 1);
  height: 126px;
`;

const FooterText = styled.p`
  color: var(--color-white);
  text-align: center;

  &:first-child {
    flex: 1;
  }
  &:nth-child(3) {
    flex: 1;
  }
`;

const FooterDiv = styled.div`
  width: 1px;
  height: 66px;
  border: 1px solid var(--color-white);
`;

const NotificationBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: absolute;
  left: -125px;
  top: 30px;
  width: 280px;
  height: 400px;
  overflow-y: auto;
  z-index: 1;
  background-color: white;
  border: 1px solid black;
  cursor: auto;
  @media screen and (max-width: 768px) {
    width: 200px;
    left: -120px;
  }
`;

const NotificationCount = styled.div`
  position: absolute;
  left: 10px;
  top: -10px;
  background-color: red;
  color: white;
  width: 15px;
  height: 15px
  text-align: center;
  line-height: 15px;
  font-size:10px;
  border-radius: 50%;
`;

const NotificationUnread = styled.span``;

const NotificationRead = styled.span`
  opacity: 0.4;
`;

const NotificationTime = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 10px;
  font-weight: 700;
  width: 100%;
`;

const NotificationObj = styled.div`
  padding: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  width: 100%;
`;

const NotificationTitle = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
`;

export default function CommonLayout() {
  /* 새로고침 마다 getSession 해서 로그인 체크 */
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useRecoilState(loggedInUserState);
  const [loggedInUserProfile, setLoggedInUserProfile] = useRecoilState(
    loggedInUserProfileState
  );
  const [notifications, setNotifications] = useState([]);
  const [notificationError, setNotificationError] = useState(null);
  const [showNotificationBox, setShowNotificationBox] = useState(false);

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

  useEffect(() => {
    const fetchNotifications = async () => {
      if (loggedInUser) {
        const { data, error } = await client
          .from("NOTIFICATION")
          .select("*")
          .eq("user_id", loggedInUser.id);
        if (error) {
          setNotificationError("알림을 가져오는 중 오류가 발생했습니다.");
        } else {
          setNotifications(data);
        }
      }
    };
    fetchNotifications();
  }, [loggedInUser]);

  const navigate = useNavigate();

  /* logout */
  const handleLogout = async () => {
    const { error } = await client.auth.signOut();
    if (error) {
      console.log(error.message);
      return;
    }
    setLoggedInUser(null);
    setLoggedInUserProfile(null);
    navigate("/");
    console.log("로그아웃 되었습니다.");
    navigate("/");
  };

  const Notification = () => {
    const monthsAgo = notifications.filter(
      (n) =>
        new Date() - new Date(n.created_at) > 1000 * 60 * 60 * 24 * 30 &&
        new Date() - new Date(n.created_at) < 1000 * 60 * 60 * 24 * 365
    );

    const weeksAgo = notifications.filter(
      (n) =>
        new Date() - new Date(n.created_at) > 1000 * 60 * 60 * 24 * 7 &&
        new Date() - new Date(n.created_at) < 1000 * 60 * 60 * 24 * 30
    );

    const daysAgo = notifications.filter(
      (n) =>
        new Date() - new Date(n.created_at) > 1000 * 60 * 60 * 24 &&
        new Date() - new Date(n.created_at) < 1000 * 60 * 60 * 24 * 7
    );

    const today = notifications.filter(
      (n) => new Date() - new Date(n.created_at) < 1000 * 60 * 60 * 24
    );

    const notificationMapping = (notification) => {
      return (
        <NotificationObj key={notification.id}>
          <StyledLink
            to={
              notification.post_id
                ? `/community/${notification.post_id}`
                : `/matching/${notification.matching_id}`
            }
            onClick={async () => {
              if (notification.is_read) return;
              const { error } = await client
                .from("NOTIFICATION")
                .update({ is_read: true })
                .eq("id", notification.id);
              if (error) {
                console.error("Error updating notification:", error);
              }
              notification.is_read = true;
              setNotifications([...notifications]);
            }}
          >
            {notification.is_read ? (
              <NotificationRead>
                {notification.content}
                <NotificationTitle>{notification.title}</NotificationTitle>
              </NotificationRead>
            ) : (
              <NotificationUnread>
                {notification.content}
                <NotificationTitle>{notification.title}</NotificationTitle>
              </NotificationUnread>
            )}
          </StyledLink>
        </NotificationObj>
      );
    };

    if (!showNotificationBox) return null;
    if (notificationError) {
      return (
        <NotificationBox>
          <NotificationObj>{notificationError}</NotificationObj>
        </NotificationBox>
      );
    }
    if (notifications.length > 0) {
      return (
        <NotificationBox>
          {today.length > 0 && (
            <>
              <NotificationTime>오늘</NotificationTime>
              {today.map((notification) => notificationMapping(notification))}
            </>
          )}
          {daysAgo.length > 0 && (
            <>
              <NotificationTime>이번 주</NotificationTime>
              {daysAgo.map((notification) => notificationMapping(notification))}
            </>
          )}
          {weeksAgo.length > 0 && (
            <>
              <NotificationTime>이번 달</NotificationTime>
              {weeksAgo.map((notification) =>
                notificationMapping(notification)
              )}
            </>
          )}
          {monthsAgo.length > 0 && (
            <>
              <NotificationTime>올해</NotificationTime>
              {monthsAgo.map((notification) =>
                notificationMapping(notification)
              )}
            </>
          )}
        </NotificationBox>
      );
    } else {
      return (
        <NotificationBox>
          <NotificationObj>알림이 없습니다.</NotificationObj>
        </NotificationBox>
      );
    }
  };

  const NotificationCounter = () => {
    if (
      notificationError ||
      notifications.filter((n) => !n.is_read).length === 0
    )
      return null;

    return (
      <NotificationCount>
        {notifications.filter((n) => !n.is_read).length}
      </NotificationCount>
    );
  };

  /* index나 sorts 페이지일때 fixed */
  const location = useLocation();
  const fixed = location.pathname === "/";
  console.log(fixed);
  return (
    <Wrapper>
      <Header $fixed={fixed}>
        <Sign>
          <StyledLink to={"/"}>
            <Logo src="/img/logo.png" />
          </StyledLink>
          <Div />
          {loggedInUser ? (
            <SignItem onClick={handleLogout}>로그아웃</SignItem>
          ) : (
            <StyledLink to={"/login"}>
              <SignItem>로그인</SignItem>
            </StyledLink>
          )}
          <Search>
            <SearchInput type="text" />
            <SearchButton />
          </Search>
          <Alarm onClick={() => setShowNotificationBox(!showNotificationBox)}>
            <NotificationCounter />
            <Notification />
          </Alarm>
          {loggedInUser && loggedInUserProfile ? (
            <StyledLink to={"/mypage/" + loggedInUserProfile.id}>
              <ProfileImage src={loggedInUserProfile.avatar_url} />
            </StyledLink>
          ) : null}
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
      <Footer>
        <FooterText>
          TEAM <span style={{ fontWeight: 700 }}>WAY-BU</span> | 대표이메일 :
          asdf@ser | 개발자 홈페이지 <br />
          부산광역시 남구 용소로 45, 부경대학교 대연캠퍼스 창의관 3층 (우:
          48513)
        </FooterText>
        <FooterDiv />
        <FooterText>
          <span style={{ fontWeight: 700 }}>고객센터(09:00~18:00)</span> |
          <span style={{ fontWeight: 700 }}>이용약관</span> |
          <span style={{ fontWeight: 700 }}>개인정보처리방침</span> |
          <span style={{ fontWeight: 700 }}>제휴·광고 문의</span>
        </FooterText>
      </Footer>
    </Wrapper>
  );
}
