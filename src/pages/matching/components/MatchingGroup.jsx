import styled from "styled-components";
import { useState, useEffect } from "react";
import { client } from "../../../../libs/supabase";
import MatchingWatch from "./MatchingWatch";
import MatchingApply from "./MatchingApply";
import { useRecoilState } from "recoil";
import { loggedInUserState } from "../../../atom";
import { ModalWrapper, ModalContent, CloseButton } from "./MatchingLayout";


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

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  margin: 20px;
`;

const PageBtn = styled.button`
  margin: 0 5px;
  padding: 5px 10px;
  cursor: pointer;
`;

const PageBox = styled.div`
  margin: 0 5px;
  padding: 5px 10px;
  cursor: pointer;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 3px;
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

  useEffect(() => {
    setPageSection(Math.ceil(postPage / postPerPage));
  }, [postPage]);

  useEffect(() => {
    getMatchings();
  }, []);

  useEffect(() => {
    getSports();
  }, []);

  useEffect(() => {
    getBeach();
  }, []);

  //매칭 테이블
  async function getMatchings() {
    const { data, error } = await client
      .from("MATCHING")
      .select(`id, title, matching_time, difficulty, location, required, total_people, matching_date, views, sport_id, beach_id, host_userId, joining_users, necessity_details, necessity, created_at`);
    if (error) {
      console.log(error.message);
      setIsLoading(false);
      return;
    }
    // created_at 기준으로 최신순으로 정렬
    const sortedData = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    setMatchings(sortedData);
    setIsLoading(false);
  }
  
  //날짜 필터링
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

  //클릭시 조회수 업데이트
  async function updateMatchingViews(matching) {
    const { data, error } = await client
      .from("MATCHING")
      .update({ views: matching.views + 1 })
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

  //스포츠 드롭다운 내용 불러오기
  async function getSports(sportId) {
    const { data, error } = await client
      .from("SPORT")
      .select("id, title")
      .eq("id", sportId);
    if (error) {
      console.log(error.message);
      return null;
    }
    return data[0]; // 데이터는 배열로 오므로 첫 번째 요소 반환
  }

  //해수욕장 태그 내용 불러오기
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

    const beach = await getBeach(matching.beach_id);
    setSelectedMatching(matching);
    setSelectedBeach(beach);

    if (matching.joining_users && matching.joining_users.includes(loggedInUser.id)) {
      setModalContent("MatchingApply");
    } else {
      setModalContent("MatchingWatch");
    }
  };

  const closeModal = () => {
    setSelectedMatching(null);
    setSelectedSport(null);
    setSelectedBeach(null);
  };

  const pageList = () => {
    const pages = [];
    const first = (pageSection - 1) * postPerPage + 1;
    const last = pageSection * postPerPage < maxPage ? pageSection * postPerPage : maxPage;
    for (let i = first; i <= last; i++) {
      pages.push(<PageBox key={i} onClick={() => setPostPage(i)}>{i}</PageBox>);
    }
    return pages;
  };

  return (
    <Wrapper>
      {isLoading ? (
        "Loading..."
      ) : (
        currentMatchings.map((m) => (
          <MatchingContainer onClick={() => { openModal(m); updateMatchingViews(m); }} key={m.id}>
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
            {modalContent === "MatchingApply" && (
              <MatchingApply matching={selectedMatching} sport={selectedSport} beach={selectedBeach} />
            )}
            {modalContent !== "MatchingApply" && (
              <MatchingWatch matching={selectedMatching} sport={selectedSport} beach={selectedBeach} />
            )}
          </ModalContent>
        </ModalWrapper>
      )}
      <PageWrapper>
        {pageSection > 1 && (
          <>
            <PageBtn onClick={() => setPostPage(1)}>◀️◀️</PageBtn>
            <PageBtn onClick={() => setPostPage((pageSection - 2) * postPerPage + 1)}>◀️</PageBtn>
          </>
        )}
        {pageList()}
        {pageSection < maxPage / postPerPage && (
          <>
            <PageBtn onClick={() => setPostPage(pageSection * postPerPage + 1)}>▶️</PageBtn>
            <PageBtn onClick={() => setPostPage(maxPage)}>▶️▶️</PageBtn>
          </>
        )}
      </PageWrapper>
    </Wrapper>
  );
};

export default MatchingGroup;