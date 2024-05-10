// import { useQuery } from "react-query";
// import { getPrograms } from "../../../apis/program";

import styled from "styled-components";
import ProgramItem from "../../components/program/ProgramItem";
import SportsTag from "../../components/global/SportsTag";

// export default function Program() {
//   const { isLoading, data } = useQuery(["programs"], getPrograms);
//   return <>{isLoading ? "Loading..." : <ul>{JSON.stringify(data)}</ul>}</>;
// }

const programSample = [
  {
    id: 1,
    program_name: "프로그램 이름",
    business_name: "업체 이름",
    numOfRates: 3,
    price: "100,000원",
    available: ["10:00", "20:00"],
  },
  {
    id: 2,
    business_name: "업체 이름",
    program_name: "프로그램 이름",
    numOfRates: 3,
    price: "100,000원",
    available: ["10:00", "20:00"],
  },
  {
    id: 3,
    business_name: "업체 이름",
    program_name: "프로그램 이름",
    price: "100,000원",
    numOfRates: 3,
    available: ["10:00", "20:00"],
  },
  {
    id: 4,
    business_name: "업체 이름",
    program_name: "프로그램 이름",
    numOfRates: 3,
    price: "100,000원",
    available: ["10:00", "20:00"],
  },
  {
    id: 5,
    business_name: "업체 이름",
    program_name: "프로그램 이름",
    numOfRates: 3,
    price: "100,000원",
    available: ["10:00", "20:00"],
  },
  {
    id: 6,
    business_name: "업체 이름",
    program_name: "프로그램 이름",
    numOfRates: 3,
    price: "100,000원",
    available: ["10:00", "20:00"],
  },
  {
    id: 7,
    business_name: "업체 이름",
    program_name: "프로그램 이름",
    numOfRates: 3,
    price: "100,000원",
    available: ["10:00", "20:00"],
  },
  {
    id: 8,
    business_name: "업체 이름",
    program_name: "프로그램 이름",
    numOfRates: 3,
    price: "100,000원",
    available: ["10:00", "20:00"],
  },
];

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
const SearchContainer = styled.div`
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

/* Filter */
const FilterContainer = styled.div`
  width: 80%;
  height: 400px;
  display: flex;
  flex-direction: column;
`;

const SportsFilter = styled.div`
  height: 40px;
  align-items: center;
  gap: 10px;
  display: flex;
  justify-content: flex-end;
  h3 {
    font-weight: bold;
  }
`;

// const SportsTag = styled.div`
//   padding: 4px 8px;
//   border-radius: 6px;
//   border: 2px solid var(--color-gray);
//   font-size: var(--font-size-s);
//   cursor: pointer;
//   &:hover {
//     background-color: var(--color-blue-vivid);
//   }
//   transition: all 0.2s ease-in-out;
// `;

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

/* Program */
const ProgramContainer = styled.div`
  width: 80%;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
`;

export default function Program() {
  return (
    <Body>
      <Wrapper>
        <SearchContainer>
          <Input placeholder="키워드를 입력하세요" />
          <SearchButton>검색</SearchButton>
        </SearchContainer>
        <FilterContainer>
          <SportsFilter>
            <h3>종목</h3>
            {["서핑", "스쿠버다이빙", "패들보드", "잠수", "낚시"].map(
              (e, i) => {
                return (
                  <SportsTag
                    key={i}
                    color={"#ff4d4d"}
                    text={e}
                    bgColor={"#ffcccc"}
                    hoverColor={"#ffb8b8"}
                  />
                );
              }
            )}
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
          {programSample.map((program, index) => {
            return <ProgramItem program={program} key={index} />;
          })}
        </ProgramContainer>
      </Wrapper>
    </Body>
  );
}
