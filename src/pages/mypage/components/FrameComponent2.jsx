import styled from "styled-components";

const FrameChild = styled.img`
  height: 120px;
  width: 120px;
  position: relative;
  border-radius: 50%;
  object-fit: cover;
  min-height: 120px;
  @media screen and (max-width: 725px) {
    flex: 1;
  }
`;
const H = styled.h3`
  margin: 0;
  position: relative;
  font-size: inherit;
  line-height: 29.33px;
  font-weight: 700;
  font-family: inherit;
  display: inline-block;
  min-width: 116px;
  white-space: nowrap;
  @media screen and (max-width: 450px) {
    font-size: var(--font-size-lgi);
  }
`;
const Div = styled.div`
  align-self: stretch;
  position: relative;
  font-size: var(--l-bold-size);
  white-space: nowrap;
  @media screen and (max-width: 450px) {
    font-size: var(--m-size);
  }
`;
const Parent1 = styled.div`
  width: 188px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: var(--gap-9xs);
`;
const B = styled.b`
  position: relative;
  line-height: 19.33px;
  display: inline-block;
  min-width: 59px;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: var(--padding-9xs) 0px 0px;
`;
const Div1 = styled.div`
  position: relative;
  font-size: var(--m-size);
  line-height: 19.33px;
  font-family: var(--l-bold);
  color: var(--main-blue);
  text-align: left;
  display: inline-block;
  min-width: 89px;
  white-space: nowrap;
`;
const SportTag = styled.button`
  cursor: pointer;
  border: 1px solid var(--main-blue);
  padding: var(--padding-11xs) var(--padding-6xs);
  background-color: var(--light-skyblue);
  border-radius: var(--br-3xs);
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  &:hover {
    background-color: var(--color-gainsboro-100);
    border: 1px solid var(--color-dodgerblue-100);
    box-sizing: border-box;
  }
`;
const Div2 = styled.div`
  position: relative;
  font-size: var(--m-size);
  line-height: 19.33px;
  font-family: var(--l-bold);
  color: var(--main-blue);
  text-align: left;
  display: inline-block;
  min-width: 32px;
`;
const SportTag1 = styled.button`
  cursor: pointer;
  border: 1px solid var(--main-blue);
  padding: var(--padding-11xs) var(--padding-7xs);
  background-color: var(--light-skyblue);
  width: 46px;
  border-radius: var(--br-3xs);
  box-sizing: border-box;
  overflow: hidden;
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  &:hover {
    background-color: var(--color-gainsboro-100);
    border: 1px solid var(--color-dodgerblue-100);
    box-sizing: border-box;
  }
`;
const Div3 = styled.div`
  position: relative;
  font-size: var(--m-size);
  line-height: 19.33px;
  font-family: var(--l-bold);
  color: var(--main-blue);
  text-align: left;
  display: inline-block;
  min-width: 59px;
`;
const SportTag2 = styled.button`
  cursor: pointer;
  border: 1px solid var(--main-blue);
  padding: var(--padding-11xs) var(--padding-6xs);
  background-color: var(--light-skyblue);
  width: 75px;
  border-radius: var(--br-3xs);
  box-sizing: border-box;
  overflow: hidden;
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  &:hover {
    background-color: var(--color-gainsboro-100);
    border: 1px solid var(--color-dodgerblue-100);
    box-sizing: border-box;
  }
`;
const SportTagParent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: var(--gap-5xs);
`;
const FrameContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: var(--gap-3xs);
  font-size: var(--m-size);
  color: var(--main-blue);
  @media screen and (max-width: 450px) {
    flex-wrap: wrap;
  }
`;
const FrameGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: var(--gap-17xl);
  min-width: 311px;
  @media screen and (max-width: 725px) {
    flex: 1;
  }
  @media screen and (max-width: 450px) {
    gap: var(--gap-lg);
  }
`;
const EllipseParent = styled.div`
  flex: 1;
  border-radius: var(--br-mini);
  border: 1px solid var(--main-blue);
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: var(--padding-sm) var(--padding-13xl);
  gap: var(--gap-base);
  min-width: 507px;
  max-width: 100%;
  @media screen and (max-width: 725px) {
    flex-wrap: wrap;
    min-width: 100%;
  }
