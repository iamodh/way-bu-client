import styled from "styled-components";
import ButtonBlue from "./ButtonBlue";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: ${(props) => props.width};
  height: 450px;
  padding: var(--padding-base);
  background-color: var(--color-white);
  border: 1px solid var(--color-gray);
  border-radius: var(--br-mini);
`;
const H3 = styled.h3`
  font-size: var(--font-size-xl);
  font-weight: 900;
`;
const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: var(--padding-base) 0;
`;
const Span = styled.span`
  font-size: var(--font-size-l);
  line-height: 1.5rem;
`;

export default function ProgramItem({ program, width }) {
  return (
    <Wrapper width={width}>
      <img src="/img/ellipse-13@2x.png" alt="image" />
      <TextBox>
        <H3>{program.program_name}</H3>
        <div>
          {"⭐".repeat(program.business_id)} ({program.business_id})
        </div>
        <Span>{program.price}</Span>
        <Span>
          {program.open_time} - {program.close_time}
        </Span>
      </TextBox>
      <ButtonBlue text={"비교하기"}></ButtonBlue>
    </Wrapper>
  );
}
