import styled from "styled-components";

const Wrapper = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  flex-wrap: wrap;
  padding: var(--padding-13xl) var(--padding-5xs);
  width: 100%;
  background: var(--color-skyblue-background, #edf4f7);
  border-radius: var(--br-8xs);
  @media screen and (max-width: 768px) {
    padding: var(--padding-base) var(--padding-5xs);
  }
`;
const ProgramName = styled.div`
  font-size: var(--font-size-l);
  font-weight: bold;
  padding: var(--padding-9xs);
  @media screen and (max-width: 768px) {
    padding: 0;
    font-size: var(--font-size-m);
  }
`;
const Date = styled.div`
  font-size: var(--font-size-s);
  margin-bottom: var(--padding-xl);

  @media screen and (max-width: 768px) {
    margin-bottom: var(--padding-xs);
  }
`;

const Button = styled.button`
  cursor: pointer;
  border: none;
  width: 120px;
  font-size: var(--font-size-m);
  padding: var(--padding-5xs) var(--padding-base);
  background-color: var(--color-blue-main);
  color: var(--color-white);
  border-radius: var(--br-3xs);
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: var(--color-blue-dark);
    box-sizing: border-box;
  }
  @media screen and (max-width: 768px) {
    padding: var(--padding-5xs) var(--padding-xs);
  }
`;

export default function UserProgramItem({ program }) {
  return (
    <Wrapper>
      \ <ProgramName>{program.program_name}</ProgramName>
      <Date>{"2024.05.22."}</Date>
      <Button>후기 작성하기</Button>
    </Wrapper>
  );
}
