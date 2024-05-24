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
`;

const Title = styled.div`
  margin: 10px;
  box-sizing: border-box;
  max-width: 100%;
  border: 1px solid var(--color-blue-main);
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
  justify-content: space-around;
  gap: var(--gap-xl);
  white-space: nowrap;
  margin-bottom: 10px;
  @media screen and (max-width: 750px) {
    flex-wrap: wrap;
  }
`;

const Schedulebox = styled.div`
  height: 54px;
  flex: 1;
  border-radius: var(--br-8xs);
  border: 1px solid var(--color-blue-main);
  box-sizing: border-box;
  overflow: hidden;
  min-width: 374px;
  max-width: 100%;
  background-color: aliceblue;
  @media screen and (max-width: 675px) {
    min-width: 100%;
  }
`;

const FrameDiv = styled.div`
  width: 767px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: var(--gap-3xs);
  box-sizing: border-box;
  max-width: 100%;
  padding: 5px 10px;
`;
const FrameParent1 = styled.div`
  margin-bottom: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  height: 200px;
  gap: var(--gap-9xs);
`;
const Divbox = styled.div`
  padding: 10px;
  border: 1px solid var(--color-blue-main);
  border-radius: 5px;
  text-align: center;
  font-weight: bold;
  height: 20px;
  line-height: 20px;
  background-color: var(--color-blue-vivid);
  width: 70px;
`
const Textbox = styled.div`
  height: 256px;
  width: 100%;
  box-sizing: border-box;
  font-size: var(--font-size-xs);
  border: 1px solid var(--color-blue-main);
  border-radius: 15px;
`;

const Textbox1 = styled.textarea`
  width: 100%;
  height: 100px;
  border-radius: 5px;
  border: 1px solid var(--color-blue-main);
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  text-align: left;
  font-size: var(--font-size-m);
  color: gray;
  padding: 10px;
  resize: none;
  @media screen and (max-width: 750px) {
    padding-left: var(--padding-13xl);
    padding-right: var(--padding-12xl);
    box-sizing: border-box;
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
  margin: 0 auto auto auto;
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


const MatchingWatch = () => {
  return (
    <FrameWrapperRoot>
      <FrameParent1>
        <Title>
            <Div>제목</Div>
        </Title>
        <FrameGroup>
          <Divbox>종목</Divbox>
          <Divbox>난이도</Divbox>
          <Divbox>위치</Divbox>
        {/* <SportTagWrapper>
          <SportTag>
            <B2>광안리</B2>
          </SportTag>
        </SportTagWrapper> */}
          <Divbox>인원</Divbox>
          <Divbox>모집상태</Divbox>
        </FrameGroup>
        <FrameDiv>
          <Divbox>일정</Divbox>
          <Schedulebox />
        </FrameDiv>
      </FrameParent1>
      <DivRoot>
        <Textbox />
        <Textbox1>신청 메세지를 입력해주세요.</Textbox1>
      </DivRoot>
      <Button>
        <Div2>신청하기</Div2>
      </Button>
    </FrameWrapperRoot>
  );
};

export default MatchingWatch;
