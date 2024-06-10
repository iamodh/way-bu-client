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
  background-color: var(--color-sand-main);
  position: relative;
  z-index: -100;
`;

export const Slides = styled.div``;

export const Slide = styled.div`
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

export const SportObject = styled.div`
  position: absolute;
  top: ${(props) => props.$top};
  left: ${(props) => props.$left};
  transition: all 0.1s ease-in;
  cursor: pointer;
`;

export const Boogie = styled(motion.img)`
  position: absolute;
  top: 0;
  left: 0%;
  cursor: pointer;
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
