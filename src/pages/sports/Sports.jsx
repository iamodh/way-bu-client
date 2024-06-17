import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import React, { useRef, useState, useEffect, useCallback } from "react";
import { client } from "../../../libs/supabase";

const Wrapper = styled.div`
  position: relative;
  height: 100vh;
`;

const Background = styled.div`
  width: 100%;
  height: 100%;
  background-image: url("/img/sports1.jpeg");
  background-size: cover;
  background-position: center;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -100;
`;

// const Slides = styled.div``;

// const Slide = styled.div`
//   width: 300px;
//   height: 400px;
//   background-color: var(--color-white);
//   position: absolute;
//   top: 30%;
//   left: 80%;
//   transform: translate(-50%, -50%);
//   border-radius: 20px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   box-shadow: 0px 5px 10px 5px rgba(0, 0, 0, 0.3);
//   @media (max-width: 480px) {
//     border-radius: 12px;
//   }
// `;

const SportObject = styled.img`
  transition: all 0.1s ease-in;
  cursor: pointer;
  position: absolute;
  width: 200px;
  @media (max-width: 480px) {
    width: 50px;
  }
`;

const DivingMask = styled(SportObject)`
  transform: rotate(30deg);
  width: 100px;
  bottom: 15%;
  left: 40%;
  @media (max-width: 480px) {
    width: 70px;
    left: 30%;
    bottom: 10%;
  }
`;

const SurfingBoard = styled(SportObject)`
  width: 180px;
  bottom: 30%;
  right: 30%;
  @media (max-width: 480px) {
    width: 80px;
    bottom: 36%;
  }
`;

const Yacht = styled(SportObject)`
  top: 20%;
  left: 40%;
  @media (max-width: 480px) {
    width: 100px;
    top: 30%;
  }
`;

const Kayak = styled(SportObject)`
  width: 180px;
  top: 65%;
  left: 75%;
  @media (max-width: 480px) {
    width: 80px;
  }
`;

const Seashade = styled(SportObject)`
  transform: rotate(-1deg);
  width: 450px;
  top: 38%;
  left: 0px;
  @media (max-width: 480px) {
    width: 150px;
    top: 45%;
  }
`;

const Boogie = styled(motion.img)`
  width: 180px;
  position: absolute;
  bottom: 15%;
  left: 14%;
  cursor: pointer;
  @media (max-width: 480px) {
    width: 100px;
    left: 10%;
    bottom: 25%;
  }
`;

const Hand = styled.img`
  position: absolute;
  top: 75%;
  left: 25%;
  width: 40px;
  transform: rotate(-20deg);
  animation: moveLeftRight 6s infinite ease-in-out;

  @keyframes moveLeftRight {
    0% {
      left: 18%;
    }
    50% {
      left: 35%;
    }
    100% {
      left: 18%;
    }
  }
`;

const balloonAnimation = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const Balloon = styled.div`
  position: absolute;
  top: ${(props) => props.top - 120}px;
  left: ${(props) => props.left + 200}px; /* 오른쪽으로 50px 이동 */
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;
  animation: ${balloonAnimation} 3s linear infinite;
  cursor: pointer;

  img {
    width: 100px;
  }

  span {
    font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
    font-size: 12px;
    color: #626262;
    margin-top: -62px;
    margin-left: 20px;
  }
`;

const expand = keyframes`
  from {
    max-height: 0;
    opacity: 0;
  }
  to {
    max-height: 100rem; /* 드롭다운의 최대 높이를 설정 */
    opacity: 1;
  }
`;

const SportsContainer = styled.div`
  position: relative;
  top: -5rem;
  z-index: 99;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 800px;
  padding: 3rem 5%;
  background-color: var(--color-skyblue-background);
  animation: ${expand} 0.5s ease-in-out;
  margin: 0 auto;

  border-radius: 1rem;
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.1);
`;

