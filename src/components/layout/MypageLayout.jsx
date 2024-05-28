import styled from "styled-components";
import Profile from "./MypageProfile";
import IndexButton from "./MypageIndexButton";
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { NavLink, Outlet } from "react-router-dom";
import { loggedInUserState, loggedInUserProfileState } from "../../atom";
import { client } from "../../../libs/supabase";

const MypageWrapper = styled.div`
  width: 100%;
  font-family: "Pretendard-Regular";
  display: flex;
  flex-direction: column;
  gap: var(--gap-base);
  margin: var(--padding-xl) 0;
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
    background-color: var(--color-sand-light);
    box-shadow: 4px 4px 4px 0px var(--color-gray);
    transform: translate(-2px, -4px);
  }
`;

export default function MypageLayout() {
  const [loggedInUser, setLoggedInUser] = useRecoilState(loggedInUserState);
  const [loggedInUserProfile, setLoggedInUserProfile] = useRecoilState(
    loggedInUserProfileState
  );

  const [userPrograms, setUserPrograms] = useState();
  const [userPosts, setUserPosts] = useState();
  const [userComments, setUserComments] = useState();
  const [isProgramsLoading, setIsProgramsLoading] = useState(true);
  const [isPostsLoading, setIsPostsLoading] = useState(true);
  const [isCommentsLoading, setIsCommentsLoading] = useState(true);

  useEffect(() => {
    getUserPrograms();
    getPosts();
    getComments();
  }, [loggedInUserProfile]);

  // 사용자가 참여한 프로그램 목록 불러오기
  async function getUserPrograms() {
    const { data, error } = await client
      .from("PROGRAM")
      .select(`*`)
      .in("id", loggedInUserProfile.joined_programs);
    setUserPrograms(data);
    setIsProgramsLoading(false);
    if (error) {
      console.log(error.message);
      return;
    }
  }

  // 사용자가 작성한 후기 목록 불러오기
  const getPosts = async () => {
    let { data: posts } = await client.from("POST").select("*");
    setUserPosts(posts);
    setIsPostsLoading(false);
  };

  // 사용자가 작성한 댓글 목록 불러오기
  const getComments = async () => {
    let { data: comments } = await client.from("COMMENT").select("*");
    setUserComments(comments);
    setIsCommentsLoading(false);
  };

  return (
    <MypageWrapper>
      <Profile data={loggedInUserProfile} />
      <Index>
        <StyledLink end to={"/mypage/" + loggedInUserProfile.id}>
          <IndexButton edit="/icon/person.svg" text="개인정보" />
        </StyledLink>
        {/* <IndexButton to={"/mypage/program"} edit="/icon/tube.svg" text="내 프로그램" /> */}
        <StyledLink to={"/mypage/" + loggedInUserProfile.id + "/review"}>
          <IndexButton edit="/icon/edit.svg" text="후기" />
        </StyledLink>
        <StyledLink to={"/mypage/" + loggedInUserProfile.id + "/community"}>
          <IndexButton edit="/icon/community.svg" text="커뮤니티" />
        </StyledLink>
        <StyledLink to={"/mypage/" + loggedInUserProfile.id + "/matching"}>
          <IndexButton edit="/icon/smile.svg" text="매칭" />
        </StyledLink>
        {/* <IndexButton to={"/mypage/following"} edit="/icon/userplus.svg" text="팔로잉" /> */}
        <StyledLink to={"/mypage/" + loggedInUserProfile.id + "/setting"}>
          <IndexButton edit="/icon/setting.svg" text="설정" />
        </StyledLink>
      </Index>
      {isProgramsLoading || isPostsLoading || isCommentsLoading ? (
        "Loading..."
      ) : (
        <Outlet context={{ userPrograms, userPosts, userComments }} />
      )}
    </MypageWrapper>
  );
}
