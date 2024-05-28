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
  background: var(--color-skyblue-background, #edf4f7);
  border-radius: var(--br-8xs);
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
const Date = styled(Div)`
  position: absolute;
  /* color: var(--color-gray); */
  right: var(--padding-5xs);
  top: var(--padding-5xs);
`;
const Row2 = styled(Row)`
  background-color: var(--color-white);
  border-radius: var(--br-8xs);
  padding: var(--padding-5xs);
`;
const Profile = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
`;
const ProfileImg = styled.img`
  margin: 0 auto;
  display: flex;
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 50%;
`;
const ProfileName = styled(Div)`
  text-align: center;
`;

export default function UserDoneMatchingItem({ matching }) {
  const memberList = matching.members;
  return (
    <Wrapper>
      <Row>
        <PostTitle>{matching.title}</PostTitle>
        <SportTag>{matching.sport}</SportTag>
      </Row>
      <Date>{matching.date}</Date>
      <Row2>
        <Div>참가자</Div>
        {memberList.map((member) => {
          return (
            <Profile>
              <ProfileImg src={member.img} />
              <ProfileName>{member.name}</ProfileName>
            </Profile>
          );
        })}
      </Row2>
    </Wrapper>
  );
}
