import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";

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

export const Wrapper = styled.div`
  position: relative;
  height: 100vh;
`;

export const Background = styled.img`
  width: 100%;
  height: 100%;
  background-image: url("/img/sports2.jpeg");
  background-size: cover;
  background-position: center;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -100;
`;

export const Slides = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const Slide = styled.div`
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

export const SportObject = styled.div`
  position: absolute;
  top: ${(props) => props.$top};
  left: ${(props) => props.$left};
  transition: all 0.1s ease-in;
  cursor: pointer;
`;

export const DivingMask = styled.img`
  width: 80px;
  padding-top: 150px;
  transform: rotate(30deg);

  @media (max-width: 480px) {
    width: 30px;
  }
`;

export const SurfingBoard = styled.img`
  width: 130px;
  padding-top: 80px;

  @media (max-width: 480px) {
    width: 70px;
  }
`;

export const Kayak = styled.img`
  width: 160px;
  padding-top: 30px;

  @media (max-width: 480px) {
    width: 50px;
    /* padding-top: 10px; */
  }
`;

export const Yacht = styled.img`
  width: 180px;

  @media (max-width: 480px) {
    width: 50px;
  }
`;

export const Boogie = styled(motion.img)`
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

export const SportsWrapper = styled.div`
  position: absolute;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  top: 1rem;
`;

export const SportsContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 1080px;
  width: 100%;
  padding: 3rem 10%;
  background-color: var(--color-skyblue-background);
  overflow: hidden;
  animation: ${expand} 0.5s ease-in-out;
`;

export const SportsTitle = styled.div`
  font-size: var(--font-size-xl);
  font-weight: 700;
  margin-bottom: 2rem;
`;

export const InfoBox = styled.div`
  width: 100%;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  padding-bottom: 1rem;
  background-color: rgba(0, 0, 0, 0.03);
  padding: 1.5rem;
  border-radius: 1rem;
  @media (min-width: 768px) {
    font-size: var(--font-size-l);
    margin-bottom: 2rem;
  }
`;

export const InfoName = styled.div`
  font-weight: 600;
  margin-bottom: 1rem;
`;

export const InfoImage = styled.img`
  width: 50%;
  margin-bottom: 2rem;
  border-radius: 0.5rem;
`;

export const InfoContent = styled.div`
  margin-left: 1rem;
`;

export const SportsBtn = styled.button`
  position: absolute;
  top: 3rem;
  right: 3rem;
  background-color: rgba(0, 0, 0, 0);
  font-size: var(--font-size-l);
  border: none;
  cursor: pointer;
`;

export const ModalCover = styled.div`
  z-index: 99;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;
