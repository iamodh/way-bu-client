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

  const [selectedTags, setSelectedTags] = useState([]);

  // 스포츠 태그 클릭 시 selectedTags 배열에 추가 또는 제거
  const handleTagClick = (id) => {
    setSelectedTags((prevSelectedTags) =>
      prevSelectedTags.includes(id)
        ? prevSelectedTags.filter((tagId) => tagId !== id)
        : [...prevSelectedTags, id]
    );
  };

  return (
    <SportsFilter>
      {sportsLoading
        ? "Loading..."
        : sportsData.map((sport) => {
            console.log(sport);

            return (
              <SportsTag
                key={sport.id}
                sport={sport}
                onClick={() => handleTagClick(sport.id)}
                hasClicked={selectedTags.includes(sport.id)}
              />
            );
          })}
    </SportsFilter>
  );
};

export default Sports;
