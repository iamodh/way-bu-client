import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 340px;
  border: 2px solid var(--color-gray);
  border-radius: 12px;
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
  a {
    cursor: pointer;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
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

export default function ProgramItem({ program, onBtnClicked }) {
  return (
    <Wrapper>
      <Link to={`/program/${program.id}`}>
        <div
          style={{
            width: "160px",
            height: "160px",
            backgroundColor: "rgb(203 213 225)",
            backgroundImage: `${
              program.thumbnail ? `url(${program.thumbnail})` : ""
            }`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        />
        <h3>{program.program_name}</h3>
        <div>⭐⭐⭐⭐⭐(0)</div>
        <span>{program.price} 원</span>
        <div>
          <span>{program.open_time}</span>
          <span> ~ </span>
          <span>{program.close_time}</span>
        </div>
      </Link>
      <Button
        onClick={() => {
          onBtnClicked(program);
        }}
      >
        비교하기
      </Button>
    </Wrapper>
  );
}
