import styled from "styled-components";
import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { client } from "../../../libs/supabase";
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

const Wrapper = styled.div`
  position: relative;
  height: 100vh;
`;

const Background = styled.div`
  width: 100%;
  height: 100%;
  background-image: url("/img/sports2.jpeg");
  background-size: cover;
  background-position: center;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -100;

  @media (max-width: 480px) {
  }
`;

const Slides = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Slide = styled.div`
  width: 250px;
  height: 350px;
  background-color: var(--color-white);
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 5px 10px 5px rgba(0, 0, 0, 0.3);
  margin-top: -500px;

  @media (max-width: 480px) {
    width: 50%;
    height: 30%;
    border-radius: 12px;
    margin-top: -100%; /* Adjust this value for mobile view */
  }
`;

const SportObject = styled.div`
  position: absolute;
  top: ${(props) => props.$top};
  left: ${(props) => props.$left};
  transition: all 0.1s ease-in;
  cursor: pointer;
`;

const DivingMask = styled.img`
  width: 80px;
  padding-top: 150px;
  transform: rotate(30deg);

  @media (max-width: 480px) {
    width: 30px;
  }
`;

const SurfingBoard = styled.img`
  width: 130px;
  padding-top: 80px;

  @media (max-width: 480px) {
    width: 70px;
  }
`;

const Kayak = styled.img`
  width: 160px;
  padding-top: 30px;

  @media (max-width: 480px) {
    width: 50px;
    /* padding-top: 10px; */
  }
`;

const Yacht = styled.img`
  width: 180px;

  @media (max-width: 480px) {
    width: 50px;
  }
`;

const Boogie = styled(motion.img)`
  position: absolute;
  width: 130px;
  height: 180px;
  bottom: 150px;
  left: 3%;
  cursor: pointer;

  @media (max-width: 480px) {
    width: 80px;
    height: 100px;
  }
`;

export default function Sports() {
  const wrapperRef = useRef();
  const boogieRef = useRef();
  const sportsRef = useRef([]);

  const [selectedSport, setSelectedSport] = useState("");

  const SportsInfo = () => {
    const [sportsInfo, setSportsInfo] = useState({
      title: "",
      image: "",
      caution: [],
      intro: "",
      recommend_time: "",
      required: [],
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
            {sportsInfo.required.map((e, i) => {
              return <InfoContent key={i}>• {e}</InfoContent>;
            })}
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
            {sportsInfo.caution.map((e, i) => {
              return <InfoContent key={i}>• {e}</InfoContent>;
            })}
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
      {[
        {
          id: "diving_mask",
          component: <DivingMask src="/img/min/snorkling.png" />,
        },
        {
          id: "surfing_board",
          component: <SurfingBoard src="/img/min/surfingboard.png" />,
        },
        {
          id: "kayak",
          component: <Kayak src="/img/min/kayak.png" />,
        },
        { id: "yacht", component: <Yacht src="/img/min/yacht.png" /> },
      ].map((item, i) => {
        return (
          <SportObject
            id={item.id}
            key={item.id}
            $top="450px"
            $left={`${i * 20 + 20}%`} // i + 사이 + 옆 이미지들을 가로로 나란히 배치
            ref={(el) => (sportsRef.current[i] = el)}
          >
            {item.component}
          </SportObject>
        );
      })}
      <Boogie
        ref={boogieRef}
        // style={{ width: "150px", height: "200px" }}
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
