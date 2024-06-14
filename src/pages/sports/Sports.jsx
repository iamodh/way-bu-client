import styled from "styled-components";
import { motion } from "framer-motion";
import { useRef, useState } from "react";

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

      <Slides>
        <Slide>{selectedSport}</Slide>
      </Slides>
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
    </Wrapper>
  );
}
