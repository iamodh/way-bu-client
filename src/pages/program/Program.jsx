import styled from "styled-components";
import ProgramItem from "../../components/program/ProgramItem";
import SportsTag from "../../components/global/SportsTag";
import { useState } from "react";
import { useQuery } from "react-query";
import { useForm } from "react-hook-form";
import { getPrograms } from "../../../apis/programs";
import { getSports } from "../../../apis/sports";
import { Link } from "react-router-dom";
import IndexButton from "../../components/ButtonBlue";

const Body = styled.main`
  background-color: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.textColor};
  transition: all ease-in-out 0.1s;
`;

const Wrapper = styled.div`
  max-width: 850px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 80px;
  gap: 10px;
  position: relative;
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

const FilterContainer = styled.form`
  width: 80%;
  height: 340px;
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
  padding-bottom: 10px;
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
  gap: 4px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: rgb(241 245 249);
  }
  transition: all 0.1s ease-in-out;
  input {
    width: 100px;
  }
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
  position: relative;
`;

const FilterRow = styled.div`
  height: 40px;
  width: 90%;
  display: flex;
`;

const FilterCol = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  &:first-child {
    flex: 0.6;
    font-weight: bold;
    display: flex;
    justify-content: flex-start;
  }

  &:nth-child(2) {
    flex: 2;
    display: flex;
    justify-content: flex-start;
  }

  input {
    margin-right: 10px;
  }
`;

const FilterSubmit = styled.div`
  display: flex;
  gap: 10px;
  position: absolute;
  right: 50px;
  bottom: 30px;
`;

const ResetBtn = styled.button`
  cursor: pointer;
`;

/* Compare */
const FixedBox = styled.div`
  position: fixed;
`;

const CompareBox = styled.div`
  width: 300px;
  background-color: var(--color-skyblue-main);
  position: absolute;
  top: 20px;
  right: -680px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding-bottom: 20px;
`;

const CompareTitle = styled.h3`
  font-size: var(--font-size-l);
  margin-top: 20px;
  font-weight: bold;
  span {
    color: var(--color-blue-main);
  }
`;

const CompareProgramBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const CompareProgram = styled.div`
  width: 250px;
  height: 100px;
  background-color: var(--color-white);
  border-radius: 20px;
  position: relative;
`;

const CompareProgramContents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  margin-left: 20px;
  gap: 4px;
`;

const CompareProgramTitle = styled.h4`
  font-size: var(--font-size-m);
  font-weight: bold;
`;

const CompareProgramRates = styled.span``;

const CompareProgramPrice = styled.span`
  font-size: var(--font-size-s);
`;

const CompareProgramDelete = styled.span`
  position: absolute;
  width: 20px;
  height: 20px;
  right: 10px;
  top: 10px;
  cursor: pointer;
