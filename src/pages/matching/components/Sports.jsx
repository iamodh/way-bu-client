import styled from "styled-components";
import SportsTag from "../../../global/SportsTag";

const SportsFilter = styled.div`
  padding: var(--padding-13xl);
  padding-bottom: 0px;
  height: 40px;
  align-items: center;
  gap: 10px;
  display: flex;
  justify-content: flex-end;
  h3 {
    font-weight: bold;
  }
`;

const Sports = () => {
  return (
    <SportsFilter>
          {["#서핑", "#스쿠버다이빙", "#패들보드", "#잠수", "#낚시"].map((e, i) => {
            return (
              <SportsTag
                key={i}
                color={"#ff4d4d"}
                text={e}
                bgColor={"#ffcccc"}
                hoverColor={"#ffb8b8"}
                />
            );
          })}
        </SportsFilter>
  );
};

export default Sports;
