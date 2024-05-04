import styled from "styled-components";
import SportTag from "../SportTag";

const ProfileImage = styled.img`
  height: 120px;
  width: 120px;
  border-radius: 50%;
  object-fit: cover;

  min-height: 120px;
  /* position: relative; */
  @media screen and (max-width: 768px) {
    height: 60px;
    /* width: 60px; */
  }
`;
const H = styled.h2`
  margin: 0;
  position: relative;
  font-size: var(--font-size-xl);
  line-height: 29.33px;
  font-weight: 700;
  font-family: inherit;
  display: inline-block;
  min-width: 116px;
  white-space: nowrap;
  @media screen and (max-width: 768px) {
    font-size: var(--font-size-l);
  }
`;
const Div = styled.div`
  align-self: stretch;
  position: relative;
  font-size: var(--font-size-l);
  white-space: nowrap;
  @media screen and (max-width: 768px) {
    font-size: var(--font-size-m);
  }
`;
const Introduce = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: var(--gap-9xs);
`;
const B = styled.b`
  position: relative;
  line-height: 20px;
  display: inline-block;
`;
const SportTagParent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: var(--gap-5xs);
  font-size: var(--font-size-m);
`;
const Interest = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: var(--gap-3xs);
  font-size: var(--font-size-l);
  color: var(--main-blue);
  @media screen and (max-width: 768px) {
    flex-wrap: wrap;
  }
`;
const IntroduceContents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: var(--gap-17xl);
  min-width: 311px;
  @media screen and (max-width: 768px) {
    flex: 1;
  }
  @media screen and (max-width: 768px) {
    gap: var(--gap-xl);
  }
`;
const IntroduceBox = styled.div`
  flex: 1;
  border-radius: var(--br-mini);
  border: 1px solid var(--color-blue-main);
  display: flex;
  padding: var(--padding-xs) var(--padding-13xl);
  gap: var(--gap-base);
  min-width: 400px;
  max-width: 100%;

  /* box-sizing: border-box;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start; */

  @media screen and (max-width: 768px) {
    flex-wrap: wrap;
    min-width: 100%;
  }
`;
const FrameItem = styled.img`
  height: 20px;
  width: 20px;
  position: relative;
`;
const B1 = styled.b`
  position: relative;
  line-height: 20px;
  display: inline-block;
  min-width: 48px;
`;
const Div1 = styled.div`
  position: relative;
  display: inline-block;
  min-width: 36px;
`;
const InfoItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: var(--gap-base);
`;
const InfoBox = styled.div`
  border-radius: var(--br-mini);
  background-color: var(--light-sand);
  border: 1px solid var(--main-blue);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: var(--padding-9xl) var(--padding-12xl-7) var(--padding-7xl);
  gap: var(--gap-base);
  font-size: var(--font-size-l);
`;
const ProfileBox = styled.div`
  width: 1000px;
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  gap: var(--gap-13xl);
  max-width: 100%;

  justify-content: flex-start;
  flex-direction: row;

  @media screen and (max-width: 768px) {
    gap: var(--gap-base);
  }
`;
const ProfileWrapper = styled.section`
  /* display: flex; */
  /* justify-content: center; */
  margin: 0 auto;
  font-size: var(--font-size-xl);
  color: var(--color-black);

  /* flex-direction: row;
  align-self: stretch;
  align-items: flex-start;
  box-sizing: border-box;
  max-width: 100%;
  text-align: left;
  font-family: inherit; */
`;

const Profile = () => {
  return (
    <>
      <ProfileWrapper>
        <ProfileBox>
          <IntroduceBox>
            <ProfileImage loading="lazy" alt="" src="/img/ellipse-13@2x.png" />
            <IntroduceContents>
              <Introduce>
                <H>괴도 김다현</H>
                <Div>수영에 미친 나 😁😁😁</Div>
              </Introduce>
              <Interest>
                <B>관심종목</B>
                <SportTagParent>
                  <SportTag prop={"스쿠버다이빙"} />
                  <SportTag prop={"서핑"} />
                  <SportTag prop={"스노쿨링"} />
                </SportTagParent>
              </Interest>
            </IntroduceContents>
          </IntroduceBox>
          <InfoBox>
            <InfoItem>
              <FrameItem loading="lazy" alt="like" src="/icon/like.svg" />
              <B1>좋아요</B1>
              <Div1>00개</Div1>
            </InfoItem>
            <InfoItem>
              <FrameItem loading="lazy" alt="review" src="/icon/edit.svg" />
              <B1>후기</B1>
              <Div1>00개</Div1>
            </InfoItem>
            <InfoItem>
              <FrameItem loading="lazy" alt="matching" src="/icon/smile.svg" />
              <B1>매칭</B1>
              <Div1>00개</Div1>
            </InfoItem>
          </InfoBox>
        </ProfileBox>
      </ProfileWrapper>
    </>
  );
};

export default Profile;
