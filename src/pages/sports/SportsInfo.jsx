import React, { useState } from "react";
import { client } from "../../../libs/supabase";
import styled from "styled-components";

const SportsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const SportsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 1080px;
  width: 100%;
  padding: 3rem 10%;
  background-color: var(--color-skyblue-background);
`;

const SportsTitle = styled.div`
  font-size: var(--font-size-xl);
  font-weight: 700;
  margin-bottom: 2rem;
`;

const InfoBox = styled.div`
  width: 100%;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  padding-bottom: 1rem;
  background-color: rgba(0, 0, 0, 0.03);
  padding: 1.5rem;
  border-radius: 1rem;
  @media (min-width: 768px) {
    font-size: var(--font-size-l);
    margin-bottom: 2rem;
  }
`;

const InfoName = styled.div`
  font-weight: 600;
  margin-bottom: 1rem;
`;

const InfoImage = styled.img`
  width: 50%;
  margin-bottom: 2rem;
  border-radius: 0.5rem;
`;

const InfoContent = styled.div`
  margin-left: 1rem;
`;

export default function SportsInfo() {
  const [sportsInfo, setSportsInfo] = useState({
    title: "",
    image: "",
    caution: "",
    intro: "",
    recommend_time: "",
    required: "",
    tip: "",
  });

  const getSports = async (sportsName) => {
    const { data, error } = await client
      .from("SPORT")
      .select("*")
      .eq("title", sportsName)
      .single();
    if (error) {
      console.error("Error fetching sports:", error);
      return;
    }
    setSportsInfo(data);
    console.log(data);
  };

  return (
    <SportsWrapper>
      <SportsContainer>
        <SportsTitle>
          {sportsInfo.title ? sportsInfo.title : "제목"}
        </SportsTitle>
        <InfoImage src={sportsInfo.image} />
        <InfoBox>
          <InfoName>소개 💁🏻‍♂️</InfoName>
          <InfoContent>{sportsInfo.intro}</InfoContent>
        </InfoBox>
        <InfoBox>
          <InfoName>준비물 🛟</InfoName>
          <InfoContent>{sportsInfo.required}</InfoContent>
        </InfoBox>
        <InfoBox>
          <InfoName>추천시간 🕙 </InfoName>
          <InfoContent>{sportsInfo.recommend_time}</InfoContent>
        </InfoBox>
        <InfoBox>
          <InfoName>한줄팁 💡</InfoName>
          <InfoContent>{sportsInfo.tip}</InfoContent>
        </InfoBox>
        <InfoBox>
          <InfoName>유의사항 ⚠️</InfoName>
          <InfoContent>{sportsInfo.caution}</InfoContent>
        </InfoBox>
      </SportsContainer>
      <button onClick={() => getSports("패들보딩")}>패들보딩</button>
    </SportsWrapper>
  );
}
