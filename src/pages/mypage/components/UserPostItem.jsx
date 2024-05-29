import styled from "styled-components";

const Wrapper = styled.li`
  display: flex;
  position: relative;
  align-items: flex-start;
  flex-direction: column;
  flex-wrap: wrap;
  gap: var(--padding-9xs);
  padding: var(--padding-5xs);
  width: 100%;
  border-top: 1px solid var(--color-gray);
`;
const Row = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: var(--padding-5xs);
`;
const SportTag = styled.div`
  display: flex;
  font-size: var(--font-size-m);
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  border: 1px solid var(--color-blue-main);
  color: var(--color-blue-main);
  padding: var(--padding-9xs) var(--padding-5xs);
  background-color: var(--color-skyblue-light);
  border-radius: var(--br-mini);
  @media screen and (max-width: 768px) {
    padding: var(--padding-9xs);
    font-size: var(--font-size-s);
  }
`;
const PostTitle = styled.div`
  font-size: var(--font-size-m);
  font-weight: bold;
`;
const Div = styled.div`
  font-size: var(--font-size-s);
`;
const View = styled(Div)`
  position: absolute;
  /* color: var(--color-gray); */
  right: var(--padding-5xs);
  top: var(--padding-5xs);
`;

export default function UserProgramItem({ post }) {
  return (
    <Wrapper>
      <Row>
        <PostTitle>{post.title}</PostTitle>
        <SportTag>{post.sport}</SportTag>
      </Row>
      <View>조회수 : {post.view}</View>
      <Row>
        <Div>{post.writer}</Div>
        <Div> | </Div>
        <Div>{post.date}</Div>
      </Row>
    </Wrapper>
  );
}
