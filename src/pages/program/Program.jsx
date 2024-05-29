import styled from "styled-components";
import SportsTag from "./components/SportsTag";
import { useState } from "react";
import { useQuery } from "react-query";
import { useForm } from "react-hook-form";
import { getPrograms } from "../../../apis/programs";
import { getSports } from "../../../apis/sports";
import ProgramItem from "./components/ProgramItem";
import StarAvgContainer from "./components/StarAvgContainer";

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
  gap: 20px;
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

  &::placeholder {
    @media only screen and (max-width: 376px) {
      font-size: var(--font-size-m);
    }
  }
  transition: all 0.1s ease-in-out;
  @media only screen and (max-width: 376px) {
    height: 40px;
  }
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
  @media only screen and (max-width: 376px) {
    width: 50px;
  }
`;

/* Program */
const ProgramContainer = styled.div`
  width: 80%;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;

  @media only screen and (max-width: 376px) {
    grid-template-columns: 1fr;
  }
`;

/* Filters */

const FilterContainer = styled.form`
  width: 80%;
  display: flex;
  flex-direction: column;
`;

const SportsFilter = styled.form`
  width: 80%;
  flex-wrap: wrap;

  align-items: center;
  gap: 10px;
  display: flex;
  justify-content: center;
  h3 {
    width: fit-content;

    white-space: nowrap;
    font-weight: bold;
  }

  @media only screen and (max-width: 376px) {
    h3 {
      display: none;
    }
  }
`;

const MainFilter = styled.div`
  display: flex;
  gap: 10px;
  padding-bottom: 10px;
  font-weight: bold;
  @media only screen and (max-width: 376px) {
    flex-direction: column;
  }
`;

const FilterDiv = styled.div`
  display: flex;
  flex: 1;
  gap: 10px;

  &:first-child {
    gap: 0;
    box-shadow: 1px 1px 1px var(--color-gray);
    border-radius: var(--br-mini);

    div {
      box-shadow: none;

      &:first-child {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
      &:last-child {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        border-left: 0;
      }
    }
  }

  @media only screen and (max-width: 376px) {
    gap: 0;
    box-shadow: 1px 1px 1px var(--color-gray);
    border-radius: var(--br-mini);

    div {
      box-shadow: none;

      &:first-child {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
      &:last-child {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        border-left: 0;
      }
    }
  }
`;

const SmallFilterBox = styled.div`
  border: 1px solid var(--color-gray);
  border-bottom: 1px solid var(--color-gray);
  border-right: 1px solid var(--color-gray);
  border-radius: var(--br-mini);
  gap: 4px;
  flex: 1;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  transition: all 0.1s ease-in-out;
  input,
  select {
    height: 40px;
    width: 80%;
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
  @media only screen and (max-width: 376px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
  }
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
    @media only screen and (max-width: 376px) {
      flex: 1;
    }
  }

  &:nth-child(2) {
    flex: 2;
    display: flex;
    justify-content: flex-start;
    @media only screen and (max-width: 376px) {
      flex: 1;
    }
  }

  input {
    margin-right: 10px;
    @media only screen and (max-width: 376px) {
      margin-right: 0;
    }
  }

  @media only screen and (max-width: 376px) {
    font-size: 14px;
    &:first-child {
      flex: 1;
    }
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
  &:last-child {
    margin-right: 0;
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
  @media only screen and (max-width: 376px) {
    position: static;
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
  @media only screen and (max-width: 376px) {
    font-size: 14px;
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
  /* 리뷰 */

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
                    text={sport.title}
                    // handleTagClicked 함수를 onClick props로 전달
                    onClick={() => hanldeTagClicked(sport.id)}
                    hasClicked={clickedTags.includes(sport.id)}
                  />
                );
              })}
        </SportsFilter>
        <FilterContainer onSubmit={handleFilterSubmit(onFilterValid)}>
          <MainFilter>
            <FilterDiv>
              <SmallFilterBox>
                <input type="date" {...filterRegister("date")} />
              </SmallFilterBox>
              <SmallFilterBox>
                <input type="time" {...filterRegister("time")} />
              </SmallFilterBox>
            </FilterDiv>
            <FilterDiv>
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
            </FilterDiv>
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
                <CheckBoxLabel htmlFor="call">전화</CheckBoxLabel>
                <CheckBox
                  type="checkbox"
                  id="homepage"
                  value="homepage"
                  {...filterRegister("booking")}
                />
                <CheckBoxLabel htmlFor="homepage">홈페이지</CheckBoxLabel>
                <CheckBox
                  type="checkbox"
                  id="waybu"
                  value="waybu"
                  {...filterRegister("booking")}
                />
                <CheckBoxLabel htmlFor="waybu">웨이부</CheckBoxLabel>
              </FilterCol>
            </FilterRow>
            <FilterRow>
              <FilterCol>
                <span>포함 나이대</span>
              </FilterCol>
              <FilterCol>
                <CheckBox
                  id="ten"
                  type="checkbox"
                  {...filterRegister("age")}
                  value="14"
                />
                <CheckBoxLabel htmlFor="ten">14세 이하</CheckBoxLabel>

                <CheckBox
                  id="elder"
                  type="checkbox"
                  {...filterRegister("age")}
                  value="60"
                />
                <CheckBoxLabel htmlFor="elder">60세 이상</CheckBoxLabel>
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
                      <StarAvgContainer programId={item.id} />
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
