import styled from "styled-components";
import SportsTag from "../../../components/SportTag";
import { useState } from "react";
import { useQuery } from "react-query";
import { getSports } from "../../../../apis/sports";


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
    const { isLoading: sportsLoading, data: sportsData } = useQuery(
    ["sports"],
    getSports
  );

  const [clickedTags, setClickedTags] = useState([]);

  // 스포츠 태그 클릭 시 clickedTags 배열에서 해당 id 토글
  const hanldeTagClicked = (id) => {
    if (clickedTags.includes(id)) {
      setClickedTags((prev) => prev.filter((it) => it !== id));
    } else {
      setClickedTags((prev) => [...prev, id]);
    }
  };
  return (
    <SportsFilter>
      {sportsLoading
        ? "Loading..."
        : sportsData.map((sport) => {
            return (
              <SportsTag
                themeColor={sport.theme_color}
                key={sport.id}
                color={"#ff4d4d"}
                text={sport.title}
                bgColor={"#ffcccc"}
                hoverColor={"#ffb8b8"}
                // handleTagClicked 함수를 onClick props로 전달
                onClick={() => hanldeTagClicked(sport.id)}
                hasClicked={clickedTags.includes(sport.id)}
              />
            );
          })}
    </SportsFilter>
  );
};

export default Sports;
