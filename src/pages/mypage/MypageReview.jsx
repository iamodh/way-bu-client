import styled from "styled-components";
import UserProgramItem from "./components/UserProgramItem";
import UserReviewItem from "./components/UserReviewItem";
import { useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { loggedInUserState, loggedInUserProfileState } from "../../atom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MypageReviewWrapper = styled.form`
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
const UserProgramArea = styled.div`
  min-height: 100px;
  display: flex;
  position: relative;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  width: 100%;
`;
const UserProgramList = styled(Slider)`
  width: 80%;
  display: flex;
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
const UserReviewArea = styled(UserProgramArea)`
  width: 90%;
  flex-direction: column;
  margin-bottom: var(--padding-base);
`;
const UserReviewList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: var(--padding-5xs);
  margin-bottom: var(--padding-xs);
`;
const Hr = styled.div`
  width: 100%;
  height: 0.5px;
  background-color: var(--color-gray);
  margin-top: 20px;
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

const Test = styled.div`
  width: 100%;
  background-color: skyblue;
`;

export default function MypageReview() {
  /* 회원 정보 불러오기 */
  const [loggedInUser, setLoggedInUser] = useRecoilState(loggedInUserState);
  const [loggedInUserProfile, setLoggedInUserProfile] = useRecoilState(
    loggedInUserProfileState
  );

  /* 필요한 데이터 불러오기 */
  const { userPrograms, userReviews } = useOutletContext();
  const [filteredReviews, setFilteredReviews] = useState(userReviews);

  /* 사용자가 작성한 리뷰만 필터링하기 */
  useEffect(() => {
    let newUserReviews = userReviews.filter(
      (r) => loggedInUserProfile.id === r.writter
    );
    setFilteredReviews(newUserReviews);
  }, [userReviews]);

  /* Slider 커스텀 */
  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 3,
    // 이때 SlickButtonFix로 화살표 이미지를 감싸지 않으면 경고가 발생
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
  };

  return (
    <MypageReviewWrapper>
      <Title>후기 작성</Title>
      {userPrograms ? (
        <UserProgramArea>
          <UserProgramList {...settings}>
            {userPrograms.map((program) => {
              return (
                <UserProgramItem
                  key={"program" + program.id}
                  program={program}
                />
              );
            })}
          </UserProgramList>
        </UserProgramArea>
      ) : (
        <UserProgramArea>
          "후기를 작성할 수 있는 프로그램 목록이 없습니다."
        </UserProgramArea>
      )}
      <Hr />
      <Title>내가 작성한 후기</Title>
      {/* <UserReviewArea>
        <UserReviewList>
          {filteredReviews.map((review) => {
            return (
              <UserReviewItem key={"program" + review.id} review={review} />
            );
          })}
        </UserReviewList>
        <PageIndex>
          <Page>1</Page>
          <Page>2</Page>
          <Page>3</Page>
          <Page>4</Page>
        </PageIndex>
      </UserReviewArea> */}
    </MypageReviewWrapper>
  );
}
