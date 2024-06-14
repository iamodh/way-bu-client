import styled from "styled-components";
import { useState, useEffect } from "react";
import { client } from "../../../../libs/supabase";
import MatchingWatch from "./MatchingWatch";
import MatchingApply from "./MatchingApply";
import { useRecoilState } from "recoil";
import { loggedInUserState } from "../../../atom";
import { ModalWrapper, ModalContent, CloseButton } from "./MatchingLayout";

const MatchingTop = styled.div`
  flex: 1;
  background: url("/img/index/sand.png") no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: var(--padding-45xl);
  padding-top: var(--padding-xs);
  box-sizing: border-box;
  z-index: -1;
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
  font-size: var(--font-size-xl);
  color: var(--color-blue-main);
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
  padding: 5px 30px;
  display: flex;
  flex-direction: row;
  font-size: var(--font-size-m);
  font-weight: bold;
  /* background-color: var(--color-skyblue-main); */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  @media screen and (max-width: 376px) {
    font-size: var(--font-size-s);
    padding: 3px 10px;
  }
`;

const Content = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: bold;
  padding-left: 5px;
`;

const MainContent = () => {
  const [matchings, setMatchings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMatching, setSelectedMatching] = useState(null);
  const [selectedBeach, setSelectedBeach] = useState(null);
  const [selectedSport, setSelectedSport] = useState(null);
  const [modalContent, setModalContent] = useState("");
  const [loggedInUser, setLoggedInUser] = useRecoilState(loggedInUserState);
  const [hostProfile, setHostProfile] = useState(null);

  useEffect(() => {
    getMatchings();
    getSports();
    getBeach();
  }, []);

  async function getMatchings() {
    const { data, error } = await client.from("MATCHING").select(`*`);

    // 날짜 지난 매칭 필터링
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const filteredMatchings = data.filter((matching) => {
      const matchingDate = new Date(matching.matching_date);
      return matchingDate >= today;
    });

    // 조회수 기준 정렬
    const sortMatchings = filteredMatchings
      .sort((a, b) => b.views - a.views)
      .slice(0, 5);
    setMatchings(sortMatchings);
    setIsLoading(false);
  }

  // 클릭시 조회수 1 증가
  async function updateMatchingViews(matching) {
    const { data, error } = await client
      .from("MATCHING")
      .update({ views: matching.views + 1 })
      .eq("id", matching.id)
      .select();

    setMatchings((currentMatchings) =>
      currentMatchings.map((m) => (m.id === matching.id ? data[0] : m))
    );
  }

  // 호스트 이름 불러오기
  const getHostProfile = async (hostUserId) => {
    const { data, error } = await client
      .from("USER_PROFILE")
      .select("user_nickname")
      .eq("user_id", hostUserId);

    return data[0];
  };

  async function getSports(sportId) {
    const { data, error } = await client
      .from("SPORT")
      .select("id, title")
      .eq("id", sportId);

    return data[0];
  }

  async function getBeach(beachId) {
    const { data, error } = await client
      .from("BEACH")
      .select("beach_name")
      .eq("id", beachId);

    return data[0];
  }

  const openModal = async (matching) => {
    //비로그인으로 클릭할 경우 로그인창
    if (!loggedInUser) {
      window.location.href = "/login";
      return;
    }

    const sport = await getSports(matching.sport_id);
    setSelectedSport(sport);

    const beach = await getBeach(matching.beach_id);
    setSelectedMatching(matching);
    setSelectedBeach(beach);

    const hostProfile = await getHostProfile(matching.host_userId);
    setHostProfile(hostProfile);

    const isHostUser = matching.host_userId === loggedInUser.id;

    if (
      matching.joining_users &&
      matching.joining_users.includes(loggedInUser.id)
    ) {
      setModalContent("MatchingApply");
    } else if (isHostUser) {
      setModalContent("MatchingApply");
    } else {
      setModalContent("MatchingWatch");
    }

    //모달 제외 스크롤 X
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedMatching(null);
    setSelectedSport(null);
    setSelectedBeach(null);
    setHostProfile(null);
    //스크롤 가능
    document.body.style.overflow = "auto";
  };

  return (
    <MainContentRoot>
      <MatchingTop>
        <HotMatchingText>🔥 핫한 매칭 TOP 5 🔥</HotMatchingText>
        <HotMatching>
          {isLoading
            ? "Loading..."
            : matchings.map((m) => (
                <HotMatchingBox
                  onClick={() => {
                    openModal(m), updateMatchingViews(m);
                  }}
                  key={m.id}
                >
                  <H>{m.title}</H>
                  <hr />
                  <P>
                    위치: <Content>{m.location}</Content>
                  </P>
                  <P>
                    날짜: <Content>{m.matching_date}</Content>
                  </P>
                </HotMatchingBox>
              ))}
          {selectedMatching && (
            <ModalWrapper onClick={closeModal}>
              <ModalContent onClick={(e) => e.stopPropagation()}>
                <CloseButton onClick={closeModal}>&times;</CloseButton>
                {modalContent === "MatchingApply" && (
                  <MatchingApply
                    matching={selectedMatching}
                    sport={selectedSport}
                    beach={selectedBeach}
                    hostProfile={hostProfile}
                  />
                )}
                {modalContent !== "MatchingApply" && (
                  <MatchingWatch
                    matching={selectedMatching}
                    sport={selectedSport}
                    beach={selectedBeach}
                    hostProfile={hostProfile}
                  />
                )}
              </ModalContent>
            </ModalWrapper>
          )}
        </HotMatching>
      </MatchingTop>
    </MainContentRoot>
  );
};

export default MainContent;
