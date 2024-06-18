import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import React, { useRef, useState, useEffect } from "react";

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
`;

const Slides = styled.div``;

const Slide = styled.div`
  width: 300px;
  height: 400px;
  background-color: var(--color-white);
  position: absolute;
  top: 30%;
  left: 80%;
  transform: translate(-50%, -50%);
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 5px 10px 5px rgba(0, 0, 0, 0.3);
  @media (max-width: 480px) {
    border-radius: 12px;
  }
`;

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
`;

const SurfingBoard = styled(SportObject)`
  width: 180px;
  bottom: 30%;
  right: 30%;
`;

const Yacht = styled(SportObject)`
  top: 20%;
  left: 40%;
`;

const Kayak = styled(SportObject)`
  width: 180px;
  top: 65%;
  left: 80%;
`;

const Seashade = styled(SportObject)`
  transform: rotate(-1deg);
  width: 450px;
  top: 38%;
  left: 0px;
`;

const Boogie = styled(motion.img)`
  position: absolute;
  bottom: 15%;
  left: 14%;
  cursor: pointer;
  @media (max-width: 480px) {
    width: 50px;
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

export default function Sports() {
  const wrapperRef = useRef();
  const boogieRef = useRef();
  const sportsRef = useRef([]);
  const [selectedSport, setSelectedSport] = useState("");
  const [isHandVisible, setIsHandVisible] = useState(true);
  const [isBalloonVisible, setIsBalloonVisible] = useState(true);
  const [balloonPosition, setBalloonPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setIsBalloonVisible((prev) => !prev);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (boogieRef.current) {
        const boogieRect = boogieRef.current.getBoundingClientRect();
        const offsetX = boogieRect.width / 2;
        const offsetY = boogieRect.height / 2;
        setBalloonPosition({
          top: boogieRect.top + window.scrollY - offsetY,
          left: boogieRect.left + window.scrollX - offsetX,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

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
          id: "snorkling",
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

      <Slides>
        <Slide>{selectedSport}</Slide>
      </Slides>
      <Seashade src="public/img/sport_items/seashade.png" />
      <Boogie
        ref={boogieRef}
        style={{ width: "180px", height: "210px" }}
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
    </Wrapper>
  );
}
