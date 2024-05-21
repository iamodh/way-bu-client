import styled from "styled-components";
import { useState, useEffect } from "react";
import { client } from "../../../libs/supabase";
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
  margin: var(--padding-base) auto;
  flex-direction: row;
  font-family: inherit;
`;
const ProfileBox = styled.div`
  /* background-color: var(--color-sand-main); */
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: var(--gap-base);
  @media screen and (max-width: 768px) {
    flex-direction: column;
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
  background-color: var(--color-skyblue-background);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: var(--padding-9xl) var(--padding-12xl-7) var(--padding-7xl);
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
  const user_id = 1;
  const [userProfile, setUserProfile] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUserProfile();
    console.log(userProfile);
  }, []);

  async function getUserProfile() {
    const { data, error } = await client
      .from("USER_PROFILE")
      .select(`*, SPORT(title, theme_color)`)
      .eq("id", user_id)
      .single();
    setUserProfile(data);
    setIsLoading(false);
    if (error) {
      console.log(error.message);
      return;
    }
  }

  return (
    <ProfileWrapper>
      {isLoading ? (
        "Loading..."
      ) : (
        <ProfileBox>
          <IntroduceBox>
            <ProfileImage
              loading="lazy"
              alt=""
              src={`/img/${userProfile.avatar_url}`}
            />
            <IntroduceContents>
              <Introduce>
                <H>{userProfile.user_nickname}</H>
                <Div>{userProfile.bio}</Div>
              </Introduce>
              <Interest>
                <B>관심종목</B>
                <SportTagParent>
                  <SportsTag sport={userProfile.SPORT} />
                </SportTagParent>
              </Interest>
            </IntroduceContents>
          </IntroduceBox>
          <CountBox>
            <CountItem>
              <FrameItem loading="lazy" alt="like" src="/icon/like.svg" />
              <B1>좋아요</B1>
              <Div>{userProfile.countLikes}개</Div>
            </CountItem>
            <CountItem>
              <FrameItem loading="lazy" alt="review" src="/icon/edit.svg" />
              <B1>후기</B1>
              <Div>{userProfile.countReviews}개</Div>
            </CountItem>
            <CountItem>
              <FrameItem loading="lazy" alt="matching" src="/icon/smile.svg" />
              <B1>매칭</B1>
              <Div>{userProfile.countMatches}개</Div>
            </CountItem>
          </CountBox>
        </ProfileBox>
      )}
    </ProfileWrapper>
  );
}
