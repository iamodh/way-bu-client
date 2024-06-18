import styled from "styled-components";
import UserMatchingItem from "./components/UserMatchingItem";
import UserDoneMatchingItem from "./components/UserDoneMatchingItem";
import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { loggedInUserState, loggedInUserProfileState } from "../../atom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MypageMatchingWrapper = styled.form`
  width: 90%;
  max-width: 800px;
  margin: var(--padding-base) auto;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--gap-21xl);
  text-align: left;
  font-size: var(--font-size-m);
  @media screen and (max-width: 768px) {
    gap: var(--gap-xl);
    font-size: var(--font-size-s);
  }
`;
const Title = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  font-weight: bold;
  font-size: var(--font-size-xl);
  @media screen and (max-width: 768px) {
    font-size: var(--font-size-l);
  }
`;
const UserMatchingArea = styled.div`
  min-height: 100px;
  display: flex;
  position: relative;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  width: 100%;
`;
const UserMatchingList = styled(Slider)`
  width: 80%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
const SlickButtonFix = ({ currentSlide, slideCount, children, ...props }) => (
  <span {...props}>{children}</span>
);
const NextArrow = styled.div`
  background-image: url("/icon/arrow-right-circle.svg");
  background-size: contain;
  height: 20px;
  width: 20px;
`;
const PrevArrow = styled.div`
  background-image: url("/icon/arrow-left-circle.svg");
  background-size: contain;
  height: 20px;
  width: 20px;
`;
const UserDoneMatchingArea = styled(UserMatchingArea)`
  width: 90%;
  min-height: 100px;
  display: flex;
  text-align: center;

  flex-direction: column;
  margin-bottom: var(--padding-base);
`;
const UserDoneMatchingList = styled.ul`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: var(--padding-5xs);
  margin-bottom: var(--padding-xs);
`;
const Hr = styled.div`
  width: 100%;
  height: 0.5px;
  background-color: var(--color-gray);
`;
const PageIndex = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: var(--padding-9xs);
`;
const Page = styled.a`
  font-size: var(--font-size-m);
  padding: var(--padding-9xs);
`;
const test = [
  {
    state: "진행중",
    title: "매칭이름",
    date: "2024-05-24",
  },
];
const test_done = [
  {
    title: "매칭이름",
    sport: "스노쿨링",
    date: "2024-05-24",
    members: [
      {
        img: "/img/ellipse-13@2x.png",
        name: "괴도 김다현",
      },
      {
        img: "/img/ellipse-13@2x.png",
        name: "괴도 키드",
      },
      {
        img: "/img/ellipse-13@2x.png",
        name: "괴도",
      },
    ],
  },
];
export default function MypageMatching() {
  /* 회원정보 불러오기 */
  const [loggedInUser, setLoggedInUser] = useRecoilState(loggedInUserState);
  const [loggedInUserProfile, setLoggedInUserProfile] = useRecoilState(
    loggedInUserProfileState
  );

  /* 필요한 데이터 불러오기 */
  const { userMatchings, userProfiles } = useOutletContext();
  const [filteredMatchings, setFilteredMatchings] = useState();
  const [filteredDoneMatchings, setFilteredDoneMatchings] = useState();
  const [settings, setSettings] = useState({
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    speed: 300,
    nextArrow: (
      <SlickButtonFix>
        <NextArrow />
      </SlickButtonFix>
    ),
    prevArrow: (
      <SlickButtonFix>
        <PrevArrow />
      </SlickButtonFix>
    ),
  });

  /* 사용자가 참여한 매칭만 필터링하기 */
  useEffect(() => {
    if (userMatchings) {
      let newUserMatchings = userMatchings.filter(
        (m) =>
          m.joining_users &&
          m.joining_users.includes(loggedInUser.id) &&
          m.state === "진행중"
      );
      let newUserDoneMatchings = userMatchings.filter(
        (m) =>
          m.joining_users &&
          m.joining_users.includes(loggedInUser.id) &&
          m.state === "진행완료"
      );
      setFilteredMatchings(newUserMatchings);
      setFilteredDoneMatchings(newUserDoneMatchings);

      // settings 객체 업데이트
      setSettings((prevSettings) => ({
        ...prevSettings,
        infinite: 3 < newUserMatchings.length,
        slidesToShow: Math.min(3, newUserMatchings.length),
        slidesToScroll: Math.min(3, newUserMatchings.length),
      }));
    }
  }, [userMatchings]);

  return (
    <MypageMatchingWrapper>
      <Title>진행 중인 매칭</Title>
      {filteredMatchings && filteredMatchings.length ? (
        <UserMatchingArea>
          <UserMatchingList {...settings}>
            {filteredMatchings.map((matching) => {
              return (
                <UserMatchingItem
                  key={"matching" + matching.id}
                  matching={matching}
                />
              );
            })}
          </UserMatchingList>
        </UserMatchingArea>
      ) : (
        <UserMatchingArea>참여중인 매칭이 없습니다.</UserMatchingArea>
      )}
      <Hr />
      <Title>진행 종료된 매칭</Title>
      {filteredDoneMatchings != null ? (
        <UserDoneMatchingArea>
          <UserDoneMatchingList>
            {filteredDoneMatchings
              ? filteredDoneMatchings.map((d_matching) => {
                  /* 사용자 프로필 정보 불러오기 */
                  let userList = userProfiles.filter((u) => {
                    return d_matching.joining_users.includes(u.user_id);
                  });
                  return (
                    <UserDoneMatchingItem
                      key={"done_matching" + d_matching.id}
                      matching={d_matching}
                      users={userList}
                    />
                  );
                })
              : null}
          </UserDoneMatchingList>
        </UserDoneMatchingArea>
      ) : (
        <UserDoneMatchingArea>참여한 매칭이 없습니다.</UserDoneMatchingArea>
      )}
    </MypageMatchingWrapper>
  );
}
