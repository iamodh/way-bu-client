import styled from "styled-components";

const FrameWrapperRoot = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0px var(--padding-6xl) 0px var(--padding-mid);
  box-sizing: border-box;
  max-width: 100%;
`;

const Div = styled.div`
  width: 274px;
  position: relative;
  font-size: var(--m-size);
  font-family: var(--l-bold);
  color: var(--gray);
  text-align: center;
  display: inline-block;
  flex-shrink: 0;
`;

const Title = styled.div`
  margin: 10px;
  box-sizing: border-box;
  max-width: 100%;
  border: 1px solid black;
  height: 50px;
  width: 95%;
  line-height: 50px;
`;
const B = styled.b`
  position: relative;
  font-size: var(--xl-bold-size);
  line-height: 29.33px;
  display: inline-block;
  font-family: var(--l-bold);
  color: var(--black);
  text-align: center;
  min-width: 48px;
  @media screen and (max-width: 450px) {
    font-size: var(--font-size-lgi);
  }
`;
const Wrapper = styled.button`
  cursor: pointer;
  border: 3px solid var(--main-blue);
  padding: var(--padding-5xs) var(--padding-23xl) var(--padding-5xs)
    var(--padding-27xl);
  background-color: black;
  align-self: stretch;
  border-radius: var(--br-mini);
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  &:hover {
    background-color: var(--color-dodgerblue-200);
    border: 3px solid var(--color-dodgerblue-100);
    box-sizing: border-box;
  }
`;
const FrameContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: var(--padding-10xs) 0px 0px;
  box-sizing: border-box;
  min-width: 139px;
  max-width: 142px;
`;
const B1 = styled.b`
  position: relative;
  font-size: var(--xl-bold-size);
  line-height: 29.33px;
  display: inline-block;
  font-family: var(--l-bold);
  color: var(--black);
  text-align: center;
  min-width: 67px;
  @media screen and (max-width: 450px) {
    font-size: var(--font-size-lgi);
  }
`;
const Container = styled.button`
  cursor: pointer;
  border: 3px solid var(--main-blue);
  padding: var(--padding-5xs) var(--padding-13xl) var(--padding-5xs)
    var(--padding-18xl);
  background-color: transparent;
  flex: 0.4718;
  border-radius: var(--br-mini);
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  min-width: 139px;
  max-width: 142px;
  &:hover {
    background-color: var(--color-dodgerblue-200);
    border: 3px solid var(--color-dodgerblue-100);
    box-sizing: border-box;
  }
  @media screen and (max-width: 450px) {
    flex: 1;
  }
`;
const B2 = styled.b`
  position: relative;
  font-size: var(--l-bold-size);
  display: inline-block;
  font-family: var(--l-bold);
  color: var(--gray);
  text-align: left;
  min-width: 60px;
  @media screen and (max-width: 450px) {
    font-size: var(--m-size);
  }
`;
const SportTag = styled.button`
  cursor: pointer;
  border: 1px solid var(--gray);
  padding: var(--padding-3xs) var(--padding-18xl);
  background-color: transparent;
  border-radius: var(--br-3xs);
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  &:hover {
    background-color: var(--color-gray-200);
    border: 1px solid var(--color-gray-100);
    box-sizing: border-box;
  }
`;
const SportTagWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: var(--padding-10xs) 0px 0px;
  box-sizing: border-box;
  min-width: 133px;
  max-width: 136px;
`;
const B3 = styled.b`
  width: 48px;
  position: relative;
  font-size: var(--xl-bold-size);
  line-height: 29.33px;
  display: inline-block;
  font-family: var(--l-bold);
  color: var(--black);
  text-align: center;
  @media screen and (max-width: 450px) {
    font-size: var(--font-size-lgi);
  }
`;
const Frame = styled.button`
  cursor: pointer;
  border: 3px solid var(--main-blue);
  padding: var(--padding-5xs) var(--padding-23xl) var(--padding-5xs)
    var(--padding-27xl);
  background-color: transparent;
  flex: 0.338;
  border-radius: var(--br-mini);
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  min-width: 139px;
  max-width: 142px;
  &:hover {
    background-color: var(--color-dodgerblue-200);
    border: 3px solid var(--color-dodgerblue-100);
    box-sizing: border-box;
  }
  @media screen and (max-width: 450px) {
    flex: 1;
  }
`;
const B4 = styled.b`
  position: relative;
  font-size: var(--xl-bold-size);
  line-height: 29.33px;
  display: inline-block;
  font-family: var(--l-bold);
  color: var(--black);
  text-align: center;
  min-width: 89px;
  white-space: nowrap;
  @media screen and (max-width: 450px) {
    font-size: var(--font-size-lgi);
  }
`;
const FrameButton = styled.button`
  cursor: pointer;
  border: 3px solid var(--main-blue);
  padding: var(--padding-5xs) var(--padding-2xl) var(--padding-5xs)
    var(--padding-7xl);
  background-color: transparent;
  flex: 0.6268;
  border-radius: var(--br-mini);
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  min-width: 139px;
  max-width: 142px;
  &:hover {
    background-color: var(--color-dodgerblue-200);
    border: 3px solid var(--color-dodgerblue-100);
    box-sizing: border-box;
  }
  @media screen and (max-width: 450px) {
    flex: 1;
  }
`;
const FrameGroup = styled.nav`
  margin: 0;
  align-self: stretch;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  gap: var(--gap-xl);
  white-space: nowrap;
  @media screen and (max-width: 750px) {
    flex-wrap: wrap;
  }
