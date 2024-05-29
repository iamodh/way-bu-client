import styled from "styled-components";
import { useState, useEffect } from "react";
import { client } from "../../../../libs/supabase";
import MatchingWatch from "./MatchingWatch";

const MatchingIcon = styled.img`
  height: 100px;
  width: 100px;
  overflow: hidden;
  flex-shrink: 0;
  margin-left: 15px;
  min-height: 100px;
  @media screen and (max-width: 376px) {
    flex: 1;
    width: 100px;
  }
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--gap-13xl);
  box-sizing: border-box;
  padding: 0 20%;

  @media screen and (max-width: 850px) {
    grid-template-columns: 1fr;
    padding: 0 10%;
  }

  @media screen and (max-width: 450px) {
    padding: 0 5%;
  }
`;

const MatchingContainer = styled.div`
  max-width: 500px;
  min-width: 400px;
  height: 150px;
  padding: var(--padding-8xl) var(--padding-13xl);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  text-align: left;
  border: none;
  border-radius: 10px;
  box-sizing: border-box;
  box-shadow: 1px 1px 1px 1px gainsboro;
  gap: var(--gap-base);
  background-color: white;
  cursor: pointer;
  &:hover {
    background-color: var(--color-skyblue-main);
  }

  @media screen and (max-width: 376px) {
    min-width: 300px;
  }
`;

const ContainerDetails = styled.div`
  font-size: var(--font-size-m);
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 376px) {
    margin-right: 30px;
  }
`;

const Title = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 15px;
  @media screen and (max-width: 450px) {
    flex-wrap: wrap;
  }
`;

const H = styled.div`
  position: relative;
  font-size: var(--font-size-xl);
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;	
  white-space: nowrap;
  @media screen and (max-width: 450px) {
    font-size: var(--font-size-l);
  }
`;

const P = styled.div`
  margin: 0;
  display: flex;
  flex-direction: row;
  font-size: var(--font-size-m);
  font-weight: bold;
  gap: var(--gap-5xs);
  overflow: hidden;
  text-overflow: ellipsis;	
  white-space: nowrap;
`;

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: var(--br-3xs);
  height: 700px;
  width: 600px;
  text-align: center;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: var(--color-dark);
  &:hover {
    color: var(--color-navy);
  }
`;

const MatchingGroup = () => {
  const [matchings, setMatchings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMatching, setSelectedMatching] = useState(null);

  useEffect(() => {
    getMatchings();
  }, []);

  async function getMatchings() {
    const { data, error } = await client
      .from("MATCHING")
      .select(`id, title, matching_time, difficulty, location, required, total_people, matching_date, views`);
    setMatchings(data);
    setIsLoading(false);
    if (error) {
      console.log(error.message);
      return;
    }
  }

  async function updateMatchingViews(matching) {
    const { data, error } = await client
    .from("MATCHING")
    .update({views : matching.views+1})
    .eq("id", matching.id)
    .select();
    if (error) {
      console.log(error.message);
      return;
    }
    setMatchings((currentMatchings) => 
      currentMatchings.map((m) => (m.id === matching.id ? data[0] : m))
    );
    
  }


  const openModal = (matching) => {
    setSelectedMatching(matching);
  };

  const closeModal = () => {
    setSelectedMatching(null);
  };

  return (
    <Wrapper>
      {isLoading ? (
        "Loading..."
      ) : (
        matchings.map((m) => (
          <MatchingContainer onClick={() => {openModal(m), updateMatchingViews(m)}} key={m.id}>
            <MatchingIcon />
            <ContainerDetails>
              <Title>
                <H>{m.title}</H>
              </Title>
              <P>위치 : <div style={{ fontWeight: "normal" }}>{m.location}</div></P>
              <P>시간 : <div style={{ fontWeight: "normal" }}>{m.matching_time}</div></P>
              <P>난이도 : <div style={{ fontWeight: "normal" }}>{m.difficulty}</div></P>
            </ContainerDetails>
          </MatchingContainer>
        ))
      )}
      {selectedMatching && (
        <ModalWrapper onClick={closeModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={closeModal}>&times;</CloseButton>
            <MatchingWatch matching={selectedMatching} />
          </ModalContent>
        </ModalWrapper>
      )}
    </Wrapper>
  );
};

export default MatchingGroup;

