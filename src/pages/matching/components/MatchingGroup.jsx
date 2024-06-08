import styled from "styled-components";
import { useState, useEffect } from "react";
import { client } from "../../../../libs/supabase";
import MatchingWatch from "./MatchingWatch";
import MatchingApply from "./MatchingApply";
import { useRecoilState } from "recoil";
import { loggedInUserState } from "../../../atom";
import { ModalWrapper, ModalContent, CloseButton } from "./MatchingLayout";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MatchingIcon = styled.img`
  height: 100px;
  width: 100px;
  overflow: hidden;
  flex-shrink: 0;
  margin-left: 15px;
  min-height: 100px;
  @media screen and (max-width: 376px) {
    flex: 1;
    width: 90px;
  }
`;

const DivWrapper = styled.div`
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
  color: black;
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
  overflow: hidden;
  text-overflow: ellipsis;    
  white-space: nowrap;
  cursor: pointer;
  &:hover {
    background-color: var(--color-skyblue-main);
  }

  @media screen and (max-width: 376px) {
    min-width: 300px;
    gap: var(--gap-xl);
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
  overflow: hidden;
  text-overflow: ellipsis;    
  white-space: nowrap;
  width: 250px;
  @media screen and (max-width: 376px) {
    width: 130px;
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

const Content = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;    
  white-space: nowrap;
  font-weight: normal;
  @media screen and (max-width: 376px) {
    width: 130px;
  }
`;
const P = styled.div`
  margin: 0;
  display: flex;
  flex-direction: row;
  font-size: var(--font-size-m);
  font-weight: bold;
  gap: var(--gap-5xs);
  width: 250px;
  overflow: hidden;
  text-overflow: ellipsis;    
  white-space: nowrap;
  @media screen and (max-width: 376px) {
    width: 130px;
  }
`;

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 20px;
  padding: 10px;
  border-radius: 10px;
  margin-top: 30px;
`;

const PageBtn = styled.button`
  margin: 0 5px;
  padding: 5px 10px;
  line-height: 10px;
  cursor: pointer;
  border: none;
  border-radius: 3px;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.1);
  font-size: var(--font-size-xs);
`;

const PageBox = styled.div`
  margin: 0 5px;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 3px;
  color: ${props => props.isActive ? 'white' : 'var(--color-blue-main)'};
  background-color: ${props => props.isActive ? 'var(--color-blue-main)' : 'transparent'};
