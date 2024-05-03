import styled from "styled-components";
import MypageLayout from "../../components/layout/MypageLayout";
import MypageUpdate from "./components/MypageUpdate";

const Contents = styled.form`
  margin: 0;
  width: 1000px;
  overflow: hidden;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--padding-45xl) var(--padding-xl);
  box-sizing: border-box;
  gap: var(--gap-xl);
  max-width: 100%;
  @media screen and (max-width: 768px) {
    gap: var(--gap-xl);
    padding-top: var(--padding-13xl);
    padding-bottom: var(--padding-13xl);
    box-sizing: border-box;
  }
`;
const ContentsArea = styled.footer`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  max-width: 100%;
`;

const Mypage = () => {
  return (
    <>
      <MypageLayout />
      <ContentsArea>
      <Contents>
        <MypageUpdate/>
      </Contents>
      </ContentsArea>

    </>
  );
};

export default Mypage;