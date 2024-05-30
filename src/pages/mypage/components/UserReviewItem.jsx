import styled from "styled-components";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-wrap: wrap;
  padding: var(--padding-xs);
  margin: var(--padding-5xs);
  background: var(--color-skyblue-background, #edf4f7);
  border-radius: var(--br-8xs);
`;
const ReviewName = styled.div`
  font-size: var(--font-size-m);
  font-weight: bold;
  margin-right: var(--padding-5xs);
`;
const Row = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  position: relative;
`;
const StarContainer = styled.div`
  display: flex;
  gap: 2px;
  align-items: center;
  svg {
    @media only screen and (max-width: 376px) {
      width: 14px;
    }
  }
  span {
    font-size: 16px;
    height: 100%;
    @media only screen and (max-width: 376px) {
      font-size: 14px;
    }
  }
`;
const Star = styled.img`
  width: var(--font-size-m);
  height: var(--font-size-m);
`;
const WrittenDate = styled.div`
  font-size: var(--font-size-s);
  margin-left: var(--padding-5xs);
  position: absolute;
  /* color: var(--color-gray); */
  right: var(--padding-5xs);
  top: var(--padding-5xs);
`;
const Contents = styled.div`
  width: 100%;
  min-height: 40px;
  background-color: white;
  border-radius: var(--br-8xs);
  padding: var(--padding-9xs);
`;

export default function UserReviewItem({ review }) {
  /* 날짜 형식 함수 */
  const formatDate = (datestr) => {
    const date = new Date(datestr);
    var options = { year: "numeric", month: "numeric", day: "numeric" };
    return date.toLocaleDateString(options);
  };

  /* 별점 반복 함수 */
  const repeat_fill = Array(Math.round(review.score)).fill(null);
  const repeat_empty = Array(5 - Math.round(review.score)).fill(null);

  return (
    <Wrapper>
      <Row>
        <Link to={"/program/" + review.program_id}>
          <ReviewName>{review.PROGRAM.program_name}</ReviewName>
        </Link>
        <StarContainer>
          {repeat_fill.map((_, i) => (
            <Star key={i} src="/icon/star-fill.svg" />
          ))}
          {repeat_empty.map((_, i) => (
            <Star key={i} src="/icon/star-empty.svg" />
          ))}
        </StarContainer>
        <WrittenDate>{formatDate(review.created_at)}</WrittenDate>
      </Row>
      <Row>
        <Contents>{review.content}</Contents>
      </Row>
    </Wrapper>
  );
}
