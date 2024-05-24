import styled from "styled-components";

const Wrapper = styled.li`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-wrap: wrap;
  padding: var(--padding-xs);
  gap: var(--padding-5xs);
  width: 100%;
  background: var(--color-skyblue-background, #edf4f7);
  border-radius: var(--br-8xs);
`;
const ProgramName = styled.div`
  font-size: var(--font-size-m);
  font-weight: bold;
  margin-right: var(--padding-5xs);
`;
const Row = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;
const StarRating = styled.div`
  display: flex;
  justify-content: center;
`;
const Star = styled.img`
  width: var(--font-size-m);
  height: var(--font-size-m);
`;
const Date = styled.div`
  font-size: var(--font-size-s);
`;
const Contents = styled.div`
  width: 100%;
  min-height: 40px;
  background-color: white;
  border-radius: var(--br-8xs);
`;

export default function UserReviewItem() {
  return (
    <Wrapper>
      <Row>
        <ProgramName>프로그램 제목</ProgramName>
        <StarRating>
          <Star src="/icon/star-fill.svg" />
          <Star src="/icon/star-empty.svg" />
        </StarRating>
        <Date>{"2024.05.22."}</Date>
      </Row>
      <Row>
        <Contents>{"사용자가 입력한 후기 내용이 들어갈 예정입니다."}</Contents>
      </Row>
    </Wrapper>
  );
}
