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
  background-image: url("/img/sports.jpeg");
  background-size: cover;
  background-position: center;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -100;
`;

const Slides = styled.div``;

const Slide = styled.div`
  width: 20%;
  height: 40%;
  background-color: var(--color-white);
  position: absolute;
  top: 10%;
  right: 10%;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 5px 10px 5px rgba(0, 0, 0, 0.3);

  @media (max-width: 480px) {
    border-radius: 12px;
  }
`;

const SportObject = styled.div`
  position: absolute;
  top: ${(props) => props.$top};
  left: ${(props) => props.$left};
  transition: all 0.1s ease-in;
  cursor: pointer;
`;

const SurfingBoard = styled.img`
  width: 150px;
  height: auto;

  @media (max-width: 480px) {
    width: 70px;
  }
`;

const DivingMask = styled.img`
  width: 50px;
  height: auto;

  @media (max-width: 480px) {
    width: 30px;
  }
`;

const Kayak = styled.img`
  width: 100px;
  height: auto;

  @media (max-width: 480px) {
    width: 50px;
  }
`;

const Boogie = styled(motion.img)`
  position: absolute;
  top: 0;
  left: 0%;
  cursor: pointer;

  @media (max-width: 480px) {
    width: 50px;
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
          id: "surfing_board",
          component: <SurfingBoard src="/img/sport_items/surfingboard.png" />,
        },
        {
          id: "diving_mask",
          component: <DivingMask src="/img/sport_items/snorkling.png" />,
        },
        { id: "yacht", component: <Kayak src="/img/sport_items/yacht.png" /> },
      ].map((item, i) => {
        return (
          <SportObject
            id={item.id}
            key={item.id}
            $top={`${(i + 1) * 3}0%`}
            $left={`${(i + 1) * 2}0%`}
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
    </Wrapper>
  );
}
