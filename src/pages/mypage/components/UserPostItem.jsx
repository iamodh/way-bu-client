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
  align-items: center;
  gap: var(--padding-5xs);
`;
const SportTag = styled.div`
  display: flex;
  font-size: var(--font-size-s);
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  text-align: center;
  border: 1px solid var(--color-blue-main);
  color: var(--color-blue-main);
  padding: var(--padding-9xs) var(--padding-5xs);
  background-color: var(--color-skyblue-light);
  border-radius: var(--br-mini);
`;
const PostTitle = styled.div`
  font-size: var(--font-size-m);
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 40rem;
  @media (max-width: 1280px) {
    max-width: 30rem;
  }

  @media (max-width: 1000px) {
    max-width: 23rem;
  }
  @media (max-width: 768px) {
    max-width: 15rem;
  }
  @media (max-width: 480px) {
    max-width: 10rem;
  }
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
  const formatDate = (datestr) => {
    const date = new Date(datestr);
    var options = { year: "numeric", month: "numeric", day: "numeric" };
    return date.toLocaleDateString(options);
  };

  return (
    <Wrapper>
      <Row>
        <PostTitle>{post.title}</PostTitle>
        <SportTag>{post.post_type}</SportTag>
      </Row>
      <View>조회수 : {post.views}</View>
      <Row>
        <Div>{post.user_nickname}</Div>
        <Div> | </Div>
        <Div>{formatDate(post.created_at)}</Div>
      </Row>
    </Wrapper>
  );
}
