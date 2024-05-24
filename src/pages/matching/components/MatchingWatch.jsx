import styled from "styled-components";

const FrameWrapperRoot = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  max-width: 100%;
  height: 100%;
  gap: var(--gap-base);
  margin: auto;
`;

const Div = styled.div`
  width: 274px;
  position: relative;
  font-size: var(--m-size);
  font-family: var(--l-bold);
  color: var(--gray);
  text-align: center;
  display: inline-block;
  font-weight: bold;
`;

const Title = styled.div`
  margin: 10px;
  box-sizing: border-box;
  max-width: 100%;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  height: 50px;
  width: 95%;
  line-height: 50px;
  text-align: center;
`;

const FrameGroup = styled.nav`
  margin: 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: var(--gap-9xs);
  white-space: nowrap;
  margin-bottom: 10px;
  @media screen and (max-width: 750px) {
    flex-wrap: wrap;
  }
`;

const Schedulebox = styled.div`
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.1);
  height: 45px;
  flex: 1;
  border-radius: var(--br-8xs);
  box-sizing: border-box;
  overflow: hidden;
  min-width: 374px;
  max-width: 100%;
  @media screen and (max-width: 675px) {
    min-width: 100%;
  }
`;

const FrameDiv = styled.div`
  width: 767px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: var(--gap-3xs);
  box-sizing: border-box;
  max-width: 100%;
  padding: 5px 10px;
`;
const FrameParent1 = styled.div`
  margin-top: 10px;
  margin-bottom: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  height: 200px;
`;
const Divbox = styled.div`
  padding: 10px;
  border: none;
  border-radius: 5px;
  text-align: center;
  font-weight: bold;
  height: 20px;
  line-height: 20px;
  background-color: var(--color-blue-vivid);
  width: 70px;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.1);
`
const Textbox = styled.div`
  height: 256px;
  width: 100%;
  box-sizing: border-box;
  font-size: var(--font-size-xs);
  background-color: aliceblue;
  border-radius: 15px;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.1);
`;

const Textbox1 = styled.textarea`
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 100px;
  border-radius: 5px;
  border: none;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  text-align: left;
  font-size: var(--font-size-m);
  color: var(--color-navy);
  padding: 10px;
  resize: none;
  outline: none;
  @media screen and (max-width: 750px) {
    padding-left: var(--padding-13xl);
    padding-right: var(--padding-12xl);
    box-sizing: border-box;
  }
`;

const Button = styled.button`
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
  margin: 0;
  margin-top: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  gap: var(--gap-base);
  @media screen and (max-width: 675px) {
    gap: var(--gap-mini);
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
const Divbox1 = styled.div`
  padding: 10px;
  border: none;
  border-radius: 5px;
  text-align: center;
  font-weight: bold;
  height: 20px;
  line-height: 20px;

  width: 70px;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.1);
`

const MatchingWatch = () => {
  return (
    <FrameWrapperRoot>
      <FrameParent1>
        <Title>
            <Div>안녕하세요안옇</Div>
        </Title>
        <FrameGroup>
          <Divbox1>#종목</Divbox1>
          <Divbox1>#난이도</Divbox1>
          <Divbox1>#위치</Divbox1>
        {/* <SportTagWrapper>
          <SportTag>
            <B2>광안리</B2>
          </SportTag>
        </SportTagWrapper> */}
        </FrameGroup>
        <FrameGroup>
          <FrameDiv>
            <Divbox>참가인원</Divbox>
            <Divbox1>3</Divbox1>
          </FrameDiv>
          <FrameDiv>
            <Divbox>모집상태</Divbox>
            <Divbox1>모집중</Divbox1>
          </FrameDiv>
        </FrameGroup>
        <FrameDiv>
          <Divbox>일정</Divbox>
          <Schedulebox />
        </FrameDiv>
      </FrameParent1>
      <DivRoot>
        <Textbox />
        <Textbox1 placeholder="신청 메세지를 입력해주세요."></Textbox1>
      </DivRoot>
      <Button>
        <Div2>신청하기</Div2>
      </Button>
    </FrameWrapperRoot>
  );
};

export default MatchingWatch;
