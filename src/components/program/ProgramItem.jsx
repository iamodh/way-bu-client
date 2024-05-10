import styled from "styled-components";

const Wrapper = styled.div`
  height: 340px;
  border: 2px solid var(--color-gray);
  border-radius: 12px;
  cursor: pointer;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  &:hover {
    background-color: rgb(241 245 249);
  }
  transition: all 0.2s ease-in-out;
  h3 {
    font-size: var(--font-size-l);
    font-weight: bold;
  }
`;

const Button = styled.button`
  width: 150px;
  font-size: var(--font-size-m);
  color: white;
  height: 40px;
  background-color: ${(props) => props.theme.buttonColor};
  &:hover {
    background-color: #1758b9;
  }
  transition: all 0.2s ease-in-out;
  border-radius: 12px;
  border: none;
  cursor: pointer;
`;

export default function ProgramItem({ program }) {
  return (
    <Wrapper>
      <div
        style={{
          width: "150px",
          height: "150px",
          backgroundColor: "rgb(203 213 225)",
        }}
      />
      <h3>{program.program_name}</h3>
      <div>⭐⭐⭐⭐⭐({program.numOfRates})</div>
      <span>{program.price}</span>
      <div>
        <span>{program.available[0]}</span>
        <span> ~ </span>
        <span>{program.available[1]}</span>
      </div>
      <Button>비교하기</Button>
    </Wrapper>
  );
}