`;


const MatchingGroup = ({ selectedDate, selectedTags }) => {
  const [matchings, setMatchings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMatching, setSelectedMatching] = useState(null);
  const [selectedBeach, setSelectedBeach] = useState(null);
  const [selectedSport, setSelectedSport] = useState(null);
  const [modalContent, setModalContent] = useState("");
  const [loggedInUser, setLoggedInUser] = useRecoilState(loggedInUserState);
  const postPerPage = 6;
  const [maxPage, setMaxPage] = useState(0);
  const [postPage, setPostPage] = useState(1);
  const [pageSection, setPageSection] = useState(1);
  const [hostProfile, setHostProfile] = useState(null);
  const [sportsData, setSportsData] = useState({}); // 추가된 상태

  useEffect(() => {
    setPageSection(Math.ceil(postPage / postPerPage));
  }, [postPage]);

  useEffect(() => {
    getMatchings();
  }, []);

  useEffect(() => {
    getAllSports(); // 모든 스포츠 데이터를 미리 가져옴
  }, []);

  useEffect(() => {
    getBeach();
  }, []);

  async function getMatchings() {
    const { data, error } = await client
      .from("MATCHING")
      .select(`id, title, matching_time, difficulty, location, required, total_people, matching_date, views, sport_id, beach_id, host_userId, joining_users, necessity_details, necessity, created_at`);
    if (error) {
      console.log(error.message);
      setIsLoading(false);
      return;
    }
    const sortedData = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    setMatchings(sortedData);
    setIsLoading(false);
  }

  const getHostProfile = async (hostUserId) => {
    try {
      const { data, error } = await client
        .from('USER_PROFILE')
        .select('avatar_url, user_nickname')
        .eq('user_id', hostUserId);
      if (error) throw error;
      return data[0];
    } catch (error) {
      console.error('Error fetching host profile:', error.message);
      return null;
    }
  };

  const filteredMatchings = matchings.filter((matching) => {
    const matchingDate = new Date(matching.matching_date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return matchingDate >= today && (!selectedDate || (
      matchingDate.getFullYear() === selectedDate.getFullYear() &&
      matchingDate.getMonth() === selectedDate.getMonth() &&
      matchingDate.getDate() === selectedDate.getDate()
    ));
  });

  useEffect(() => {
    setMaxPage(Math.ceil(filteredMatchings.length / postPerPage));
  }, [filteredMatchings]);

  const currentMatchings = filteredMatchings.slice((postPage - 1) * postPerPage, postPage * postPerPage);

  async function updateMatchingViews(matching) {
    const { data, error } = await client
      .from("MATCHING")
      .update({ views: matching.views + 1 })
      .eq("id", matching.id)
      .select();
    if (error) {
      console.log(error.message);
    }
  }

  async function getAllSports() {
    const { data, error } = await client
      .from("SPORT")
      .select("id, title, icon_url");
    if (error) {
      console.log(error.message);
      return null;
    }
    const sportsDataMap = data.reduce((acc, sport) => {
      acc[sport.id] = sport;
      return acc;
    }, {});
    setSportsData(sportsDataMap); // 모든 스포츠 데이터를 상태로 설정
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
    const sport = sportsData[matching.sport_id]; // 이미 가져온 스포츠 데이터 사용
    setSelectedSport(sport);

    const beach = await getBeach(matching.beach_id);
    setSelectedMatching(matching);
    setSelectedBeach(beach);

    const hostProfile = await getHostProfile(matching.host_userId);
    setHostProfile(hostProfile);

    const isHostUser = matching.host_userId === loggedInUser.id;

    if (matching.joining_users && matching.joining_users.includes(loggedInUser.id)) {
      setModalContent("MatchingApply");
    } else if (isHostUser) {
      setModalContent("MatchingApply")
    } else {
      setModalContent("MatchingWatch");
    }

    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedMatching(null);
    setSelectedSport(null);
    setSelectedBeach(null);
    setHostProfile(null);
    document.body.style.overflow = 'auto';
  };

  const pageList = () => {
    const pages = [];
    const first = (pageSection - 1) * postPerPage + 1;
    const last = pageSection * postPerPage < maxPage ? pageSection * postPerPage : maxPage;
    for (let i = first; i <= last; i++) {
      pages.push(
        <PageBox key={i} onClick={() => setPostPage(i)} isActive={i === postPage}>
          {i}
        </PageBox>
      );
    }
    return pages;
  };
  
  const formatTime = (timeString) => {
    const [hour, minute] = timeString.split(':');
    return `${hour}시 ${minute}분`;
  };

  return (
    <Wrapper>
      <DivWrapper>
        {isLoading ? (
          "Loading..."
        ) : (
          currentMatchings.map((m) => {
            return (
              <MatchingContainer onClick={() => { openModal(m); updateMatchingViews(m); }} key={m.id}>
                <MatchingIcon src={sportsData[m.sport_id]?.icon_url} alt={'Sport Icon'} />
                <ContainerDetails>
                  <Title>
                    <H>{m.title}</H>
                  </Title>
                  <P>위치 : <Content>{m.location}</Content></P>
                  <P>시간 : <Content>{formatTime(m.matching_time)}</Content></P>
                  <P>난이도 : <Content>{m.difficulty}</Content></P>
                </ContainerDetails>
              </MatchingContainer>
            );
          })
        )}
        {selectedMatching && (
          <ModalWrapper onClick={closeModal}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <CloseButton onClick={closeModal}>&times;</CloseButton>
              {modalContent === "MatchingApply" && (
                <MatchingApply matching={selectedMatching} sport={selectedSport} beach={selectedBeach} hostProfile={hostProfile} />
              )}
              {modalContent !== "MatchingApply" && (
                <MatchingWatch matching={selectedMatching} sport={selectedSport} beach={selectedBeach} hostProfile={hostProfile} />
              )}
            </ModalContent>
          </ModalWrapper>
        )}
      </DivWrapper>
      <PageWrapper>
        {postPage > 1 && (
          <>
            <PageBtn onClick={() => setPostPage(1)}>◀️◀️</PageBtn>
            <PageBtn onClick={() => setPostPage(postPage - 1)}>◀️</PageBtn>
          </>
        )}
        {pageList()}
        {postPage < maxPage && (
          <>
            <PageBtn onClick={() => setPostPage(postPage + 1)}>▶️</PageBtn>
            <PageBtn onClick={() => setPostPage(maxPage)}>▶️▶️</PageBtn>
          </>
        )}
      </PageWrapper>
    </Wrapper>
  );
};

export default MatchingGroup;
