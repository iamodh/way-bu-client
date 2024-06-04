import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
  z-index: -10;
  background-color: var(--color-sand-main);
`;

const Background = styled.img`
  position: relative;
`;

const Slides = styled.div``;

const Slide = styled.div`
  width: 25vw;
  height: 35vh;
  background-color: var(--color-white);
  position: absolute;
  top: 5%;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 5px 10px 5px rgba(0, 0, 0, 0.3);
`;

const SportItem = styled.div`
  position: absolute;
  bottom: 10%;
  right: 10%;
`;

const Modal = styled.div``;

const Boogie = styled.div`
  position: absolute;
  top: 0;
`;

export default function Sports() {
  return (
    <Wrapper>
      <Background src="/img/sports.jpeg" width={"100%"} />
      <SportItem>
        <img src="/img/sport_items/surfing_board.png" />
      </SportItem>
      <Slides>
        <Slide>Slide</Slide>
      </Slides>
      <Boogie>
        <img
          style={{ width: "auto", height: "150px" }}
          src="/img/sport_items/boogie.png"
        />
      </Boogie>
    </Wrapper>
  );
}
