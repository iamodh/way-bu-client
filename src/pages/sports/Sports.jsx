import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
  z-index: -10;
`;

const Sky = styled.div`
  width: 100%;
  height: 20vh;
  background-color: var(--color-skyblue-main);
`;

const Wave = styled.div`
  width: 100%;
  height: 30vh;
  background-color: var(--color-blue-main);
`;

const Beach = styled.div`
  width: 100%;
  height: 50vh;
  background-color: var(--color-sand-main);
  display: flex;
  justify-content: center;
  align-items: space-around;
`;

const Slides = styled.div``;

const Slide = styled.div`
  width: 30vw;
  height: 40vh;
  background-color: var(--color-white);
  position: absolute;
  top: 5%;
  left: 50%;
  transform: translateX(-50%);
`;

const SportItem = styled.div``;

const Modal = styled.div``;

const Boogie = styled.div`
  position: absolute;
  top: 0;
`;

export default function Sports() {
  return (
    <Wrapper>
      <Sky></Sky>
      <Wave></Wave>
      <Beach>
        <SportItem>
          <img src="/img/sport_items/surfing_board.png" />
        </SportItem>
      </Beach>
      <Slides>
        <Slide></Slide>
      </Slides>
      <Modal></Modal>
      <Boogie>
        <img
          style={{ width: "auto", height: "150px" }}
          src="/img/sport_items/boogie.png"
        />
      </Boogie>
    </Wrapper>
  );
}
