import styled from "styled-components";
import MatchingGroup from "./MatchingGroup";

const ExploreMatchesBarRoot = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: var(--gap-13xl);
  padding: 0px 20%;
  @media screen and (max-width: 750px) {
    gap: var(--gap-base);
    justify-content: center;
    align-items: center;
  }
`;

const H = styled.h3`
  margin: 0px;
  margin-top: 20px;
  position: relative;
  font-size: var(--font-size-xl);
  font-weight: bold;
  font-family: inherit;
  background-color: aliceblue;
  @media screen and (max-width: 450px) {
    font-size: var(--font-size-l);
  }
`;
const MatchingActionsWrapper = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-end;
  max-width: 100%;
  @media screen and (max-width: 768px) {
    align-items: center;
    justify-content: center;
  }
`;

const MatchingActions = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  gap: var(--gap-base);
  max-width: 100%;
  @media screen and (max-width: 450px) {
    flex-wrap: wrap;
  }
`;
const Button = styled.button`
  cursor: pointer;
  border: none;
  min-width: 170px;
  padding: var(--padding-base) var(--padding-9xs);
  background-color: var(--color-blue-main);
  color: var(--color-white);
  border-radius: var(--br-3xs);
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: var(--color-navy);
    box-sizing: border-box;
  }
`;
const Div = styled.div`
  position: relative;
  font-size: var(--font-size-ml);
  line-height: 20px;
  font-family: inherit;
  color: inherit;
  text-align: center;
  display: inline-block;
  white-space: nowrap;
`;
const MatchingContainer = styled.div`
  width: 80%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`;

const ExploreMatchesBar = () => {
  return (
    <ExploreMatchesBarRoot>
      <H>매칭 둘러보기</H>
      <MatchingActionsWrapper>
        <MatchingActions>
          <Button><Div>내 매칭 보러가기</Div></Button>
          <Button><Div>매칭 만들기</Div></Button>
        </MatchingActions>
      </MatchingActionsWrapper>
      <MatchingContainer />
    </ExploreMatchesBarRoot>
  );
};

export default ExploreMatchesBar;
