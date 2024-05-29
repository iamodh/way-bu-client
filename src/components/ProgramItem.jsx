import styled from "styled-components";
import ButtonBlue from "./ButtonBlue";
import Button from "./global/Button";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
  padding: var(--padding-base);
  background-color: var(--color-white);
  border: 1px solid var(--color-gray);
  border-radius: var(--br-mini);
`;
const H3 = styled.h3`
  font-size: var(--font-size-l);
  font-weight: 900;
`;
const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: var(--padding-base) 0;
`;
const Span = styled.span`
  font-size: var(--font-size-m);
  line-height: 1.5rem;
`;
const Img = styled.img`
  width: 100%;
`;

export default function ProgramItem({ program }) {
  return (
    <Wrapper>
      <Img src="/img/ellipse-13@2x.png" alt="image" />
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
      <Button text={"비교하기"} width={"100%"}></Button>
    </Wrapper>
  );
}
