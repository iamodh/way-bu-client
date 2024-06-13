import styled from "styled-components";
import { motion } from "framer-motion";
import React, { useRef, useState } from "react";

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
  @media (max-width: 480px) {
  }
`;
const Slides = styled.div``;
const Slide = styled.div`
  width: 20%;
  height: 40%;
  background-color: var(--color-white);
  position: absolute;
  top: 10%;
  left: 40px;
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
  src: ${(props) => props.imageUrl};

  width: 200px;
  @media (max-width: 480px) {
    width: 50px;
  }
`;

const DivingMask = styled(SportObject)`
  transform: rotate(30deg);
  bottom: 10%;
  left: 30%;
`;

const SurfingBoard = styled(SportObject)`
  bottom: 30%;
  right: 30%;
`;

const Yacht = styled(SportObject)`
  top: 30%;
  left: 30%;
`;

const Kayak = styled(SportObject)`
  top: 35%;
  right: 15%;
`;

const Boogie = styled(motion.img)`
  position: absolute;
  bottom: 20%;
  left: 50%;
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
      console.log(element);
      const xDiff =
        element.parentElement.offsetLeft + element.offsetLeft - info.point.x;
      const yDiff =
        element.parentElement.offsetTop + element.offsetTop - info.point.y;
      console.log(xDiff, yDiff);
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