`;
const Wrapper1 = styled.button`
  cursor: pointer;
  border: 3px solid var(--main-blue);
  padding: var(--padding-5xs) var(--padding-23xl) var(--padding-5xs)
    var(--padding-27xl);
  background-color: transparent;
  width: 142px;
  border-radius: var(--br-mini);
  box-sizing: border-box;
  overflow: hidden;
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  &:hover {
    background-color: var(--color-dodgerblue-200);
    border: 3px solid var(--color-dodgerblue-100);
    box-sizing: border-box;
  }
`;
const FrameChild = styled.div`
  height: 54px;
  flex: 1;
  border-radius: var(--br-8xs);
  border: 1px solid var(--color-darkgray-200);
  box-sizing: border-box;
  overflow: hidden;
  min-width: 374px;
  max-width: 100%;
  @media screen and (max-width: 675px) {
    min-width: 100%;
  }
`;
const FrameParent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: center;
  gap: var(--gap-9xl);
  max-width: 100%;
`;
const FrameDiv = styled.div`
  width: 767px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0px var(--padding-2xs);
  box-sizing: border-box;
  max-width: 100%;
`;
const FrameParent1 = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: var(--gap-6xl);
  max-width: 100%;
`;
const Textbox = styled.textarea`
  border: 1px solid var(--color-darkgray-100);
  background-color: transparent;
  height: 256px;
  width: 784px;
  outline: none;
  border-radius: var(--br-6xl);
  box-sizing: border-box;
  overflow: hidden;
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 116px var(--padding-45xl);
  font-family: var(--l-bold);
  font-size: var(--l-bold-size);
  color: var(--color-darkgray-100);
  max-width: 100%;
`;
// const FrameParent = styled.section`
//   align-self: stretch;
//   display: flex;
//   flex-direction: column;
//   align-items: flex-start;
//   justify-content: flex-start;
//   gap: var(--gap-6xl);
//   max-width: 100%;
//   text-align: left;
//   font-size: var(--font-size-11xl);
//   color: var(--black);
//   font-family: var(--l-bold);
// `;
// const Div = styled.div`
//   flex: 1;
//   position: relative;
//   display: inline-block;
//   max-width: 100%;
//   @media screen and (max-width: 450px) {
//     font-size: var(--m-size);
//   }
// `;
const Textbox1 = styled.textarea`
  width: 784px;
  border-radius: var(--br-6xl);
  border: 1px solid var(--color-darkgray-100);
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: var(--padding-56xl) 63px var(--padding-56xl) var(--padding-45xl);
  max-width: 100%;
  text-align: left;
  font-size: var(--l-bold-size);
  color: var(--color-darkgray-100);
  font-family: var(--l-bold);
  @media screen and (max-width: 750px) {
    padding-left: var(--padding-13xl);
    padding-right: var(--padding-12xl);
    box-sizing: border-box;
  }
`;
const Div1 = styled.div`
  position: relative;
  font-size: var(--font-size-6xl);
  font-weight: 500;
  font-family: var(--l-bold);
  color: var(--white);
  text-align: center;
  display: inline-block;
  min-width: 92px;
  white-space: nowrap;
  @media screen and (max-width: 450px) {
    font-size: var(--l-bold-size);
  }
`;
const Button = styled.button`
  cursor: pointer;
  border: none;
  min-width: 150px;
  padding: var(--padding-base) var(--padding-base);
  background-color: var(--color-blue-main);
  color: var(--color-white);
  border-radius: var(--br-3xs);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: var(--color-navy);
    box-sizing: border-box;
  }
`;
const DivRoot = styled.div`
  width: 100%;
  position: relative;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: var(--br-11xl);
  background-color: var(--white);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: var(--padding-15xl) var(--padding-27xl) var(--padding-13xl) 72px;
  box-sizing: border-box;
  gap: 30.5px;
  line-height: normal;
  letter-spacing: normal;
  @media screen and (max-width: 675px) {
    gap: var(--gap-mini);
    padding-left: 36px;
    padding-right: var(--padding-4xl);
    box-sizing: border-box;
  }
`;
const Div2 = styled.div`
  position: relative;
  font-size: var(--font-size-m);
  color: inherit;
  text-align: center;
  display: inline-block;
  white-space: nowrap;
`;
const MatchingWatch = () => {
  return (
    <FrameWrapperRoot>
      <FrameParent1>
        <Title>
            <Div>제목을 입력해주세요.</Div>
        </Title>
        <FrameGroup>
          <FrameContainer>
            <Wrapper>
              <B>종목</B>
            </Wrapper>
          </FrameContainer>
          <Container>
            <B1>난이도</B1>
          </Container>
          <SportTagWrapper>
            <SportTag>
              <B2>광안리</B2>
            </SportTag>
          </SportTagWrapper>
          <Frame>
            <B3>인원</B3>
          </Frame>
          <FrameButton>
            <B4>모집상태</B4>
          </FrameButton>
        </FrameGroup>
        <FrameDiv>
          <FrameParent>
            <Wrapper1>
              <B3>일정</B3>
            </Wrapper1>
            <FrameChild />
          </FrameParent>
        </FrameDiv>
      </FrameParent1>
      <DivRoot>
        <FrameParent>
          <Textbox placeholder="상세내용을 입력해주세요." rows={13} cols={39} />
        </FrameParent>
        <Textbox1>
          <Div>신청 메세지를 입력해주세요.</Div>
        </Textbox1>
      </DivRoot>
      <Button>
        <Div2>신청하기</Div2>
      </Button>
    </FrameWrapperRoot>
  );
};

export default MatchingWatch;
