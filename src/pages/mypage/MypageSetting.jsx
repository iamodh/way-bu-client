import styled from "styled-components";
import { Link } from "react-router-dom";

const MypageSettingWrapper = styled.form`
  width: 80%;
  max-width: 700px;
  margin: var(--padding-base) auto;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--gap-21xl);
  text-align: left;
  font-size: var(--font-size-m);
  @media screen and (max-width: 768px) {
    gap: var(--gap-xl);
    font-size: var(--font-size-s);
  }
`;
const Title = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  font-weight: bold;
  font-size: var(--font-size-xl);
  @media screen and (max-width: 768px) {
    font-size: var(--font-size-l);
  }
`;
const TypeList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: var(--padding-5xs);
  width: 100%;
`;
const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const ScopeType = styled.div`
  font-weight: bold;
`;
const ScopeSelect = styled.select`
  font-weight: bold;
  padding: 2px var(--padding-xs);
  border: 1px solid var(--color-blue-main);
  border-radius: var(--br-8xs);
  color: var(--color-blue-main);
  &:hover {
    background-color: var(--color-skyblue-light);
  }
`;
const ScopeOption = styled.option`
  border: 1px solid var(--color-blue-main);
  color: black;
`;
const Hr = styled.div`
  width: 100%;
  height: 0.5px;
  background-color: var(--color-gray);
`;
const StyledLink = styled(Link)`
  display: flex;
  justify-items: flex-start;
`;
const Withdrawal = styled.div`
  font-weight: bold;
  color: var(--color-blue-main);
`;
export default function MypageSetting() {
  return (
    <MypageSettingWrapper>
      <Title>공개범위 설정</Title>
      <TypeList>
        {[
          "나이대/성별",
          "커뮤니티 게시글",
          "참여 프로그램 목록",
          "참여 매칭 목록",
          "친구 목록",
          "쪽지 수신",
        ].map((type) => {
          return (
            <Row>
              <ScopeType>{type}</ScopeType>
              <ScopeSelect>
                <ScopeOption value="">비공개</ScopeOption>
                <ScopeOption value="">전체공개</ScopeOption>
              </ScopeSelect>
            </Row>
          );
        })}
      </TypeList>
      <Hr />
      <Title>일반 설정</Title>
      <TypeList>
        <Row>
          <ScopeType>다크모드</ScopeType>
          <ScopeSelect>
            <option value="">밝게</option>
            <option value="">어둡게</option>
          </ScopeSelect>
        </Row>
        <Row>
          <ScopeType>언어</ScopeType>
          <ScopeSelect>
            <option value="">한국어</option>
            <option value="">영어</option>
          </ScopeSelect>
        </Row>
      </TypeList>
      <StyledLink to="/">
        <Withdrawal>회원탈퇴</Withdrawal>
      </StyledLink>
    </MypageSettingWrapper>
  );
}
