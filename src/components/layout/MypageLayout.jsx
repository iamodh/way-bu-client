import styled from "styled-components";
import Profile from "./MypageProfile";
import IndexButton from "./MypageIndexButton";
import { NavLink, Outlet } from "react-router-dom";
// import { useRecoilState } from "recoil";
// import { mypageIndexState } from "../../atom";
// import { useEffect } from "react";

const MypageWrapper = styled.div`
  width: 100%;
  font-family: "Pretendard-Regular";
  display: flex;
  flex-direction: column;
  gap: var(--gap-base);
  @media screen and (max-width: 768px) {
    gap: var(--gap-base);
  }
`;

const Index = styled.div`
  display: flex;
  width: 90%;
  margin: 0 auto;
  flex-direction: row;
  justify-content: center;
  gap: var(--gap-base);
  flex-wrap: wrap;
  @media screen and (max-width: 768px) {
    gap: var(--gap-5xs);
  }
`;

// NavLink : isActive라고 active 상태를 저장하는 변수가 있어서 사용
const StyledLink = styled(NavLink)`
  text-decoration: none;
  width: 100px;
  height: 100px;
  border-radius: 10%;
  background-color: var(--color-skyblue-background);
  overflow: hidden;
  transition: transform 0.2 ease-in-out;
  text-decoration: none;
  color: var(--color-black);
  @media screen and (max-width: 768px) {
    width: 60px;
    height: 60px;
    font-size: var(--font-size-s);
  }
  &:hover {
    box-shadow: 4px 4px 4px 0px var(--color-gray);
    transform: translate(-2px, -4px);
  }
  &.active {
    background-color: var(--color-sand-bright);
    box-shadow: 4px 4px 4px 0px var(--color-gray);
    transform: translate(-2px, -4px);
  }
`;

export default function MypageLayout() {
  // Menubar 완성 후 Profile 위에 추가 예정
  return (
    <MypageWrapper>
      <Profile />
      <Index>
        <StyledLink end to={"/mypage"}>
          <IndexButton edit="/icon/person.svg" text="개인정보" />
        </StyledLink>
        {/* <IndexButton to={"/mypage/program"} edit="/icon/tube.svg" text="내 프로그램" /> */}
        <StyledLink to={"/mypage/review"}>
          <IndexButton edit="/icon/edit.svg" text="후기" />
        </StyledLink>
        <StyledLink to={"/mypage/community"}>
          <IndexButton edit="/icon/community.svg" text="커뮤니티" />
        </StyledLink>
        <StyledLink to={"/mypage/matching"}>
          <IndexButton edit="/icon/smile.svg" text="매칭" />
        </StyledLink>
        {/* <IndexButton to={"/mypage/following"} edit="/icon/userplus.svg" text="팔로잉" /> */}
        <StyledLink to={"/mypage/setting"}>
          <IndexButton edit="/icon/setting.svg" text="설정" />
        </StyledLink>
      </Index>
      <Outlet />
    </MypageWrapper>
  );
}
