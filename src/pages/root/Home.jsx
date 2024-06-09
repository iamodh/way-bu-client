import { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";

const AnimationWrapper = styled.div`
  overflow: hidden;
  position: relative;
  margin: 0 auto;
  max-width: 3200px;
  width: 100%;
  height: 100%;
  /* background: #000; */
`;

const WaveBox = styled.div`
  position: absolute;
  bottom: 0px;
  display: block;
  margin: auto;
  width: 100%;
  height: 350px;
  overflow: hidden;
`;

const WaveBox2 = styled.div`
  position: absolute;
  bottom: 0px;
  display: block;
  margin: auto;
  width: 100%;
  height: 250px;
  overflow: hidden;
  /* background-color: tomato; */
  z-index: 1;
`;

const waveBackAnimation = keyframes`
  0% { transform: translateX(-8400px); }
  100% { transform: translateX(-1600px); }
`;

const WaveBack = styled.svg`
  width: 10000px; /* 4 times the width of the viewBox to allow smooth animation */
  height: 100%;
  position: absolute;
  bottom: 0px;
  animation: ${waveBackAnimation} 8s cubic-bezier(0.36, 0.45, 0.63, 0.53);
`;

const AnimatedWaveBack = styled.path`
  fill: #6fcbf4;
`;

const waveFrontAnimation = keyframes`
  0% { transform: translateX(-10000px); }
  100% { transform: translateX(-1600px); }
`;

const WaveFront = styled.svg`
  width: 12500px; /* 4 times the width of the viewBox to allow smooth animation */
  height: 100%;
  position: absolute;
  bottom: 0px;
  animation: ${waveFrontAnimation} 10s cubic-bezier(0.36, 0.45, 0.63, 0.53);
`;

const AnimatedWaveFront = styled.path`
  fill: #a1dbf1;
`;

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
          <AnimationWrapper>
            <WaveBox>
              <WaveBack
                viewBox="0 0 10000 350"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <AnimatedWaveBack
                  id="back"
                  d="M8240.38 149.988C8426.69 148.953 8719.37 109.637 8945.83 79.2181L8945.87 79.2121L8945.96 79.2006C8983.54 74.1524 9019.3 69.3495 9052.44 65.0076C9289.06 34.0084 9708.44 0.00935114 9861.84 0.00936568C9891.2 0.00936847 9927.52 0.00937032 9969.3 0.465326C9980.32 0.187571 9990.57 0.0333717 10000 0.00936568V350H0V0.00936568C196.366 -0.490719 484.661 19.0089 815.927 65.0076C828.238 66.7171 840.462 68.4161 852.6 70.1032L852.935 70.1498C1167.27 113.841 1424 149.524 1631.85 150.005C1653.41 150.055 1676.49 149.557 1700.83 148.59C1772.27 144.023 1883.48 133.554 2054.5 111.006C2460.29 57.5078 3015.12 0.50945 3211.49 0.00936568C3222.99 -0.0199333 3234.81 0.0194179 3246.94 0.128726C3252.83 0.0496552 3258.43 0.00936518 3263.71 0.00936568C3296.64 0.00936881 3338.32 0.00937067 3386.64 0.652577V0.00936568C3583.01 -0.490719 3871.3 19.0089 4202.57 65.0076C4214.88 66.7171 4227.1 68.4161 4239.24 70.1032L4239.58 70.1498C4510.36 107.787 4738.4 139.482 4929.26 147.85C5113.09 139.142 5361.4 105.787 5559.19 79.2181L5559.23 79.2121L5559.32 79.2006C5596.9 74.1524 5632.66 69.3495 5665.8 65.0076C5902.42 34.0084 6321.8 0.00935114 6475.2 0.00936568C6502.02 0.00936823 6534.66 0.00936999 6571.96 0.357122C6581.27 0.147383 6590.01 0.0300493 6598.13 0.00936568C6603.09 -0.00326146 6608.1 -0.00313759 6613.18 0.00984203C6613.24 0.00967793 6613.3 0.00951915 6613.36 0.00936568C6621.97 -0.0125616 6630.76 0.00396196 6639.72 0.0594843C6643.39 0.0262076 6646.93 0.00936536 6650.35 0.00936568C6803.74 0.00938023 7146.98 0.00936865 7466.28 65.0076C7499.8 71.8316 7535.27 78.4351 7571.93 84.7892C7836.4 121.223 8057.25 149.089 8240.38 149.988Z"
                ></AnimatedWaveBack>
              </WaveBack>
            </WaveBox>
            <WaveBox2>
              <WaveFront
                viewBox="0 0 12500 250"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <AnimatedWaveFront
                  id="front"
                  d="M7848.15 34.7264C8032.78 -0.598085 8342.04 -23.5135 8614.57 39.9377C8786.58 79.9877 9017.17 85.9695 9191.62 73.4282C9236.04 66.8878 9276.72 58.149 9319.41 48.9794L9320.9 48.66C9324.48 47.8906 9328.08 47.1182 9331.69 46.344C9341.2 44.307 9350.8 42.2513 9360.54 40.1949C9541.05 2.08136 9867.16 -26.3294 10152.9 40.1949C10315.1 77.9629 10529.4 85.4344 10699.6 75.6458C10757.7 68.5409 10808.7 57.6112 10862.5 46.0868L10862.5 46.0828L10862.6 46.0641C10872.1 44.0345 10881.7 41.9865 10891.4 39.9378C11071.9 1.82419 11398 -26.5866 11683.7 39.9377C11969.4 106.462 12416.8 78.9914 12500 28.7658V246.778H10969.2V247.036L9009 247.036V246.778H7900.01V247.036H7848.15V249.743H6317.32V250L4357.15 250V249.743H3248.17V250L0 250V36.64C0 36.64 468.129 -32.8117 897.559 43.1595C1303.82 115.032 1443.92 85.0268 1610.69 49.3084C1620.2 47.2714 1629.8 45.2157 1639.54 43.1594C1820.05 5.04578 2146.16 -23.365 2431.89 43.1593C2594.1 80.9273 2808.4 88.3989 2978.6 78.6103C3036.69 71.5053 3087.72 60.5756 3141.53 49.0512L3141.55 49.0472C3151.05 47.0115 3160.64 44.9572 3170.38 42.9022C3350.89 4.78861 3677 -23.6222 3962.72 42.9021C4134.74 82.9521 4365.33 88.934 4539.78 76.3926C4584.19 69.8523 4624.87 61.1134 4667.56 51.9439L4667.79 51.8948C4671.79 51.036 4675.81 50.1734 4679.84 49.3085C4689.35 47.2714 4698.95 45.2158 4708.69 43.1594C4889.2 5.04578 5215.31 -23.365 5501.04 43.1593C5663.25 80.9273 5877.56 88.3989 6047.75 78.6103C6105.84 71.5055 6156.87 60.5762 6210.68 49.052L6210.68 49.0512L6210.7 49.0472L6210.79 49.0286C6220.26 46.9989 6229.83 44.9509 6239.53 42.9022C6322.58 25.3673 6436.44 9.88609 6563.01 4.75861C6724.03 -5.52729 6911.24 0.0335671 7083.73 40.1949C7234.1 75.2039 7429.22 84.1811 7592.48 77.5097C7612.94 76.2007 7632.71 74.64 7651.61 72.8512C7701.15 65.8385 7746.19 56.1917 7793.37 46.0876L7793.38 46.0868L7793.39 46.0828C7802.9 44.0471 7812.49 41.9928 7822.22 39.9378C7827.68 38.7847 7833.28 37.6405 7839 36.5076C7842.42 34.9403 7845.47 33.3471 7848.15 31.7302V34.7264Z"
                ></AnimatedWaveFront>
              </WaveFront>
            </WaveBox2>
          </AnimationWrapper>
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
