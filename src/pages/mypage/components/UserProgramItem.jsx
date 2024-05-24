import styled from "styled-components";
import Button from "../../../components/ButtonBlue";

const Wrapper = styled.li`
  display: flex;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
  padding: var(--padding-5xs);
  width: 100%;
  /* aspect-ratio: 1.25 / 1;s */
  background: var(--color-skyblue-background, #edf4f7);
  border-radius: var(--br-8xs);
`;
const ProgramName = styled.div`
  font-size: var(--font-size-m);
  font-weight: bold;
`;
const Date = styled.div`
  font-size: var(--font-size-s);
  margin-bottom: var(--padding-xs);
`;

export default function UserProgramItem({ program }) {
  return (
    <Wrapper>
      <ProgramName>{program.program_name}</ProgramName>
      <Date>{"2024.05.22."}</Date>
      <Button text={"후기 쓰기"} />
    </Wrapper>
  );
}