const SportsTitle = styled.div`
  font-size: var(--font-size-l);
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
  padding: 1rem;
  border-radius: 1rem;
  @media (min-width: 768px) {
    font-size: var(--font-size-m);
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

const SportsBtn = styled.button`
  position: absolute;
  top: 3rem;
  right: 3rem;
  background-color: rgba(0, 0, 0, 0);
  font-size: var(--font-size-l);
  border: none;
  cursor: pointer;
`;

const ModalCover = styled.div`
  z-index: 3;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

export default function Sports() {
  const wrapperRef = useRef();
  const boogieRef = useRef();
  const sportsRef = useRef([]);
  const [selectedSport, setSelectedSport] = useState("");
  const [isHandVisible, setIsHandVisible] = useState(true);
  const [isBalloonVisible, setIsBalloonVisible] = useState(true);
  const [balloonPosition, setBalloonPosition] = useState({ top: 0, left: 0 });

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setIsBalloonVisible((prev) => !prev);
  //   }, 10000);

  //   return () => clearInterval(interval);
  // }, []);

  // 벌룬이 뭔지 모르겠는데 자꾸 마우스가 움직일 때 마다 벌룬 포지션을 조정하면서 페이지 렌더링이 자꾸 일어나서 일단 주석 처리 해놨어요 - 정환

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (boogieRef.current) {
        const boogieRect = boogieRef.current.getBoundingClientRect();
        const offsetX = boogieRect.width / 2;
        const offsetY = boogieRect.height / 2;
        // setBalloonPosition({
        //   top: boogieRect.top + window.scrollY - offsetY,
        //   left: boogieRect.left + window.scrollX - offsetX,
        // });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

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
    };

    useEffect(() => {
      getSports(selectedSport);
    }, [selectedSport]);

    return (
      // <SportsWrapper>
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
      // </SportsWrapper>
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

  const handleDragStart = () => {
    boogieRef.current.src = "/img/sport_items/boogie-fly.png";
    setIsHandVisible(false);
    setIsBalloonVisible(false);
  };

  const handleBalloonClick = () => {
    setIsBalloonVisible(false);
  };

  const handleBoogieClick = () => {
    setIsBalloonVisible(false); // boogie 클릭 시 balloon 숨기기
  };

  return (
    <Wrapper ref={wrapperRef}>
      <Background />
      {[
        {
          id: "snorkel",
          component: <DivingMask src="/img/min/snorkling.png" />,
        },
        {
          id: "surfing_board",
          component: <SurfingBoard src="/img/min/surfingboard.png" />,
        },
        { id: "yacht", component: <Yacht src="/img/min/yacht.png" /> },
        { id: "kayak", component: <Kayak src="/img/min/kayak.png" /> },
      ].map((item, i) => {
        return React.cloneElement(item.component, {
          id: item.id,
          key: item.id,
          ref: (el) => (sportsRef.current[i] = el),
        });
      })}
      <Seashade src="public/img/sport_items/seashade.png" />
      <Boogie
        ref={boogieRef}
        src="/img/sport_items/boogie.png"
        drag
        dragConstraints={wrapperRef}
        dragElastic={0}
        dragMomentum={false}
        whileDrag={{ scale: 1.2 }}
        onDragStart={handleDragStart}
        onDragEnd={onDragEnd}
        onClick={handleBoogieClick} // boogie 클릭 시 이벤트 핸들러 추가
      />
      <Balloon
        isVisible={isBalloonVisible}
        top={balloonPosition.top}
        left={balloonPosition.left}
        onClick={handleBalloonClick}
      >
        <img src="/img/sport_items/balloon1.png" alt="Balloon" />
        <span>Drag me!</span>
      </Balloon>
      {isHandVisible && <Hand src="/img/sport_items/hand.png" />}
      {/* <Slides>
        <Slide>{selectedSport}</Slide>
      </Slides> */}
      {selectedSport && (
        <>
          <SportsInfo />
          <ModalCover />
        </>
      )}
    </Wrapper>
  );
}
