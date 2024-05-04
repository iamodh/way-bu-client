import styled from "styled-components";
import Profile from "./MypageProfile";
import Index from "./MypageIndex";
// import Menubar from "./components/Menubar";

const MypageUpdateWapper = styled.div`
  /* width: 100%;
  position: relative;
  background-color: var(--color-white);
  overflow: hidden;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0px;
  box-sizing: border-box;
  font-family: "Pretendard-Regular";
  line-height: normal;
  letter-spacing: normal; */
  display: flex;
  flex-direction: column;
  gap: var(--gap-13xl);
  @media screen and (max-width: 768px) {
    gap: var(--gap-base);
  }
`;

const MypageLayout = () => {
  // Menubar 완성 후 Profile 위에 추가 예정
  return (
    <>
      <MypageUpdateWapper>
        <Profile />
        <Index />
      </MypageUpdateWapper>
    </>
  );
};

export default MypageLayout;
