import styled from "styled-components";
import Profile from "./MypageProfile";
import IndexButton from "./MypageIndexButton";
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { NavLink, Outlet } from "react-router-dom";
import { loggedInUserState, loggedInUserProfileState } from "../../atom";
import { client } from "../../../libs/supabase";
import { useParams, useNavigate } from "react-router-dom";

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
  /* 회원 정보 불러오기 */
  const [loggedInUser, setLoggedInUser] = useRecoilState(loggedInUserState);
  const [loggedInUserProfile, setLoggedInUserProfile] = useRecoilState(
    loggedInUserProfileState
  );
  const { id: url_id } = useParams();

  const [userProfiles, setUserProfiles] = useState();
  const [userPrograms, setUserPrograms] = useState();
  const [userPosts, setUserPosts] = useState();
  const [userComments, setUserComments] = useState();
  const [userReviews, setUserReviews] = useState();
  const [userMatchings, setUserMatchings] = useState();

  const [isProfilesLoading, setIsProfilesLoading] = useState(true);
  const [isProgramsLoading, setIsProgramsLoading] = useState(true);
  const [isPostsLoading, setIsPostsLoading] = useState(true);
  const [isCommentsLoading, setIsCommentsLoading] = useState(true);
  const [isReviewsLoading, setIsReviewsLoading] = useState(true);
  const [isMatchingsLoading, setIsMatchingsLoading] = useState(true);

  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!loggedInUser || !loggedInUserProfile || loggedInUser.id != url_id) {
  //     navigate("/login");
  //   }
  // }, []);

  useEffect(() => {
    getProfiles();
    getUserPrograms();
    getPosts();
    getComments();
    getReviews();
    getMatchings();
  }, [loggedInUserProfile]);

  // 전체 사용자 목록 불러오기
  async function getProfiles() {
    const { data: users, error } = await client
      .from("USER_PROFILE")
      .select(`*`);
    setUserProfiles(users);
    setIsProfilesLoading(false);
    if (error) {
      console.log(error.message);
      return;
    }
  }

  // 사용자가 참여한 프로그램 목록 불러오기
  async function getUserPrograms() {
    const { data, error } = await client
      .from("PROGRAM")
      .select(`*, BUSINESS(business_name)`)
      .in("id", loggedInUserProfile.joined_programs);
    setUserPrograms(data);
    setIsProgramsLoading(false);
    if (error) {
      console.log(error.message);
      return;
    }
  }

  // 모든 게시글 목록 불러오기
  const getPosts = async () => {
    let { data: posts } = await client.from("POST").select("*");
    setUserPosts(posts);
    setIsPostsLoading(false);
  };

  // 모든 댓글 목록 불러오기
  const getComments = async () => {
    let { data: comments } = await client.from("COMMENT").select("*");
    setUserComments(comments);
    setIsCommentsLoading(false);
  };

  // 모든 후기 목록 불러오기
  const getReviews = async () => {
    let { data: reviews } = await client
      .from("PROGRAM_REVIEW")
      .select(
        "*, USER_PROFILE(user_nickname), PROGRAM(program_name, BUSINESS(business_name))"
      );
    setUserReviews(reviews);
    setIsReviewsLoading(false);
  };

  // 모든 매칭 목록 불러오기
  const getMatchings = async () => {
    let { data: matching } = await client
      .from("MATCHING")
      .select("*, SPORT(title, theme_color)");
    setUserMatchings(matching);
    setIsMatchingsLoading(false);
  };

  const [count, setCount] = useState({
    countLikes: 0,
    countReviews: 0,
    countMatchings: 0,
  });
  /* 좋아요, 후기, 매칭 카운트 */
  useEffect(() => {
    /* 좋아요 카운트 */
    if (userPosts) {
      let i = 0;
      let countPosts = userPosts.filter(
        (p) => p.user_nickname === loggedInUserProfile.user_nickname
      );
      countPosts.forEach((p) => (i += p.thumbs));
      setCount((prvCount) => {
        return { ...prvCount, countLikes: i };
      });
      // console.log(count.thumbs, countPosts);
    }
    /* 후기 카운트 */
    if (userReviews) {
      let countReviews = userReviews.filter(
        (r) => r.writter === loggedInUserProfile.id
      );
      setCount((prvCount) => {
        return { ...prvCount, countReviews: countReviews.length };
      });
      // console.log(count.reviews, countReviews);
    }
    /* 매칭 카운트 */
    if (userMatchings) {
      let countMatchings = userMatchings.filter(
        (m) =>
          m.hoset === loggedInUser.id ||
          (m.joining_users && m.joining_users.includes(loggedInUser.id))
      );
      setCount((prvCount) => {
        return { ...prvCount, countMatches: countMatchings.length };
      });
      // console.log(count.matchings, countMatchings);
    }
  }, [userPosts, userReviews, userMatchings]);

  return (
    <MypageWrapper>
      {count ? <Profile count={count} /> : null}
      {loggedInUserProfile && loggedInUserProfile.id == url_id ? (
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
      ) : null}

      {!(loggedInUserProfile && loggedInUserProfile.id == url_id) ||
      isProfilesLoading ||
      isProgramsLoading ||
      isPostsLoading ||
      isCommentsLoading ||
      isReviewsLoading ||
      isMatchingsLoading ? null : (
        <Outlet
          context={{
            userProfiles,
            userPrograms,
            userPosts,
            userComments,
            userReviews,
            userMatchings,
          }}
        />
      )}
    </MypageWrapper>
  );
}
