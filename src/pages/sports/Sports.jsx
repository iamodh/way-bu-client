import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
  background-color: var(--color-sand-main);
`;

const Background = styled.img`
  width: 100%;
  position: relative;
  padding-top: 70px;

  @media (max-width: 480px) {
    padding-top: 100px;
  }
`;

const Slides = styled.div``;

const Slide = styled.div`
  width: 20%;
  height: 40%;
  background-color: var(--color-white);
  position: absolute;
  top: 10%;
  right: 10%; /* 오른쪽에 배치 */
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 5px 10px 5px rgba(0, 0, 0, 0.3);

  @media (max-width: 480px) {
    border-radius: 12px;
  }
`;

const SportItem = styled.div`
  position: absolute;
  bottom: 10%;
  right: 10%;
`;

const SurfingBoard = styled.img`
  width: 200px;
  height: auto;

  @media (max-width: 480px) {
    width: 70px;
  }
`;

const DivingMask = styled.img`
  width: 80px;
  height: auto;

  @media (max-width: 480px) {
    width: 25px;
  }
`;

const Kayak = styled.img`
  width: 200px;
  height: auto;

  @media (max-width: 480px) {
    width: 70px;
  }
`;

const ColorBox = styled.div`
  position: absolute;
  width: 100%;
  height: 100px;
  background-color: #6cddff;
`;

const Modal = styled.div``;

const Boogie = styled.div`
  position: absolute;
  top: 0;

  @media (max-width: 480px) {
    width: 50px;
  }
`;

export default function Sports() {
  return (
    <Wrapper>
      <ColorBox></ColorBox>
      <Background src="/img/sports.png" />
      <SportItem>
        <SurfingBoard src="/img/sport_items/surfingboard.png" />
        <DivingMask src="/img/sport_items/divingmask.png" />
        <Kayak src="/img/sport_items/kayak.png" />
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
