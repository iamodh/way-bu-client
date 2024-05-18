import styled from "styled-components";
import ProgramItem from "../../components/program/ProgramItem";
import SportsTag from "../../components/global/SportsTag";
import { useCallback, useState } from "react";
import { useQuery } from "react-query";
import { useForm } from "react-hook-form";
import { getPrograms } from "../../../apis/programs";
import { getSports } from "../../../apis/sports";

const Body = styled.main`
  background-color: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.textColor};
  transition: all ease-in-out 0.1s;
`;

const Wrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 80px;
  gap: 10px;
`;

/* Search */
const SearchContainer = styled.form`
  margin-top: 20px;
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  border-style: none;
  padding-left: 10px;
  padding-right: 70px;
  border-radius: 10px;
  border: 2px solid var(--color-blue-main);

  &:focus {
    outline: none;
    border: 2px solid #1758b9;
  }

  transition: all 0.1s ease-in-out;
`;

const SearchButton = styled.button`
  height: 100%;
  width: 60px;
  position: absolute;
  right: 0;
  border: none;
  background-color: var(--color-blue-main);
  color: white;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  cursor: pointer;
  &:hover {
    background-color: #1758b9;
  }
  transition: all 0.1s ease-in-out;
`;

/* Program */
const ProgramContainer = styled.div`
  width: 80%;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
`;

/* Filters */

const FilterContainer = styled.div`
  width: 80%;
  height: 400px;
  display: flex;
  flex-direction: column;
`;

const SportsFilter = styled.form`
  height: 40px;
  align-items: center;
  gap: 10px;
  display: flex;
  justify-content: flex-end;
  h3 {
    font-weight: bold;
  }
`;

const MainFilter = styled.div`
  height: 50px;
  display: flex;
  gap: 10px;
  padding: 10px 0;
  font-weight: bold;
`;

const DateAndTime = styled.div`
  flex: 2;
  display: flex;

  div {
    &:first-child {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      border-right: 1px solid var(--color-gray);
    }
    &:nth-child(2) {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
`;

const SmallFilterBox = styled.div`
  border: 1px solid var(--color-gray);
  border-bottom: 3px solid var(--color-gray);
  border-right: 3px solid var(--color-gray);
  border-radius: 10px;
  height: 100%;
  flex: 1;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: rgb(241 245 249);
  }
  transition: all 0.1s ease-in-out;
`;

const DetailFilter = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border: 2px solid var(--color-gray);
  border-radius: 12px;
`;

const FilterRow = styled.div`
  height: 40px;
  width: 80%;
  display: flex;
  border-bottom: 1px solid var(--color-gray);
  &:last-child {
    border: none;
  }
`;

const FilterCol = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  &:first-child {
    flex: 1;
    font-weight: bold;
  }

  &:nth-child(2) {
    flex: 2;
  }
  input {
    margin-right: 10px;
  }
`;

export default function Program() {
  /* REACT HOOK FORM */
  /* search 폼 관리 */
  const { register: searchRegister, handleSubmit: handleSearchSubmit } =
    useForm();

  // keyword를 state로 받은 후 useQuery에 매개변수로 전달, api 요청
  const [searchKeyword, setSearchKeyword] = useState("");
  const onSearchSubmit = (data) => {
    setSearchKeyword(data.keyword);
  };

  /* REACT QUERY */
  /* get programs */
  const [tagIds, setTagIds] = useState([]);

  const { isLoading: programsLoading, data: programsData } = useQuery(
    ["programs", searchKeyword],
    () => getPrograms(searchKeyword),
    {
      select: (programsData) =>
        tagIds.length === 0
          ? programsData
          : programsData.filter((program) => {
              return tagIds.includes(program.id);
            }),
    }
  );

  /* get sports */
  const { isLoading: sportsLoading, data: sportsData } = useQuery(
    ["sports"],
    getSports
  );

  // id가 tagIds에 존재하면 제거, 존재하지 않으면 추가
  const hanldeTagClicked = (id) => {
    if (tagIds.includes(id)) {
      const idx = tagIds.indexOf(id);
      setTagIds((prev) => {
        prev.splice(idx, 1);
        return prev;
      });
    } else {
      setTagIds((prev) => [...prev, id]);
    }
  };

  return (
    <Body>
      <Wrapper>
        <SearchContainer onSubmit={handleSearchSubmit(onSearchSubmit)}>
          <Input
            placeholder="키워드를 입력하세요"
            {...searchRegister("keyword")}
          />
          <SearchButton>검색</SearchButton>
        </SearchContainer>
        <FilterContainer>
          <SportsFilter>
            <h3>종목</h3>
            {sportsLoading
              ? "Loading..."
              : sportsData.map((sport) => {
                  return (
                    <SportsTag
                      key={sport.id}
                      color={"#ff4d4d"}
                      text={sport.title}
                      bgcolor={"#ffcccc"}
                      hovercolor={"#ffb8b8"}
                      // handleTagClicked 함수를 onClick props로 전달함
                      onClick={() => hanldeTagClicked(sport.id)}
                    />
                  );
                })}
          </SportsFilter>
          <MainFilter>
            <DateAndTime>
              <SmallFilterBox>날짜</SmallFilterBox>
              <SmallFilterBox>시간</SmallFilterBox>
            </DateAndTime>
            <SmallFilterBox>가격</SmallFilterBox>
            <SmallFilterBox>지역</SmallFilterBox>
          </MainFilter>
          <DetailFilter>
            <FilterRow>
              <FilterCol>
                <span>난이도</span>
              </FilterCol>
              <FilterCol>
                <label htmlFor="high">상</label>
                <input id="high" name="difficulty" type="checkbox" />
                <label htmlFor="mid">중</label>
                <input id="mid" name="difficulty" type="checkbox" />
                <label htmlFor="low">하</label>
                <input id="low" name="difficulty" type="checkbox" />
              </FilterCol>
            </FilterRow>
            <FilterRow>
              <FilterCol>
                <span>예약방식</span>
              </FilterCol>
              <FilterCol>
                <select>
                  <option>Booking</option>
                </select>
              </FilterCol>
            </FilterRow>
            <FilterRow>
              <FilterCol>
                <span>나이대</span>
              </FilterCol>
              <FilterCol>
                <label htmlFor="ten">10대</label>
                <input id="ten" type="checkbox" />
                <label htmlFor="twenty">20대</label>
                <input id="twenty" type="checkbox" />
                <label htmlFor="thirty">30대</label>
                <input id="thirty" type="checkbox" />
                <label htmlFor="elder">40대 이상</label>
                <input id="elder" type="checkbox" />
              </FilterCol>
            </FilterRow>
            <FilterRow>
              <FilterCol>
                <span>인원</span>
              </FilterCol>
              <FilterCol>
                <input style={{ width: "40px" }} type="number" />
              </FilterCol>
            </FilterRow>
            <FilterRow>
              <FilterCol>
                <span>프로그램 기간</span>
              </FilterCol>
              <FilterCol>
                <input type="date" />
                <span style={{ marginRight: "10px" }}>~</span>
                <input type="date" />
              </FilterCol>
            </FilterRow>
          </DetailFilter>
        </FilterContainer>
        <ProgramContainer>
          {programsLoading ? (
            "Loading Programs..."
          ) : (
            <>
              {programsData.length !== 0
                ? programsData.map((program) => (
                    <ProgramItem key={program.id} program={program} />
                  ))
                : "데이터가 존재하지 않습니다."}
            </>
          )}
        </ProgramContainer>
      </Wrapper>
    </Body>
  );
}
