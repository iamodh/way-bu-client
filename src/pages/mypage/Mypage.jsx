import styled from "styled-components";
import MypageLayout from "../../components/layout/MypageLayout";
import MypageUpdate from "./components/MypageUpdate";

const Contents = styled.form`
  width: 1000px;
  display: flex;
  flex-direction: column;
  padding: var(--padding-45xl) var(--padding-xl);

  /* reset.css를 global style에 사용 */
  margin: 0;
  box-sizing: border-box;

  /* 삭제해도 변화가 없음 */
  overflow: hidden;
  flex-shrink: 0;
  max-width: 100%;
  gap: var(--gap-xl);
  align-items: center;
  justify-content: center;

  /* mobile 버전 필요 */
  @media screen and (max-width: 768px) {
    gap: var(--gap-xl);
    padding-top: var(--padding-13xl);
    padding-bottom: var(--padding-13xl);
    box-sizing: border-box;
  }

  background-color: teal;
`;

const ContentsArea = styled.footer`
  display: flex;
  justify-content: center;
  max-width: 1000px;
  margin: 0 auto;

  /* 사려저도 변화가 없는 코드 */
  flex-direction: row;
  align-items: flex-start;
  align-self: stretch;
`;

const Mypage = () => {
  return (
    <>
      <MypageLayout />
      <ContentsArea>
        <Contents>
          <MypageUpdate />
        </Contents>
      </ContentsArea>
    </>
  );
};

export default Mypage;
