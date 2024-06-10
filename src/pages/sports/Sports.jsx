import { client } from "../../../libs/supabase";
import { useRef, useState, useEffect } from "react";
import {
  Wrapper,
  Background,
  Slides,
  Slide,
  SportObject,
  Boogie,
  SportsWrapper,
  SportsContainer,
  SportsTitle,
  InfoImage,
  InfoBox,
  InfoName,
  InfoContent,
  ModalCover,
  SportsBtn,
} from "./components/SportsInfoLayout";

export default function Sports() {
  const wrapperRef = useRef();
  const boogieRef = useRef();
  const sportsRef = useRef([]);

  const [selectedSport, setSelectedSport] = useState("");

  const SportsInfo = () => {
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
        .eq("sport_name", sportsName)
        .single();
      if (error) {
        console.error("Error fetching sports:", error);
        return;
      }
      setSportsInfo(data);
      console.log(data);
    };

    useEffect(() => {
      getSports(selectedSport);
    }, [selectedSport]);

    return (
      <SportsWrapper>
        <SportsContainer>
          <SportsBtn
            onClick={() => {
              setSelectedSport("");
            }}
          >
            X
          </SportsBtn>
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
      </SportsWrapper>
    );
  };

  const onDragEnd = (event, info) => {
    boogieRef.current.src = "/img/sport_items/boogie.png";
    sportsRef.current.forEach((element) => {
      const xDiff =
        element.parentElement.offsetLeft + element.offsetLeft - info.point.x;
      const yDiff =
        element.parentElement.offsetTop + element.offsetTop - info.point.y;
      if (xDiff < 0 && xDiff > -160 && yDiff < 0 && yDiff > -160) {
        element.style.scale = 1.2;
        setSelectedSport(element.id);
      } else {
        element.style.scale = 1;
      }
    });
  };

  return (
    <Wrapper ref={wrapperRef}>
      <Background />
      {["surfing_board", "yacht"].map((e, i) => {
        return (
          <SportObject
            id={e}
            key={e}
            $top={`${(i + 1) * 3}0%`}
            $left={`${(i + 1) * 2}0%`}
            ref={(el) => (sportsRef.current[i] = el)}
          >
            <img src={`/img/sport_items/${e}.png`} />
          </SportObject>
        );
      })}
      <Boogie
        ref={boogieRef}
        style={{ width: "100px", height: "150px" }}
        src="/img/sport_items/boogie.png"
        drag
        dragConstraints={wrapperRef}
        dragElastic={0}
        dragMomentum={false}
        whileDrag={{ scale: 1.2 }}
        onDragStart={() => {
          boogieRef.current.src = "/img/sport_items/boogie-fly.png";
        }}
        onDragEnd={onDragEnd}
      ></Boogie>
      <Slides>
        <Slide>{selectedSport}</Slide>
      </Slides>
      {selectedSport && (
        <>
          <SportsInfo /> <ModalCover />
        </>
      )}
    </Wrapper>
  );
}
