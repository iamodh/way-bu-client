import MainContent from "./components/MainContent";
import ExploreMatchesBar from "./components/ExploreMatchesBar";
import Calendar from "./components/Calendar";
import styled from "styled-components";
import MatchingGroup from "./components/MatchingGroup";
import { useState } from "react";


const MatchingRoot = styled.div`
  width: 100%;
  position: relative;
  background-color: var(--white);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0px 0px var(--padding-13xl);
  box-sizing: border-box;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  font-size: var(--xl-bold-size);
  color: #2376f2;
  font-family: var(--font-noto-sans-kr);
`;

const Wrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
`;
const ExploreMatchesBarWrapper = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 0 20%;
`;

const Matching = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  return (
    <MatchingRoot>
      <MainContent />
      <Wrapper>
        <Calendar onSelectDate={handleDateSelect}/>
        <ExploreMatchesBar />
        <ExploreMatchesBarWrapper> 
          <MatchingGroup selectedDate={selectedDate}/>
        </ExploreMatchesBarWrapper>
      </Wrapper>
    </MatchingRoot>
  );
};

export default Matching;
