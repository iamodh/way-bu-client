import styled from "styled-components";
import FrameComponent1 from "./FrameComponent1";

const UserIcon = styled.img`
  height: 48px;
  width: 48px;
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
`;
const UserWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0px var(--padding-2xs) 0px var(--padding-7xs-5);
`;
const Div = styled.div`
  position: relative;
  font-size: var(--m-size);
  line-height: 19.33px;
  font-family: var(--l-bold);
  color: var(--black);
  text-align: left;
  display: inline-block;
  min-width: 59px;
`;
const FrameParent = styled.button`
  cursor: pointer;
  border: none;
  padding: var(--padding-2xs-5) var(--padding-smi) var(--padding-2xs-5)
    var(--padding-lg-5);
  background-color: var(--light-sand);
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: var(--br-xl);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: var(--gap-5xs);
`;
const VectorIcon = styled.img`
  height: 48px;
  width: 48px;
  position: relative;
`;
const VectorWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0px var(--padding-3xl) 0px var(--padding-base-5);
`;
const Div1 = styled.div`
  position: relative;
  font-size: var(--m-size);
  line-height: 19.33px;
  font-family: var(--l-bold);
  color: var(--black);
  text-align: left;
  display: inline-block;
  min-width: 79px;
  white-space: nowrap;
`;
const FrameGroup = styled.button`
  cursor: pointer;
  border: none;
  padding: var(--padding-2xs-5) var(--padding-11xs) var(--padding-2xs-5)
    var(--padding-4xs-5);
  background-color: var(--background-skyblue);
  border-radius: var(--br-xl);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: var(--gap-5xs);
`;
const FrameContainer = styled.button`
  cursor: pointer;
  border: none;
  padding: var(--padding-2xs-5) var(--padding-smi) var(--padding-2xs-5)
    var(--padding-lg-5);
  background-color: var(--background-skyblue);
  border-radius: var(--br-xl);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: var(--gap-5xs);
`;
const UserPlusIcon = styled.img`
  width: 48px;
  height: 48px;
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
`;
const Div2 = styled.div`
  flex: 1;
  position: relative;
  font-size: var(--m-size);
  line-height: 19.33px;
  font-family: var(--l-bold);
  color: var(--black);
  text-align: left;
`;
const Wrapper = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0px var(--padding-11xs) 0px var(--padding-11xs-5);
`;
const UserPlusParent = styled.button`
  cursor: pointer;
  border: none;
  padding: var(--padding-2xs-5) var(--padding-3xl);
  background-color: var(--background-skyblue);
  flex: 1;
  border-radius: var(--br-xl);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  box-sizing: border-box;
  gap: var(--gap-5xs);
  min-width: 62px;
`;
const Div3 = styled.div`
  position: relative;
  font-size: var(--m-size);
  line-height: 19.33px;
  font-family: var(--l-bold);
  color: var(--black);
  text-align: left;
  display: inline-block;
  min-width: 48px;
`;
const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0px var(--padding-11xs) 0px var(--padding-11xs-5);
`;
const MessageCircleParent = styled.button`
  cursor: pointer;
  border: none;
  padding: var(--padding-2xs-5) var(--padding-3xl);
  background-color: var(--background-skyblue);
  border-radius: var(--br-xl);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: var(--gap-5xs);
`;
const Div4 = styled.div`
  position: relative;
  font-size: var(--m-size);
  line-height: 19.33px;
  font-family: var(--l-bold);
  color: var(--black);
  text-align: left;
  display: inline-block;
  min-width: 32px;
`;
const Frame = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0px var(--padding-4xs) 0px var(--padding-6xs);
`;
const SettingParent = styled.button`
  cursor: pointer;
  border: none;
  padding: var(--padding-2xs-5) var(--padding-5xl);
  background-color: var(--background-skyblue);
  border-radius: var(--br-xl);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: var(--gap-5xs);
`;
const Index1 = styled.div`
  width: 1000px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
  padding: 0px var(--padding-41xl);
  box-sizing: border-box;
  gap: var(--gap-base);
  max-width: 100%;
  @media screen and (max-width: 1000px) {
    padding-left: var(--padding-11xl);
    padding-right: var(--padding-11xl);
    box-sizing: border-box;
  }
`;
const IndexWrapperRoot = styled.section`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  max-width: 100%;
  text-align: left;
  font-size: var(--m-size);
  color: var(--black);
  font-family: var(--l-bold);
`;

const FrameComponent = () => {
  return (
    <IndexWrapperRoot>
      <Index1>
        <FrameParent>
          <UserWrapper>
            <UserIcon alt="" src="/user2.svg" />
          </UserWrapper>
          <Div>개인정보</Div>
        </FrameParent>
        <FrameGroup>
          <VectorWrapper>
            <VectorIcon alt="" src="/vector.svg" />
          </VectorWrapper>
          <Div1>내 프로그램</Div1>
        </FrameGroup>
        <FrameComponent1 edit="/edit.svg" prop="후기" />
        <FrameContainer>
          <UserWrapper>
            <UserIcon alt="" src="/frame-300.svg" />
          </UserWrapper>
          <Div>커뮤니티</Div>
        </FrameContainer>
        <FrameComponent1 edit="/smile.svg" prop="매칭" />
        <UserPlusParent>
          <UserPlusIcon alt="" src="/userplus.svg" />
          <Wrapper>
            <Div2>팔로잉</Div2>
          </Wrapper>
        </UserPlusParent>
        <MessageCircleParent>
          <UserPlusIcon alt="" src="/messagecircle.svg" />
          <Container>
            <Div3>웨이톡</Div3>
          </Container>
        </MessageCircleParent>
        <SettingParent>
          <UserPlusIcon alt="" src="/setting.svg" />
          <Frame>
            <Div4>설정</Div4>
          </Frame>
        </SettingParent>
      </Index1>
    </IndexWrapperRoot>
  );
};

export default FrameComponent;