`;

export default function Program() {
  /* 검색 기능 */
  const [searchKeyword, setSearchKeyword] = useState("");

  const {
    register: searchRegister,
    handleSubmit: handleSearchSubmit,
    reset: searchReset,
  } = useForm();

  // Search button 클릭 시 keyword를 setSearchKeyword에 저장
  const onSearchSubmit = (data) => {
    setSearchKeyword(data.keyword);
    searchReset();
  };

  /* 프로그램 필터링 1. 스포츠 태그 */
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

  /* 프로그램 필터링 2. 세부 필터 */
  const [filterDetails, setFilterDetails] = useState({
    diff: [],
    booking: "",
    age: [],
    max: 0,
    start: "",
    end: "",
  });

  const {
    register: filterRegister,
    handleSubmit: handleFilterSubmit,
    reset: filterReset,
  } = useForm();

  const onFilterValid = (data) => {
    setFilterDetails(data);
  };

  // searchKeyword가 적용된 programsData에서 스포츠 태그, 디테일 필터링 적용 후 select
  const filterProgramBySports = (programs) => {
    return clickedTags.length === 0
      ? programs
      : programs.filter((program) => clickedTags.includes(program.sport_id));
  };

  const filterProgramByDetails = (programs) => {
    let result = programs;

    /* Main Filter */
    // 날짜
    if (filterDetails.date) {
      const filterMonth = Number(filterDetails.date.substring(5, 7));
      result = result.filter((program) => {
        return (
          filterMonth >= Number(program.open_month) &&
          filterMonth <= Number(program.close_month)
        );
      });
    }

    // 시간
    if (filterDetails.time) {
      result = result.filter(
        (program) =>
          filterDetails.time >= program.open_time &&
          filterDetails.time <= program.close_time
      );
    }

    // 최소금액
    if (filterDetails.minPrice) {
      result = result.filter((program) => {
        return (
          Number(filterDetails.minPrice.replace(",", "")) >=
          Number(program.price.replace(",", ""))
        );
      });
    }

    // 최대금액
    if (filterDetails.maxPrice) {
      result = result.filter((program) => {
        return (
          Number(filterDetails.maxPrice.replace(",", "")) >=
          Number(program.price.replace(",", ""))
        );
      });
    }

    // 해수욕장
    if (filterDetails.beach) {
      result = result.filter((program) => {
        return filterDetails.beach === program.BEACH.beach_name;
      });
    }

    /* Detail Filter */
    // 난이도
    if (filterDetails.diff) {
      result =
        filterDetails.diff.length === 0
          ? programs
          : programs.filter((program) =>
              filterDetails.diff.includes(program.difficulty)
            );
    }

    // 예약방식
    if (filterDetails.booking) {
      result = result.filter((program) => {
        return program.booking.includes(filterDetails.booking);
      });
    }

    // 나이대
    if (filterDetails.age) {
      result =
        filterDetails.age.length === 0
          ? result
          : result.filter((program) =>
              program.age.some((e) => filterDetails.age.includes(e))
            );
    }

    // 인원
    if (filterDetails.max) {
      result = result.filter(
        (program) => program.max_people >= filterDetails.max
      );
    }

    // 프로그램 기간 (시작)
    if (filterDetails.end) {
      const filterMonth = Number(filterDetails.end.substring(5, 7));
      result = result.filter((program) => {
        return (
          filterMonth >= Number(program.open_month) &&
          filterMonth <= Number(program.close_month)
        );
      });
    }

    // 프로그램 기간 (끝)
    if (filterDetails.start) {
      const filterMonth = Number(filterDetails.start.substring(5, 7));
      result = result.filter((program) => {
        return (
          filterMonth >= Number(program.open_month) &&
          filterMonth <= Number(program.close_month)
        );
      });
    }
    return result;
  };

  const { isLoading: programsLoading, data: programsData } = useQuery(
    ["programs", searchKeyword],
    () => getPrograms(searchKeyword),
    {
      select: (programsData) =>
        filterProgramByDetails(filterProgramBySports(programsData)),
    }
  );

  /* 비교하기 */
  const [compareItem, setCompareItem] = useState([]);

  const onCompareBtnClicked = (program) => {
    if (compareItem.length >= 4) return;

    let alreadyExist = false;
    compareItem.forEach((item) => {
      if (item.id === program.id) alreadyExist = true;
    });
    if (alreadyExist) return;

    setCompareItem((prev) => [...prev, program]);
  };

  const onDeleteBtnClicked = (id) => {
    setCompareItem((prev) => prev.filter((item) => id !== item.id));
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
                    bgColor={"#ffcccc"}
                    hoverColor={"#ffb8b8"}
                    // handleTagClicked 함수를 onClick props로 전달
                    onClick={() => hanldeTagClicked(sport.id)}
                    hasClicked={clickedTags.includes(sport.id)}
                  />
                );
              })}
        </SportsFilter>
        <FilterContainer onSubmit={handleFilterSubmit(onFilterValid)}>
          <MainFilter>
            <DateAndTime>
              <SmallFilterBox>
                <input type="date" {...filterRegister("date")} />
              </SmallFilterBox>
              <SmallFilterBox>
                <input type="time" {...filterRegister("time")} />
              </SmallFilterBox>
            </DateAndTime>
            <SmallFilterBox>
              <input
                style={{ width: "60px" }}
                type="number"
                placeholder="최소금액"
                min={0}
                {...filterRegister("minPrice")}
              />
              ~
              <input
                style={{ width: "60px" }}
                type="number"
                placeholder="최대금액"
                min={0}
                {...filterRegister("maxPrice")}
              />
            </SmallFilterBox>
            <SmallFilterBox>
              <select {...filterRegister("beach")}>
                <option value="">해수욕장</option>
                <option value="해운대해수욕장">해운대해수욕장</option>
                <option value="광안리해수욕장">광안리해수욕장</option>
                <option value="송정해수욕장">송정해수욕장</option>
                <option value="임랑해수욕장">임랑해수욕장</option>
                <option value="다대포해수욕장">다대포해수욕장</option>
                <option value="일광해수욕장">일광해수욕장</option>
                <option value="송도해수욕장">송도해수욕장</option>
              </select>
            </SmallFilterBox>
          </MainFilter>
          <DetailFilter>
            <FilterRow>
              <FilterCol>
                <span>난이도</span>
              </FilterCol>
              <FilterCol>
                <label htmlFor="high">상</label>
                <input
                  id="high"
                  name="difficulty"
                  type="checkbox"
                  value="어려움"
                  {...filterRegister("diff")}
                />
                <label htmlFor="mid">중</label>
                <input
                  id="mid"
                  name="difficulty"
                  type="checkbox"
                  value="보통"
                  {...filterRegister("diff")}
                />
                <label htmlFor="low">하</label>
                <input
                  id="low"
                  name="difficulty"
                  type="checkbox"
                  value="쉬움"
                  {...filterRegister("diff")}
                />
              </FilterCol>
            </FilterRow>
            <FilterRow>
              <FilterCol>
                <span>예약방식</span>
              </FilterCol>
              <FilterCol>
                <select {...filterRegister("booking")}>
                  <option value="">선택</option>
                  <option value="call">전화 예약</option>
                  <option value="homepage">홈페이지 예약</option>
                  <option value="waybu">웨이부에서 예약</option>
                </select>
              </FilterCol>
            </FilterRow>
            <FilterRow>
              <FilterCol>
                <span>추천 나이대</span>
              </FilterCol>
              <FilterCol>
                <label htmlFor="ten">10대</label>
                <input
                  id="ten"
                  type="checkbox"
                  {...filterRegister("age")}
                  value="10"
                />
                <label htmlFor="twenty">20대</label>
                <input
                  id="twenty"
                  type="checkbox"
                  {...filterRegister("age")}
                  value="20"
                />
                <label htmlFor="thirty">30대</label>
                <input
                  id="thirty"
                  type="checkbox"
                  {...filterRegister("age")}
                  value="30"
                />
                <label htmlFor="elder">40대 이상</label>
                <input
                  id="elder"
                  type="checkbox"
                  {...filterRegister("age")}
                  value="40"
                />
              </FilterCol>
            </FilterRow>
            <FilterRow>
              <FilterCol>
                <span>인원</span>
              </FilterCol>
              <FilterCol>
                <input
                  min={0}
                  style={{ width: "40px" }}
                  type="number"
                  {...filterRegister("max")}
                />
              </FilterCol>
            </FilterRow>
            <FilterRow>
              <FilterCol>
                <span>프로그램 기간</span>
              </FilterCol>
              <FilterCol>
                <input type="date" {...filterRegister("start")} />
                <span style={{ marginRight: "10px" }}>~</span>
                <input type="date" {...filterRegister("end")} />
              </FilterCol>
            </FilterRow>
            <FilterSubmit>
              <input type="submit" value="필터 적용" />
              <ResetBtn
                onClick={() => {
                  setClickedTags([]);
                  setFilterDetails({ diff: [] });
                  setSearchKeyword("");
                  filterReset();
                }}
              >
                {" "}
                초기화
              </ResetBtn>
            </FilterSubmit>
          </DetailFilter>
        </FilterContainer>
        <ProgramContainer>
          {programsLoading ? (
            "Loading Programs..."
          ) : (
            <>
              {programsData.length !== 0
                ? programsData.map((program) => (
                    <ProgramItem
                      key={program.id}
                      program={program}
                      onBtnClicked={onCompareBtnClicked}
                    />
                  ))
                : "데이터가 존재하지 않습니다."}
            </>
          )}
        </ProgramContainer>
        {compareItem.length !== 0 ? (
          <FixedBox>
            <CompareBox>
              <CompareTitle>
                비교 상품 (<span>{compareItem.length}</span>/4)
              </CompareTitle>
              <CompareProgramBox>
                {compareItem.map((item, index) => (
                  <CompareProgram key={index}>
                    <CompareProgramContents>
                      <CompareProgramTitle>
                        {item.program_name}
                      </CompareProgramTitle>
                      <CompareProgramRates>⭐⭐⭐⭐⭐(0)</CompareProgramRates>
                      <CompareProgramPrice>{item.price}</CompareProgramPrice>
                    </CompareProgramContents>
                    <CompareProgramDelete
                      onClick={() => {
                        onDeleteBtnClicked(item.id);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18 18 6M6 6l12 12"
                        />
                      </svg>
                    </CompareProgramDelete>
                  </CompareProgram>
                ))}
              </CompareProgramBox>
              <IndexButton prop={"상세 비교"} />
            </CompareBox>
          </FixedBox>
        ) : null}
      </Wrapper>
    </Body>
  );
}
