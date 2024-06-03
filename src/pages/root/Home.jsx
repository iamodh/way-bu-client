import { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";

const Wrapper = styled.div`
  overflow-y: hidden;
`;

const Header = styled.h1`
  font-size: 64px;
  font-weight: 700;
  color: var(--color-blue-main);
`;

const Outer = styled.div`
  height: 100vh;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Inner = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  &.first {
    background-color: var(--color-white);
  }
  &.second {
    background-color: var(--color-blue-main);
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 32px;
  }
  &.third {
    background-color: var(--color-sand-main);
  }
`;

const Divider = styled.div`
  width: 100%;
  height: 5px;

  &.first {
    background-color: var(--color-blue-main);
  }
  &.second {
    background-color: var(--color-sand-main);
  }
`;

const Dot = styled.div`
  width: 10px;
  height: 10px;
  border: 1px solid var(--color-navy);
  border-radius: 50%;
  background-color: ${(props) =>
    props.$currentPage === props.$num ? "var(--color-navy)" : "transparent"};
  transition-duration: 1000;
  transition: background-color 0.5s;
`;

const DotsFixed = styled.div`
  position: fixed;
  top: 50%;
  right: 50px;
  transform: translateY(-50%);
`;

const Dots = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 20px;
  height: 100px;
`;

/* Seach */

/* Intro */

const IntroTitle = styled.h3`
  font-size: var(--font-size-xxl);
  font-weight: 700;
`;

const IntroBox = styled.div`
  display: flex;
  gap: 32px;
`;

const IntroItem = styled.div`
  width: 200px;
  height: 250px;
  background-color: rgba(250, 250, 244, 1);
  border: 2px solid rgba(175, 211, 131, 1);
  border-radius: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

/* Beaches */

const BeachIcon = styled.div``;

export default function Home() {
  // useRef를 사용해 Outer의 DOM (current)에 접근
  const outerDivRef = useRef();

  const [currentPage, setCurrentPage] = useState(1);

  // 마운트 시 Outer에 wheel 핸들러를 추가, 언마운트 시 삭제
  useEffect(() => {
    const DIVIDER_HEIGHT = 5;
    const wheelHandler = (e) => {
      e.preventDefault();

      const { deltaY } = e; // 스크롤 이동 방향
      const { scrollTop } = outerDivRef.current; // 스크롤 위쪽 끝
      const pageHeight = window.innerHeight; // 화면 세로 길이 (100vh)

      // scroll down
      if (deltaY > 0) {
        if (scrollTop >= 0 && scrollTop < pageHeight) {
          // 현재 1페이지
          outerDivRef.current.scrollTo({
            top: pageHeight + DIVIDER_HEIGHT,
            left: 0,
            behavior: "smooth",
          });
          setCurrentPage(2);
        } else if (scrollTop >= 0 && scrollTop < pageHeight * 2) {
          //현재 2페이지
          outerDivRef.current.scrollTo({
            top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
            left: 0,
            behavior: "smooth",
          });
          setCurrentPage(3);
        } else {
          // 현재 3페이지

          outerDivRef.current.scrollTo({
            top: pageHeight * 2 + DIVIDER_HEIGHT * 2, // 페이지 세로 맨 끝
            left: 0,
            behavior: "smooth",
          });
        }
      }
      // scroll up
      else {
        // 스크롤 올릴 때
        if (scrollTop >= 0 && scrollTop < pageHeight) {
          //현재 1페이지

          outerDivRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
          //현재 2페이지

          outerDivRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
          setCurrentPage(1);
        } else {
          // 현재 3페이지

          outerDivRef.current.scrollTo({
            top: pageHeight + DIVIDER_HEIGHT,
            left: 0,
            behavior: "smooth",
          });
          setCurrentPage(2);
        }
      }
    };
    const outerDivRefCurrent = outerDivRef.current;
    outerDivRefCurrent.addEventListener("wheel", wheelHandler);
    return () => {
      outerDivRefCurrent.removeEventListener("wheel", wheelHandler);
    };
  }, []);

  return (
    <Wrapper>
      <Outer ref={outerDivRef}>
        <DotsFixed>
          <Dots>
            <Dot $num={1} $currentPage={currentPage} />
            <Dot $num={2} $currentPage={currentPage} />
            <Dot $num={3} $currentPage={currentPage} />
          </Dots>
        </DotsFixed>
        <Inner className="first">
          <Header>WAYBU</Header>
        </Inner>
        <Divider className="first" />
        <Inner className="second">
          <IntroTitle>웨이부만의 기능 알아보기</IntroTitle>
          <IntroBox>
            <IntroItem>스포츠</IntroItem>
            <IntroItem>매칭</IntroItem>
            <IntroItem>비교하기</IntroItem>
          </IntroBox>
        </Inner>
        <Divider className="second" />
        <Inner className="third">
          <BeachIcon>
            <img src="img/beaches/songjung.png" />
          </BeachIcon>
          <BeachIcon>
            <img src="img/beaches/ilgwang.png" />
          </BeachIcon>
          <BeachIcon>
            <img src="img/beaches/imrang.png" />
          </BeachIcon>
          <BeachIcon>
            <img src="img/beaches/dadaepo.png" />
          </BeachIcon>
          <BeachIcon>
            <img src="img/beaches/songdo.png" />
          </BeachIcon>
          <BeachIcon>
            <img src="img/beaches/haeundae.png" />
          </BeachIcon>
          <BeachIcon>
            <img src="img/beaches/gwanganli.png" />
          </BeachIcon>
        </Inner>
      </Outer>
    </Wrapper>
  );
}
