import styled from "styled-components";
import { useState, useEffect } from "react";
import { client } from "../../../../libs/supabase";
import MatchingWatch from "./MatchingWatch";

const MatchingTop = styled.div`
  flex: 1; // 너비가 변할 때 동일한 비율 적용
  background-color: var(--color-skyblue-background);
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: var(--padding-45xl);
  padding-top: var(--padding-xs);
  box-sizing: border-box; // border까지 포함

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
  color: black;
  border: 1px solid var(--color-blue-vivid);
  background-color: var(--color-white);
  height: 200px;
  width: 200px;
  border-radius: var(--br-xl);
  box-sizing: border-box;
  box-shadow: 0px 6px 4px var(--color-gray);
  cursor: pointer;
  &:hover {
    box-shadow: 0px 10px 10px var(--color-gray);
    background-color: var(--color-skyblue-light);
  }



  @media screen and (max-width: 376px) {
    width: 130px;
    height: 130px;
  }
`;
const MainContentRoot = styled.section`
  align-self: stretch;
  display: flex;
  box-sizing: border-box;
`;
const H = styled.div`
  padding: 30px;
  font-size: var(--font-size-xxl);
  font-weight: bold;
  overflow: hidden; 
  text-overflow: ellipsis; 
  white-space: nowrap;
  @media screen and (max-width: 376px) {
    font-size: var(--font-size-xl);
    padding: 18px;
  }
`;

const P = styled.div`
  padding: 5px 30px ;
  display: flex;
  flex-direction: row;
  font-size: var(--font-size-m);
  font-weight: bold;
  background-color: var(--color-skyblue-main);
  overflow: hidden;
  text-overflow: ellipsis;	
  white-space: nowrap;
  @media screen and (max-width: 376px) {
    font-size: var(--font-size-s);
    padding: 3px 10px;
  }
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
  @media screen and (max-width: 376px) {
    width: 350px;
    height: 600px;
  }
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

const MainContent = () => {
  const [matchings, setMatchings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMatching, setSelectedMatching] = useState(null);
  const [selectedBeach, setSelectedBeach] = useState(null);
  const [selectedSport, setSelectedSport] = useState(null);

  useEffect(() => {
    getMatchings();
  }, []);

  useEffect(() => {
    getSports();
  }, []);

  useEffect(() => {
    getBeach();
  }, []);

  async function getMatchings() {
    const { data, error } = await client
      .from("MATCHING")
      .select(`id, title, matching_time, difficulty, location, required, total_people, matching_date, views, sport_id, beach_id, host_userId, state`);
    setMatchings(data);
    setIsLoading(false);
    if (error) {
      console.log(error.message);
      setIsLoading(false);
      return;
    }
    
    const today = new Date();
    today.setHours(0, 0, 0, 0); // 시간을 00:00:00으로 설정하여 날짜만 비교
    const filteredMatchings = data.filter((matching) => {
      const matchingDate = new Date(matching.matching_date);
      return matchingDate >= today;
    });

    // 조회수 기준 정렬
    const sortMatchings = filteredMatchings.sort((a, b) => b.views - a.views).slice(0, 5);
    
    setMatchings(sortMatchings);
    setIsLoading(false);
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


  async function getSports(sportId) {
    const { data, error } = await client
      .from("SPORT")
      .select("id, title")
      .eq("id", sportId); // sport_id와 일치하는 스포츠 정보 가져오기
    if (error) {
      console.log(error.message);
      return null;
    }
    return data[0]; // 데이터는 배열로 오므로 첫 번째 요소 반환
  }

  async function getBeach(beachId) {
    const { data, error } = await client
      .from("BEACH")
      .select("beach_name")
      .eq("id", beachId);
    if (error) {
      console.log(error.message);
      return null;
    }
    return data[0];
  }
  
  

  const openModal = async (matching) => {
    const sport = await getSports(matching.sport_id);
    setSelectedSport(sport);
    
    const beach = await getBeach(matching.beach_id); // matching.beach_id를 전달하여 해당하는 해변 정보 가져오기
    setSelectedMatching(matching);
    setSelectedBeach(beach);
  };   
  


  const closeModal = () => {
    setSelectedMatching(null);
    setSelectedSport(null);
    setSelectedBeach(null);
  };


  return (
    <MainContentRoot>
      <MatchingTop>
        <HotMatchingText>
          🔥 핫한 매칭 TOP 5 🔥
        </HotMatchingText>
        <HotMatching>
          {isLoading ? (
            "Loading..."
          ) : (
            matchings.map((m) => (
              <HotMatchingBox onClick={() => {openModal(m), updateMatchingViews(m)}} key={m.id}>
                <H>{m.title}</H>
                <P>위치: {m.location}</P>
                <P>날짜: {m.matching_date}</P>
              </HotMatchingBox>
            ))
          )}
          {selectedMatching && (
            <ModalWrapper onClick={closeModal}>
              <ModalContent onClick={(e) => e.stopPropagation()}>
                <CloseButton onClick={closeModal}>&times;</CloseButton>
                <MatchingWatch matching={selectedMatching} sport={selectedSport} beach={selectedBeach} />
              </ModalContent>
            </ModalWrapper>
          )}
        </HotMatching>
      </MatchingTop>
    </MainContentRoot>
  );
};

export default MainContent;
