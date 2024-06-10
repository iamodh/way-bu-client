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
  width: 100%;
  @media screen and (max-width: 376px) {

  }
`;

const OptionsBar = styled.div`
  width: 1000px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--gap-13xl);
  @media screen and (max-width: 376px) {
    gap: var(--gap-base);
    width: 300px;
  }
`;


const MatchingOptions = () => {


  return (
    <Wrapper>
      <OptionsBar>
        <Sports />
      </OptionsBar>
    </Wrapper>
  );
};

export default MatchingOptions;
