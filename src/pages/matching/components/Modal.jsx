import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import MatchingWrite from './MatchingWrite';

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: var(--gap-base);
`
const Button = styled.button`
  cursor: pointer;
  border: none;
  min-width: 170px;
  padding: var(--padding-base) var(--padding-9xs);
  background-color: var(--color-blue-main);
  color: var(--color-white);
  border-radius: var(--br-3xs);
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: var(--color-navy);
    box-sizing: border-box;
  }

  @media screen and (max-width: 376px) {
    min-width: 150px;
    padding: var(--padding-3xs);
  }
`;

const Div = styled.div`
  position: relative;
  font-size: var(--font-size-ml);
  line-height: 20px;
  font-family: inherit;
  color: inherit;
  text-align: center;
  display: inline-block;
  white-space: nowrap;

  @media screen and (max-width: 376px) {
    font-size: var(--font-size-m);
  }
`;

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: var(--br-3xs);
  height: 700px;
  width: 600px;
  text-align: center;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: var(--color-dark);
  &:hover {
    color: var(--color-navy);
  }
`;

const StyledLink = styled(Link)`
  color: white;
  cursor: pointer;
`


const Modal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <ButtonWrapper>
        <Button><StyledLink to = {"/mypage"}><Div>내 매칭 보러가기</Div></StyledLink></Button>
        <Button onClick={(openModal)}><Div>매칭 만들기</Div></Button>
      </ButtonWrapper>
      
      {isOpen && (
        <ModalWrapper>
          <ModalContent onClick={e => e.stopPropagation()}>
            <CloseButton onClick={closeModal}>&times;</CloseButton>
            <MatchingWrite />
          </ModalContent>
        </ModalWrapper>
      )}
    </>
  );
};

export default Modal;
