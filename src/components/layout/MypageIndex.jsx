import styled from "styled-components";
import IndexButton from "./MypageIndexButton";

const ButtonList = styled.div`
  width: 1000px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
  box-sizing: border-box;
  gap: var(--gap-base);
  max-width: 100%;
  @media screen and (max-width: 768px) {
    box-sizing: border-box;
  }
`;
const IndexWrapper = styled.section`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  max-width: 100%;
  text-align: left;
  font-size: var(--m-size);
  color: var(--black);
  font-family: var(--l-bold);
`;

const Index = () => {
  return (
    <IndexWrapper>
      <ButtonList>
        <IndexButton edit="/icon/person.svg" prop="개인정보" />
        <IndexButton edit="/icon/tube.svg" prop="내 프로그램" />
        <IndexButton edit="/icon/edit.svg" prop="후기" />
        <IndexButton edit="/icon/community.svg" prop="커뮤니티" />
        <IndexButton edit="/icon/smile.svg" prop="매칭" />
        <IndexButton edit="/icon/userplus.svg" prop="팔로잉" />
        <IndexButton edit="/icon/message.svg" prop="웨이톡" />
        <IndexButton edit="/icon/setting.svg" prop="설정" />
      </ButtonList>
    </IndexWrapper>
  );
};

export default Index;