`;
const FrameItem = styled.img`
  height: 20px;
  width: 19.7px;
  position: relative;
`;
const B1 = styled.b`
  position: relative;
  line-height: 19.33px;
  display: inline-block;
  min-width: 48px;
`;
const Div4 = styled.div`
  position: relative;
  display: inline-block;
  min-width: 36px;
`;
const FrameParent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: var(--gap-6xs-5);
`;
const PersonalprogramChild = styled.img`
  height: 20.1px;
  width: 20.1px;
  position: relative;
`;
const B2 = styled.b`
  flex: 1;
  position: relative;
  line-height: 19.33px;
  display: inline-block;
  min-width: 32px;
`;
const Div5 = styled.div`
  flex: 1;
  position: relative;
  display: inline-block;
  min-width: 36px;
`;
const Personalprogram = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: var(--gap-6xs);
`;
const PersonalprogramWrapper = styled.div`
  width: 104.1px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0px var(--padding-12xs);
  box-sizing: border-box;
`;
const FrameInner = styled.img`
  height: 20px;
  width: 20px;
  position: relative;
`;
const Div6 = styled.div`
  flex: 1;
  position: relative;
  display: inline-block;
  min-width: 26px;
`;
const FrameWrapper = styled.div`
  width: 104px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0px var(--padding-7xs);
  box-sizing: border-box;
`;
const FrameDiv = styled.div`
  width: 187.7px;
  border-radius: var(--br-mini);
  background-color: var(--light-sand);
  border: 1px solid var(--main-blue);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: var(--padding-9xl) var(--padding-12xl-7) var(--padding-7xl);
  gap: var(--gap-mini-1);
  font-size: var(--m-size);
`;
const FrameParent1 = styled.div`
  width: 1000px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  gap: var(--gap-13xl);
  max-width: 100%;
  @media screen and (max-width: 725px) {
    gap: var(--gap-base);
  }
`;
const MypageUpdateInnerRoot = styled.section`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  padding: 0px var(--padding-xl);
  box-sizing: border-box;
  max-width: 100%;
  text-align: left;
  font-size: var(--xl-bold-size);
  color: var(--black);
  font-family: var(--l-bold);
`;

const FrameComponent2 = () => {
  return (
    <MypageUpdateInnerRoot>
      <FrameParent1>
        <EllipseParent>
          <FrameChild loading="lazy" alt="" src="/ellipse-13@2x.png" />
          <FrameGroup>
            <Parent1>
              <H>괴도 김다현</H>
              <Div>수영에 미친 나 😁😁😁</Div>
            </Parent1>
            <FrameContainer>
              <Wrapper>
                <B>관심종목</B>
              </Wrapper>
              <SportTagParent>
                <SportTag>
                  <Div1>스쿠버다이빙</Div1>
                </SportTag>
                <SportTag1>
                  <Div2>서핑</Div2>
                </SportTag1>
                <SportTag2>
                  <Div3>스노쿨링</Div3>
                </SportTag2>
              </SportTagParent>
            </FrameContainer>
          </FrameGroup>
        </EllipseParent>
        <FrameDiv>
          <FrameParent>
            <FrameItem loading="lazy" alt="" src="/group-201.svg" />
            <B1>좋아요</B1>
            <Div4>00개</Div4>
          </FrameParent>
          <PersonalprogramWrapper>
            <Personalprogram>
              <PersonalprogramChild
                loading="lazy"
                alt=""
                src="/group-202.svg"
              />
              <B2>후기</B2>
              <Div5>00개</Div5>
            </Personalprogram>
          </PersonalprogramWrapper>
          <FrameWrapper>
            <Personalprogram>
              <FrameInner loading="lazy" alt="" src="/group-203.svg" />
              <B2>매칭</B2>
              <Div6>0개</Div6>
            </Personalprogram>
          </FrameWrapper>
        </FrameDiv>
      </FrameParent1>
    </MypageUpdateInnerRoot>
  );
};

export default FrameComponent2;
