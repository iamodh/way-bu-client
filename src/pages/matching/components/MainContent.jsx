import styled from "styled-components";

const MatchingTop = styled.div`
  flex: 1; //너비가 변할 때 동일한 비율 적용
  background-color: var(--color-skyblue-background);
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: var(--padding-45xl);
  padding-top: var(--padding-xs);
  box-sizing: border-box; //border까지 포함

  @media screen and (max-width: 750px) {
    padding-left: var(--padding-13xl);
    padding-right: var(--padding-13xl);
    box-sizing: border-box;
  }
  @media screen and (max-width: 450px) {
    padding-left: var(--padding-xl);
    padding-right: var(--padding-xl);
    box-sizing: border-box;
  }
`;
const HotMatchingText = styled.div`
  width: auto;
  height: auto;
  display: flex;
  justify-content: center;
  text-align: center;
  font-size: var(--font-size-xl);
  font-weight: bold;
  color: var(--color-black);
  padding: 40px 0;
`;
const HotMatching = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  box-sizing: border-box;
  gap: var(--gap-xl);
  flex-wrap: wrap;
`;
const HotMatchingBox = styled.div`
  border: 1px solid var(--color-blue-vivid);
  background-color: var(--color-white);
  height: 200px;
  width: 200px;
  border-radius: var(--br-xl);
  box-sizing: border-box;
  box-shadow: 0 4px 6px gray;
`;
const MainContentRoot = styled.section`
  align-self: stretch;
  display: flex;
  box-sizing: border-box;
`;

const MainContent = () => {
  return (
    <MainContentRoot>
      <MatchingTop>
        <HotMatchingText>
          🔥 핫한 매칭 TOP 5
        </HotMatchingText>
        <HotMatching>
          <HotMatchingBox />
          <HotMatchingBox />
          <HotMatchingBox />
          <HotMatchingBox />
          <HotMatchingBox />
        </HotMatching>
      </MatchingTop>
    </MainContentRoot>
  );
};

export default MainContent;