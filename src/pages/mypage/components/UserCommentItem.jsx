import styled from "styled-components";

const Wrapper = styled.li`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: var(--padding-9xs);
  padding: var(--padding-5xs);
  margin-left: var(--padding-13xl);
  border-radius: var(--br-mini);
  background-color: var(--color-skyblue-background);
`;
const Arrow = styled.div`
  position: absolute;
  /* color: var(--color-gray); */
  left: calc(-1 * var(--padding-xl));
  top: var(--padding-5xs);
`;
const Row = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: var(--padding-5xs);
`;

const CommentTitle = styled.div`
  font-size: var(--font-size-s);
  font-weight: bold;
`;
const Div = styled.div`
  font-size: var(--font-size-s);
`;

export default function UserCommentItem({ comment }) {
  const formatDate = (datestr) => {
    const date = new Date(datestr);
    var options = { year: "numeric", month: "numeric", day: "numeric" };
    return date.toLocaleDateString(options);
  };

  return (
    <Wrapper>
      <Arrow>ㄴ</Arrow>
      <Row>
        {/* <CommentTitle>{comment.user_nickname}</CommentTitle> */}
        <CommentTitle>괴도 김다현</CommentTitle>
        <Div> | </Div>
        {/* <Div>{formatDate(comment.created_at)}</Div> */}
        <Div>2024. 05. 28</Div>
      </Row>
      <Div>댓글 내용입니다.</Div>
    </Wrapper>
  );
}
