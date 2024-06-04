import Sports from "./Sports";
import styled from "styled-components";
import { useState } from "react";

const Wrapper = styled.section`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  padding: 0px var(--padding-xl) var(--padding-13xl);
  box-sizing: border-box;
  max-width: 100%;
`;

const OptionsBar = styled.div`
  width: 1000px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--gap-13xl);
  max-width: 100%;
  @media screen and (max-width: 750px) {
    gap: var(--gap-base);
  }
`;


const MatchingOptions = () => {
  const [selectedSportId, setSelectedSportId] = useState(null);

  return (
    <Wrapper>
      <OptionsBar>
        <Sports selectedSportId={selectedSportId}/>
      </OptionsBar>
    </Wrapper>
  );
};

export default MatchingOptions;
