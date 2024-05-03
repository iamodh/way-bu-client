import Sign from "../components/Sign";
import Header from "../components/Header";
import styled from "styled-components";
import FrameComponent2 from "../components/FrameComponent2";
import FrameComponent from "../components/FrameComponent";
import InputSignup from "../components/InputSignup";
import ConfirmSignup from "../components/ConfirmSignup";
import Property1Default5 from "../components/Property1Default5";

const Menubar1 = styled.header`
  align-self: stretch;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.1);
  background-color: var(--white);
  border: 1px solid var(--background-skyblue);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  max-width: 100%;
`;
const H = styled.h3`
  margin: 0;
  flex: 1;
  position: relative;
  font-size: var(--xl-bold-size);
  line-height: 29.33px;
  font-weight: 700;
  font-family: var(--l-bold);
  color: var(--black);
  text-align: center;
  white-space: nowrap;
  @media screen and (max-width: 450px) {
    font-size: var(--font-size-lgi);
  }
`;
const Wrapper = styled.div`
  width: 183px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
`;
const ContentsInner = styled.div`
  width: 506px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  padding: 0px var(--padding-xl);
  box-sizing: border-box;
  max-width: 100%;
`;
const InputSignupParent = styled.div`
  width: 506px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: var(--gap-base);
  max-width: 100%;
`;
const Contents = styled.form`
  margin: 0;
  width: 1000px;
  overflow: hidden;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: var(--padding-45xl) var(--padding-xl);
  box-sizing: border-box;
  gap: var(--gap-21xl);
  max-width: 100%;
  @media screen and (max-width: 725px) {
    gap: var(--gap-xl);
    padding-top: var(--padding-23xl);
    padding-bottom: var(--padding-23xl);
    box-sizing: border-box;
  }
`;
const ContentsWrapper = styled.footer`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  max-width: 100%;
`;
const MypageUpdateRoot = styled.div`
  width: 100%;
  position: relative;
  background-color: var(--white);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0px 0px var(--padding-45xl);
  box-sizing: border-box;
  gap: var(--gap-13xl);
  line-height: normal;
  letter-spacing: normal;
  @media screen and (max-width: 975px) {
    gap: var(--gap-base);
  }
`;

const MypageUpdate = () => {
  return (
    <MypageUpdateRoot>
      <Menubar1>
        <Sign />
        <Header />
      </Menubar1>
      <FrameComponent2 />
      <FrameComponent />
      <ContentsWrapper>
        <Contents>
          <ContentsInner>
            <Wrapper>
              <H>{`개인정보 수정하기 `}</H>
            </Wrapper>
          </ContentsInner>
          <InputSignupParent>
            <InputSignup pw="이름 " />
            <InputSignup pw="생년월일" />
            <InputSignup pw="이메일" />
            <InputSignup pw="비밀번호 변경" />
            <ConfirmSignup />
          </InputSignupParent>
          <ContentsInner>
            <Property1Default5
              prop="저장하기"
              property1DefaultWidth="unset"
              property1DefaultPadding="var(--padding-base) 76.5px"
              property1DefaultBorder="none"
              bFontSize="22px"
              bLineHeight="unset"
              bDisplay="inline-block"
              bMinWidth="81px"
              property1DefaultPosition="unset"
              property1DefaultTop="unset"
              property1DefaultLeft="unset"
            />
          </ContentsInner>
        </Contents>
      </ContentsWrapper>
    </MypageUpdateRoot>
  );
};

export default MypageUpdate;
