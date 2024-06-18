import styled from "styled-components";
import { useRecoilState } from "recoil";
import { loggedInUserState, loggedInUserProfileState } from "../../atom";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SportsTag from "../SportTag";

const H = styled.h2`
  margin: 0;
  font-size: var(--font-size-l);
  font-weight: 700;
  /* white-space: nowrap; */
  @media screen and (max-width: 768px) {
    font-size: var(--font-size-m);
  }
`;
const Div = styled.div`
  align-self: center;
  flex-wrap: wrap;
  @media screen and (max-width: 768px) {
    font-size: var(--font-size-s);
  }
`;
const B = styled.span`
  font-size: var(--font-size-m);
  position: relative;
  display: inline-block;
  font-weight: 700;
  @media screen and (max-width: 768px) {
    font-size: var(--font-size-s);
  }
`;
const ProfileWrapper = styled.section`
  display: flex;
  width: 90%;
  max-width: 1000px;
  margin: var(--padding-base) auto 0;
  flex-direction: row;
  font-family: inherit;
`;
const ProfileBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: var(--gap-base);
  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: var(--gap-3xs);
  }
`;
const IntroduceBox = styled.div`
  flex: 1;
  border-radius: var(--br-mini);
  border: 1px solid var(--color-blue-main);
  display: flex;
  padding: var(--padding-xs) var(--padding-13xl);
  gap: var(--gap-base);
  @media screen and (max-width: 768px) {
    flex-wrap: wrap;
  }
`;
const ProfileImage = styled.img`
  height: 100px;
  width: 100px;
  border-radius: 50%;
  object-fit: cover;
  @media screen and (max-width: 768px) {
    height: 60px;
    width: 60px;
  }
`;
const IntroduceContents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: var(--gap-base);
  @media screen and (max-width: 768px) {
    flex: 1;
    gap: var(--gap-5xs);
    flex-wrap: wrap;
  }
`;
const Introduce = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: var(--gap-9xs);
  flex-wrap: wrap;
`;
const Interest = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: var(--gap-3xs);
  color: var(--main-blue);
`;
const SportTagParent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: var(--gap-9xs);
`;
const CountBox = styled.div`
  border-radius: var(--br-mini);
  border: 1px solid var(--color-blue-main);
  background-color: var(--color-sand-light);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--padding-base);
  gap: var(--gap-base);
  @media screen and (max-width: 768px) {
    padding: var(--padding-5xs) var(--padding-base);
    flex-direction: row;
    font-size: var(--font-size-s);
    justify-content: space-around;
    flex-wrap: wrap;
    border-radius: var(--br-3xs);
  }
`;
const CountItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: var(--gap-base);
  @media screen and (max-width: 768px) {
    gap: var(--gap-9xs);
  }
`;
const FrameItem = styled.img`
  height: 20px;
  width: 20px;
  position: relative;
`;
const B1 = styled(B)`
  min-width: 48px;
  @media screen and (max-width: 768px) {
    min-width: 32px;
  }
`;

export default function MypageProfile() {
  const navigate = useNavigate();
  const { id: url_id } = useParams();
  /* 회원 정보 불러오기 */
  const [loggedInUser, setLoggedInUser] = useRecoilState(loggedInUserState);
  const [loggedInUserProfile, setLoggedInUserProfile] = useRecoilState(
    loggedInUserProfileState
  );

  useEffect(() => {
    if (
      !loggedInUser ||
      !loggedInUserProfile ||
      loggedInUserProfile.id != url_id
    ) {
      navigate("/login");
    }
  }, []);

  // console.log("user", loggedInUserProfile);
  return (
    loggedInUser && (
      <ProfileWrapper>
        <ProfileBox>
          <IntroduceBox>
            <ProfileImage
              loading="lazy"
              alt=""
              src={`${loggedInUserProfile.avatar_url}`}
            />
            <IntroduceContents>
              <Introduce>
                <H>{loggedInUserProfile.user_nickname}</H>
                <Div>{loggedInUserProfile.bio}</Div>
              </Introduce>
              <Interest>
                <B>관심종목</B>
                <SportTagParent>
                  {loggedInUserProfile.SPORT ? (
                    <SportsTag sport={loggedInUserProfile.SPORT} />
                  ) : null}
                </SportTagParent>
              </Interest>
            </IntroduceContents>
          </IntroduceBox>
          <CountBox>
            <CountItem>
              <FrameItem loading="lazy" alt="like" src="/icon/like.svg" />
              <B1>좋아요</B1>
              <Div>{loggedInUserProfile.countLikes}개</Div>
            </CountItem>
            <CountItem>
              <FrameItem loading="lazy" alt="review" src="/icon/edit.svg" />
              <B1>후기</B1>
              <Div>{loggedInUserProfile.countReviews}개</Div>
            </CountItem>
            <CountItem>
              <FrameItem loading="lazy" alt="matching" src="/icon/smile.svg" />
              <B1>매칭</B1>
              <Div>{loggedInUserProfile.countMatches}개</Div>
            </CountItem>
          </CountBox>
        </ProfileBox>
      </ProfileWrapper>
    )
  );
}
