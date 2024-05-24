import styled from "styled-components";
import SportsTag from "./components/SportsTag";
import { useState } from "react";
import { useQuery } from "react-query";
import { useForm } from "react-hook-form";
import { getPrograms } from "../../../apis/programs";
import { getSports } from "../../../apis/sports";
import ProgramItem from "./components/ProgramItem";

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
  height: 50px;
  border-style: none;
  padding-left: 20px;
  padding-right: 80px;
  border-radius: var(--br-mini);
  border: 2px solid var(--color-blue-main);
  font-size: var(--font-size-ml);
  &:focus {
    outline: none;
    border: 2px solid var(--color-blue-dark);
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
  border-top-right-radius: var(--br-mini);
  border-bottom-right-radius: var(--br-mini);
  cursor: pointer;
  &:hover {
    background-color: var(--color-blue-dark);
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
  height: 300px;
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
  height: 80px;
  display: flex;
  gap: 10px;
  padding-bottom: 10px;
  font-weight: bold;
`;

const DateAndTime = styled.div`
  flex: 2;
  display: flex;
  border-radius: var(--br-mini);
  border: none;
  box-shadow: 1px 1px 1px var(--color-gray);

  div {
    &:first-child {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      border-right: 1px solid var(--color-gray);
      box-shadow: none;
    }
    &:nth-child(2) {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      border-left: none;
      box-shadow: none;
    }
  }
`;

const SmallFilterBox = styled.div`
  border: 1px solid var(--color-gray);
  border-bottom: 1px solid var(--color-gray);
  border-right: 1px solid var(--color-gray);
  border-radius: var(--br-mini);
  height: 100%;
  flex: 1;
  gap: 4px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  transition: all 0.1s ease-in-out;
  input,
  select {
    width: 100px;
    border: none;
  }

  box-shadow: 1px 1px 1px var(--color-gray);
`;

const DetailFilter = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border: 1px solid var(--color-gray);
  border-radius: var(--br-mini);
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

const CheckBox = styled.input`
  display: none;
  &:checked + label {
    color: var(--color-blue-main);
    font-weight: 900;
  }
`;

const CheckBoxLabel = styled.label`
  color: var(--color-gray);
  cursor: pointer;
  margin-right: var(--padding-base);
  &:hover {
    color: var(--color-navy);
  }
`;

const FilterSubmit = styled.div`
  display: flex;
  gap: 10px;
  position: absolute;
  right: 50px;
  bottom: 30px;

  button {
    padding: 8px 16px;
    border: 1px solid var(--color-gray);
    background-color: var(--color-white);
    &:hover {
      background-color: var(--color-blue-vivid);
    }
  }
`;

/* Order */
const OrderContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 80%;
  div {
    margin-right: var(--padding-base);
    cursor: pointer;
  }
`;

/* Compare */
const FixedBox = styled.div`
  position: fixed;
`;

const CompareBox = styled.div`
  width: 300px;
  background-color: #f4fcff;
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
  border: 1px solid var(--color-blue-main);
  background-color: var(--color-white);
  border-radius: var(--br-mini);
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

const CompareBtn = styled.button`
  width: 250px;
  font-size: var(--font-size-m);
  color: white;
  height: 50px;
  background-color: var(--color-blue-main);
  &:hover {
    background-color: #1758b9;
  }
  transition: all 0.2s ease-in-out;
  border-radius: var(--br-3xs);
  border: none;
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
    booking: [],
    age: [],
    max: 0,
    term: [],
  });

  const {
    register: filterRegister,
    handleSubmit: handleFilterSubmit,
    reset: filterReset,
  } = useForm();

  const onFilterValid = (data) => {
    setFilterDetails(data);
  };

  /* 프로그램 필터링 3. order */

  const [order, setOrder] = useState({
    popularity: true,
    price: true,
    reviews: true,
    popOn: false,
    priceOn: false,
    reviewsOn: false,
  });

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

    // 가격
    if (filterDetails.minPrice) {
      result = result.filter((program) => {
        return (
          Number(filterDetails.minPrice.replace(",", "")) >=
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
      result =
        filterDetails.booking.length === 0
          ? result
          : result.filter((program) => {
              return program.booking.some((e) =>
                filterDetails.booking.includes(e)
              );
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

    // 프로그램 기간
    if (filterDetails.term) {
      result =
        filterDetails.term.length === 0
          ? result
          : result.filter((program) => {
              return filterDetails.term.includes(program.term);
            });
    }

    return result;
  };

  const filterProgramByOrder = (programs) => {
    let result = programs;

    // 가격
    if (order.priceOn) {
      result;
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
          <SearchButton>
            <svg
              width="25"
              height="26"
              viewBox="0 0 25 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.1201 0.5C9.34671 0.500151 7.5991 0.924367 6.02305 1.73725C4.447 2.55014 3.0882 3.72813 2.06002 5.17294C1.03184 6.61775 0.364097 8.28748 0.112499 10.0428C-0.139099 11.7982 0.0327433 13.5882 0.61369 15.2637C1.19464 16.9391 2.16784 18.4513 3.45211 19.6741C4.73638 20.897 6.29446 21.795 7.99638 22.2932C9.6983 22.7914 11.4947 22.8755 13.2357 22.5383C14.9767 22.2011 16.6118 21.4524 18.0046 20.3548L22.7827 25.1327C23.0295 25.3711 23.36 25.5029 23.703 25.5C24.0461 25.497 24.3742 25.3594 24.6168 25.1168C24.8594 24.8742 24.997 24.5461 25 24.2031C25.0029 23.86 24.8711 23.5295 24.6327 23.2828L19.8546 18.5049C21.1473 16.8651 21.9521 14.8945 22.1771 12.8186C22.402 10.7428 22.038 8.64553 21.1266 6.7669C20.2153 4.88827 18.7934 3.30416 17.0237 2.19586C15.2541 1.08757 13.2081 0.49986 11.1201 0.5ZM2.61576 11.6206C2.61576 9.36519 3.51175 7.20217 5.10661 5.60736C6.70148 4.01256 8.86458 3.11661 11.1201 3.11661C13.3755 3.11661 15.5386 4.01256 17.1335 5.60736C18.7284 7.20217 19.6244 9.36519 19.6244 11.6206C19.6244 13.876 18.7284 16.039 17.1335 17.6338C15.5386 19.2286 13.3755 20.1246 11.1201 20.1246C8.86458 20.1246 6.70148 19.2286 5.10661 17.6338C3.51175 16.039 2.61576 13.876 2.61576 11.6206Z"
                fill="var(--color-white)"
              />
            </svg>
          </SearchButton>
        </SearchContainer>
        <SportsFilter>
          <h3>종목</h3>
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
                type="number"
                placeholder="가격대"
                min={0}
                {...filterRegister("minPrice")}
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
                <CheckBox
                  id="high"
                  name="difficulty"
                  type="checkbox"
                  value="상"
                  {...filterRegister("diff")}
                />
                <CheckBoxLabel htmlFor="high">상</CheckBoxLabel>
                <CheckBox
                  id="mid"
                  name="difficulty"
                  type="checkbox"
                  value="중"
                  {...filterRegister("diff")}
                />
                <CheckBoxLabel htmlFor="mid">중</CheckBoxLabel>
                <CheckBox
                  id="low"
                  name="difficulty"
                  type="checkbox"
                  value="하"
                  {...filterRegister("diff")}
                />
                <CheckBoxLabel htmlFor="low">하</CheckBoxLabel>
              </FilterCol>
            </FilterRow>
            <FilterRow>
              <FilterCol>
                <span>예약방식</span>
              </FilterCol>
              <FilterCol>
                <CheckBox
                  type="checkbox"
                  id="call"
                  value="call"
                  {...filterRegister("booking")}
                />
                <CheckBoxLabel htmlFor="call">전화 예약</CheckBoxLabel>
                <CheckBox
                  type="checkbox"
                  id="homepage"
                  value="homepage"
                  {...filterRegister("booking")}
                />
                <CheckBoxLabel htmlFor="homepage">홈페이지 예약</CheckBoxLabel>
                <CheckBox
                  type="checkbox"
                  id="waybu"
                  value="waybu"
                  {...filterRegister("booking")}
                />
                <CheckBoxLabel htmlFor="waybu">웨이부 예약</CheckBoxLabel>
              </FilterCol>
            </FilterRow>
            <FilterRow>
              <FilterCol>
                <span>나이대</span>
              </FilterCol>
              <FilterCol>
                <CheckBox
                  id="ten"
                  type="checkbox"
                  {...filterRegister("age")}
                  value="14"
                />
                <CheckBoxLabel htmlFor="ten">14세 이하 포함</CheckBoxLabel>

                <CheckBox
                  id="elder"
                  type="checkbox"
                  {...filterRegister("age")}
                  value="60"
                />
                <CheckBoxLabel htmlFor="elder">60세 이상 포함</CheckBoxLabel>
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
                <CheckBox
                  id="day"
                  type="checkbox"
                  value="day"
                  {...filterRegister("term")}
                />
                <CheckBoxLabel htmlFor="day">하루</CheckBoxLabel>
                <CheckBox
                  id="short"
                  type="checkbox"
                  value="short"
                  {...filterRegister("term")}
                />
                <CheckBoxLabel htmlFor="short">단기</CheckBoxLabel>
                <CheckBox
                  id="long"
                  type="checkbox"
                  value="long"
                  {...filterRegister("term")}
                />
                <CheckBoxLabel htmlFor="long">장기</CheckBoxLabel>
              </FilterCol>
            </FilterRow>
            <FilterSubmit>
              <button>필터 적용</button>
              <button
                text={"초기화"}
                onClick={() => {
                  setClickedTags([]);
                  setFilterDetails({ diff: [] });
                  setSearchKeyword("");
                  setOrder({
                    popularity: true,
                    price: true,
                    reviews: true,
                    popOn: false,
                    priceOn: false,
                    reviewsOn: false,
                  });
                  filterReset();
                }}
              >
                초기화
              </button>
            </FilterSubmit>
          </DetailFilter>
        </FilterContainer>
        <OrderContainer>
          <div
            onClick={() => {
              setOrder((prev) => {
                return { ...prev, popularity: !prev.popularity, popOn: true };
              });
            }}
          >
            <span>인기순</span>{" "}
            {order.popOn ? (
              <span>{order.popularity ? "asc" : "desc"}</span>
            ) : null}
          </div>
          <div
            onClick={() => {
              setOrder((prev) => {
                return { ...prev, price: !prev.price, priceOn: true };
              });
            }}
          >
            <span>가격순</span>
            {order.priceOn ? <span>{order.price ? "asc" : "desc"}</span> : null}
          </div>
          <div
            onClick={() => {
              setOrder((prev) => {
                return { ...prev, reviews: !prev.reviews, reviewsOn: true };
              });
            }}
          >
            <span>별점순</span>{" "}
            {order.reviewsOn ? (
              <span>{order.reviews ? "asc" : "desc"}</span>
            ) : null}
          </div>
        </OrderContainer>
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
                      <CompareProgramRates>
                        <div>
                          <svg
                            width="120"
                            height="19"
                            viewBox="0 0 120 19"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M91.7045 9.18182C91.7045 7.75 91.8902 6.43371 92.2614 5.23295C92.6364 4.02841 93.1705 2.92045 93.8636 1.90909H95.0455C94.7727 2.28409 94.517 2.74621 94.2784 3.29545C94.0436 3.84091 93.8371 4.44129 93.6591 5.09659C93.4811 5.74811 93.3409 6.42235 93.2386 7.11932C93.1402 7.81629 93.0909 8.50379 93.0909 9.18182C93.0909 10.0833 93.178 10.9981 93.3523 11.9261C93.5265 12.8542 93.7614 13.7159 94.0568 14.5114C94.3523 15.3068 94.6818 15.9545 95.0455 16.4545H93.8636C93.1705 15.4432 92.6364 14.3371 92.2614 13.1364C91.8902 11.9318 91.7045 10.6136 91.7045 9.18182ZM101.092 3.36364V15H99.6832V4.84091H99.6151L96.7741 6.72727V5.29545L99.6832 3.36364H101.092ZM108.234 15.1591C107.378 15.1591 106.649 14.9261 106.047 14.4602C105.445 13.9905 104.984 13.3106 104.666 12.4205C104.348 11.5265 104.189 10.447 104.189 9.18182C104.189 7.92424 104.348 6.85038 104.666 5.96023C104.988 5.06629 105.45 4.38447 106.053 3.91477C106.659 3.44129 107.386 3.20455 108.234 3.20455C109.083 3.20455 109.808 3.44129 110.411 3.91477C111.017 4.38447 111.479 5.06629 111.797 5.96023C112.119 6.85038 112.28 7.92424 112.28 9.18182C112.28 10.447 112.121 11.5265 111.803 12.4205C111.484 13.3106 111.024 13.9905 110.422 14.4602C109.82 14.9261 109.09 15.1591 108.234 15.1591ZM108.234 13.9091C109.083 13.9091 109.742 13.5 110.212 12.6818C110.681 11.8636 110.916 10.697 110.916 9.18182C110.916 8.17424 110.808 7.31629 110.592 6.60795C110.38 5.89962 110.073 5.35985 109.672 4.98864C109.274 4.61742 108.795 4.43182 108.234 4.43182C107.393 4.43182 106.736 4.84659 106.263 5.67614C105.789 6.50189 105.553 7.67045 105.553 9.18182C105.553 10.1894 105.659 11.0455 105.871 11.75C106.083 12.4545 106.388 12.9905 106.786 13.358C107.187 13.7254 107.67 13.9091 108.234 13.9091ZM117.325 9.18182C117.325 10.6136 117.138 11.9318 116.763 13.1364C116.392 14.3371 115.859 15.4432 115.166 16.4545H113.984C114.257 16.0795 114.511 15.6174 114.746 15.0682C114.984 14.5227 115.193 13.9242 115.371 13.2727C115.549 12.6174 115.687 11.9413 115.786 11.2443C115.888 10.5436 115.939 9.85606 115.939 9.18182C115.939 8.2803 115.852 7.36553 115.678 6.4375C115.503 5.50947 115.268 4.64773 114.973 3.85227C114.678 3.05682 114.348 2.40909 113.984 1.90909H115.166C115.859 2.92045 116.392 4.02841 116.763 5.23295C117.138 6.43371 117.325 7.75 117.325 9.18182Z"
                              fill="black"
                            />
                            <path
                              d="M15.7777 6.78426L12.0295 10.1448L13.1747 15.1687C13.205 15.2978 13.1978 15.4334 13.154 15.5582C13.1102 15.6831 13.0318 15.7916 12.9286 15.8701C12.8255 15.9486 12.7023 15.9936 12.5746 15.9994C12.4469 16.0051 12.3204 15.9714 12.2111 15.9024L7.9996 13.2092L3.78807 15.9016C3.6788 15.9706 3.55232 16.0043 3.42461 15.9986C3.2969 15.9928 3.17369 15.9478 3.07057 15.8693C2.96744 15.7908 2.88902 15.6823 2.84522 15.5574C2.80141 15.4326 2.79419 15.297 2.82447 15.1679L3.96971 10.144L0.221509 6.78346C0.125943 6.69623 0.0570432 6.58181 0.0233152 6.45433C-0.0104127 6.32685 -0.00749197 6.1919 0.0317169 6.06612C0.0709257 5.94035 0.144706 5.82927 0.243949 5.74659C0.343192 5.66391 0.463553 5.61326 0.590172 5.60088L5.50901 5.18482L7.40389 0.416108C7.4522 0.29308 7.53466 0.187798 7.64076 0.113688C7.74685 0.0395787 7.87178 0 7.9996 0C8.12743 0 8.25235 0.0395787 8.35845 0.113688C8.46455 0.187798 8.54701 0.29308 8.59531 0.416108L10.4902 5.18482L15.409 5.60088C15.5358 5.61311 15.6564 5.66372 15.7558 5.74645C15.8552 5.82918 15.9291 5.94039 15.9683 6.06633C16.0076 6.19226 16.0104 6.32739 15.9765 6.455C15.9426 6.5826 15.8735 6.69708 15.7777 6.78426Z"
                              fill="#3592F0"
                            />
                            <path
                              d="M33.7777 6.78426L30.0295 10.1448L31.1747 15.1687C31.205 15.2978 31.1978 15.4334 31.154 15.5582C31.1102 15.6831 31.0318 15.7916 30.9286 15.8701C30.8255 15.9486 30.7023 15.9936 30.5746 15.9994C30.4469 16.0051 30.3204 15.9714 30.2111 15.9024L25.9996 13.2092L21.7881 15.9016C21.6788 15.9706 21.5523 16.0043 21.4246 15.9986C21.2969 15.9928 21.1737 15.9478 21.0706 15.8693C20.9674 15.7908 20.889 15.6823 20.8452 15.5574C20.8014 15.4326 20.7942 15.297 20.8245 15.1679L21.9697 10.144L18.2215 6.78346C18.1259 6.69623 18.057 6.58181 18.0233 6.45433C17.9896 6.32685 17.9925 6.1919 18.0317 6.06612C18.0709 5.94035 18.1447 5.82927 18.2439 5.74659C18.3432 5.66391 18.4636 5.61326 18.5902 5.60088L23.509 5.18482L25.4039 0.416108C25.4522 0.29308 25.5347 0.187798 25.6408 0.113688C25.7469 0.0395787 25.8718 0 25.9996 0C26.1274 0 26.2524 0.0395787 26.3584 0.113688C26.4645 0.187798 26.547 0.29308 26.5953 0.416108L28.4902 5.18482L33.409 5.60088C33.5358 5.61311 33.6564 5.66372 33.7558 5.74645C33.8552 5.82918 33.9291 5.94039 33.9683 6.06633C34.0076 6.19226 34.0104 6.32739 33.9765 6.455C33.9426 6.5826 33.8735 6.69708 33.7777 6.78426Z"
                              fill="#3592F0"
                            />
                            <path
                              d="M51.7777 6.78426L48.0295 10.1448L49.1747 15.1687C49.205 15.2978 49.1978 15.4334 49.154 15.5582C49.1102 15.6831 49.0318 15.7916 48.9286 15.8701C48.8255 15.9486 48.7023 15.9936 48.5746 15.9994C48.4469 16.0051 48.3204 15.9714 48.2111 15.9024L43.9996 13.2092L39.7881 15.9016C39.6788 15.9706 39.5523 16.0043 39.4246 15.9986C39.2969 15.9928 39.1737 15.9478 39.0706 15.8693C38.9674 15.7908 38.889 15.6823 38.8452 15.5574C38.8014 15.4326 38.7942 15.297 38.8245 15.1679L39.9697 10.144L36.2215 6.78346C36.1259 6.69623 36.057 6.58181 36.0233 6.45433C35.9896 6.32685 35.9925 6.1919 36.0317 6.06612C36.0709 5.94035 36.1447 5.82927 36.2439 5.74659C36.3432 5.66391 36.4636 5.61326 36.5902 5.60088L41.509 5.18482L43.4039 0.416108C43.4522 0.29308 43.5347 0.187798 43.6408 0.113688C43.7469 0.0395787 43.8718 0 43.9996 0C44.1274 0 44.2524 0.0395787 44.3584 0.113688C44.4645 0.187798 44.547 0.29308 44.5953 0.416108L46.4902 5.18482L51.409 5.60088C51.5358 5.61311 51.6564 5.66372 51.7558 5.74645C51.8552 5.82918 51.9291 5.94039 51.9683 6.06633C52.0076 6.19226 52.0104 6.32739 51.9765 6.455C51.9426 6.5826 51.8735 6.69708 51.7777 6.78426Z"
                              fill="#3592F0"
                            />
                            <path
                              d="M69.7777 6.78426L66.0295 10.1448L67.1747 15.1687C67.205 15.2978 67.1978 15.4334 67.154 15.5582C67.1102 15.6831 67.0318 15.7916 66.9286 15.8701C66.8255 15.9486 66.7023 15.9936 66.5746 15.9994C66.4469 16.0051 66.3204 15.9714 66.2111 15.9024L61.9996 13.2092L57.7881 15.9016C57.6788 15.9706 57.5523 16.0043 57.4246 15.9986C57.2969 15.9928 57.1737 15.9478 57.0706 15.8693C56.9674 15.7908 56.889 15.6823 56.8452 15.5574C56.8014 15.4326 56.7942 15.297 56.8245 15.1679L57.9697 10.144L54.2215 6.78346C54.1259 6.69623 54.057 6.58181 54.0233 6.45433C53.9896 6.32685 53.9925 6.1919 54.0317 6.06612C54.0709 5.94035 54.1447 5.82927 54.2439 5.74659C54.3432 5.66391 54.4636 5.61326 54.5902 5.60088L59.509 5.18482L61.4039 0.416108C61.4522 0.29308 61.5347 0.187798 61.6408 0.113688C61.7469 0.0395787 61.8718 0 61.9996 0C62.1274 0 62.2524 0.0395787 62.3584 0.113688C62.4645 0.187798 62.547 0.29308 62.5953 0.416108L64.4902 5.18482L69.409 5.60088C69.5358 5.61311 69.6564 5.66372 69.7558 5.74645C69.8552 5.82918 69.9291 5.94039 69.9683 6.06633C70.0076 6.19226 70.0104 6.32739 69.9765 6.455C69.9426 6.5826 69.8735 6.69708 69.7777 6.78426Z"
                              fill="#3592F0"
                            />
                            <path
                              d="M87.7777 6.78426L84.0295 10.1448L85.1747 15.1687C85.205 15.2978 85.1978 15.4334 85.154 15.5582C85.1102 15.6831 85.0318 15.7916 84.9286 15.8701C84.8255 15.9486 84.7023 15.9936 84.5746 15.9994C84.4469 16.0051 84.3204 15.9714 84.2111 15.9024L79.9996 13.2092L75.7881 15.9016C75.6788 15.9706 75.5523 16.0043 75.4246 15.9986C75.2969 15.9928 75.1737 15.9478 75.0706 15.8693C74.9674 15.7908 74.889 15.6823 74.8452 15.5574C74.8014 15.4326 74.7942 15.297 74.8245 15.1679L75.9697 10.144L72.2215 6.78346C72.1259 6.69623 72.057 6.58181 72.0233 6.45433C71.9896 6.32685 71.9925 6.1919 72.0317 6.06612C72.0709 5.94035 72.1447 5.82927 72.2439 5.74659C72.3432 5.66391 72.4636 5.61326 72.5902 5.60088L77.509 5.18482L79.4039 0.416108C79.4522 0.29308 79.5347 0.187798 79.6408 0.113688C79.7469 0.0395787 79.8718 0 79.9996 0C80.1274 0 80.2524 0.0395787 80.3584 0.113688C80.4645 0.187798 80.547 0.29308 80.5953 0.416108L82.4902 5.18482L87.409 5.60088C87.5358 5.61311 87.6564 5.66372 87.7558 5.74645C87.8552 5.82918 87.9291 5.94039 87.9683 6.06633C88.0076 6.19226 88.0104 6.32739 87.9765 6.455C87.9426 6.5826 87.8735 6.69708 87.7777 6.78426Z"
                              fill="#B9B9B9"
                            />
                          </svg>
                        </div>
                      </CompareProgramRates>
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
              <CompareBtn>상세 비교</CompareBtn>
            </CompareBox>
          </FixedBox>
        ) : null}
      </Wrapper>
    </Body>
  );
}
