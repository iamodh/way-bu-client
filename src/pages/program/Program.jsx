import { useQuery } from "react-query";
import { styled } from "styled-components";
import SportTag from "../../components/SportTag";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import ProgramItem from "../../components/ProgramItem";
import { client } from "../../../libs/supabase";
import { QueryClient, QueryClientProvider } from "react-query";
import ButtonBlue from "../../components/ButtonBlue";

const Span = styled.span`
  font-size: var(--font-size-m);
  line-height: 1.5rem;
`;
const SpanBold = styled(Span)`
  font-weight: bold;
  margin: 0 var(--padding-3xs);
`;
const Wrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  font-size: var(--font-size-m);
  font-family: "Pretendard-regular";
`;
const SearchContainer = styled.form`
  display: flex;
  height: 60px;
  width: 50%;
  max-width: 500px;
  min-width: 300px;
  margin: var(--padding-xl) auto;
  border: 1px solid var(--color-blue-main);
  border-radius: var(--br-mini);

  @media screen and (max-width: 768px) {
    height: 40px;
  }
`;
const SearchInput = styled.input`
  width: 100%;
  border: none;
  border-radius: var(--br-mini) 0 0 var(--br-mini);
  padding: var(--padding-3xs);
  font-size: inherit;
`;
const IconBox = styled.button`
  width: 80px;
  background-color: var(--color-blue-main);
  border: none;
  border-radius: 0 var(--br-mini) var(--br-mini) 0;
  &:hover {
    background-color: var(--color-navy);
  }
`;
const Message = styled.div`
  margin-top: 20px;
  text-align: center;
  font-weight: bold;
  color: var(--color-blue-main);
  background-color: var(--color-skyblue-background);
`;
const FilterContainer = styled.form`
  width: 80%;
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  position: relative;
`;
const Sports = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const SprotsList = styled.div`
  display: flex;
  align-content: center;
  flex-wrap: wrap;
  gap: 4px;
  margin: var(--padding-xs) auto;
  white-space: normal;
`;
const MainFilter = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 80px;
  margin: var(--padding-xl) auto;
  @media screen and (max-width: 768px) {
    height: 60px;
  }
`;

const DateAndTime = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 60px;
  width: 48%;
  font-size: var(--font-size-m);
  border: 1px solid var(--color-gray);
  border-radius: var(--br-mini);
`;
const Date = styled.input`
  width: 50%;
  border: none;
  border-radius: 0px;
  border-right: 1px solid var(--color-gray);
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 30px;
  font-size: var(--font-size-m);
  cursor: pointer;
  @media screen and (max-width: 768px) {
    min-width: 15px;
  }
`;
const Time = styled.input`
  width: 50%;
  border: none;
  border-radius: 0px;
  border-right: 1px solid var(--color-gray);
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 30px;
  font-size: var(--font-size-m);
  cursor: pointer;
  @media screen and (max-width: 768px) {
    min-width: 15px;
  }
`;
const Price = styled.input`
  display: flex;
  min-width: 30px;
  width: 24%;
  height: 100%;
  padding: 0 var(--padding-base);
  font-size: var(--font-size-m);
  border: 1px solid var(--color-gray);
  border-radius: var(--br-mini);
  cursor: pointer;
  @media screen and (max-width: 768px) {
    min-width: 15px;
  }
`;
const Dropdown = styled.select`
  display: flex;
  min-width: 30px;
  width: 24%;
  height: 100%;
  padding: 0 var(--padding-xl);
  font-size: var(--font-size-m);
  border: 1px solid var(--color-gray);
  border-radius: var(--br-mini);
  cursor: pointer;
  @media screen and (max-width: 8px) {
    min-width: 15px;
  }
`;
const DetailFilter = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--padding-base);
  width: 100%;
  min-width: 500px;
  margin: 0 auto;
  padding: var(--padding-13xl) 0;
  background-color: var(--color-white);
  border: 1px solid var(--color-gray);
  border-radius: var(--br-mini);
  @media screen and (max-width: 768px) {
    font-size: var(--font-size-m);
    min-width: 320px;
  }
`;
const InputRow = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 5%;
`;
const RowName = styled.label`
  font-weight: 900;
  width: 20%;
  min-width: 100px;
`;
const Checkbox = styled.input`
  display: none;
  &:checked + label {
    color: var(--color-blue-main);
    font-weight: 900;
  }
`;
const CheckboxLabel = styled.label`
  color: var(--color-gray);
  cursor: pointer;
  margin-right: var(--padding-base);
  &:hover {
    color: var(--color-navy);
  }
`;
const NumberInput = styled.input`
  font-size: var(--font-size-l);
  min-width: 100px;
  width: 10%;
  padding: 2px var(--padding-3xs);
`;
const ButtonContainer = styled.div`
  display: flex;
  position: absolute;
  right: 20px;
  bottom: 20px;
`;
const ProgramContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  background-color: cyan;
`;
const SortOption = styled(Span)`
  display: flex;
  justify-content: flex-end;
  margin: var(--padding-base);
`;
const GridBox = styled.div`
  display: grid;
  width: 100%;
  margin: 0 auto;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-column-gap: var(--padding-base);
  grid-row-gap: var(--padding-xl);
  justify-items: center;
  @media screen and (max-width: 900px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media screen and (max-width: 426px) {
    width: 400px;
    grid-template-columns: 1fr;
  }
`;

export default function Program() {
  /* DB - sports */
  const [sports, setSports] = useState();
  const [sportsLoading, setSportsLoading] = useState(true);

  useEffect(() => {
    getSports();
    getPrograms();
  }, []);

  async function getSports() {
    const { data, error } = await client.from("SPORT").select();
    setSports(data);
    setSportsLoading(false);
    if (error) {
      console.log(error.message);
      return;
    }
  }

  /* Date */
  const [selectedDate, setSelectedDate] = useState();
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  /* Dropdown */

  /* DB - programs */
  const [programs, setPrograms] = useState([]);
  const [programLoading, setProgramLoading] = useState(true);

  async function getPrograms() {
    const { data, error } = await client.from("PROGRAM").select();
    setPrograms(data);
    setProgramLoading(false);
    if (error) {
      console.log(error.message);
      return;
    }
  }

  // function getPrograms() {
  //   return fetch("http://localhost:4000/api/program").then((response) =>
  //     response.json()
  //   );
  // }

  // const { isLoading: programLoading, data: programData } = useQuery(
  //   ["programs"],
  //   getPrograms
  // );

  /* form */
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onValid = (data) => {
    console.log(data);
    reset();
  };

  return (
    <Wrapper>
      <Message>{errors?.keyword?.message}</Message>
      <SearchContainer onSubmit={handleSubmit(onValid)}>
        <SearchInput
          {...register("keyword", {
            required: "검색어가 입력되지 않았습니다!!",
          })}
          type="text"
          placeholder="검색어를 입력해주세요."
        />
        <IconBox>
          <img src="/icon/search_white.svg" alt="search" />
        </IconBox>
      </SearchContainer>
      <FilterContainer>
        <Sports>
          <SpanBold>종목</SpanBold>

          {sportsLoading ? (
            "Loading..."
          ) : (
            <SprotsList>
              {sports.map((s) => (
                <SportTag sport={s} key={s.id} />
              ))}
            </SprotsList>
          )}
        </Sports>
        <MainFilter>
          <DateAndTime>
            <Date
              type="date"
              name="dateCondition"
              value={selectedDate}
              onChange={handleDateChange}
              min={"2024-01-01"}
              max={"2024-12-31"}
              defaultValue={"2024-05-20"}
            />
            <Time type="time" />
          </DateAndTime>
          <Price type="number" placeholder="가격" />
          <Dropdown>
            <option value="">지역</option>
            <option value="location1">광안리</option>
            <option value="location2">해운대</option>
            <option value="location3">다대포</option>
            <option value="location4">송정</option>
            <option value="location5">송도</option>
          </Dropdown>
        </MainFilter>
        <DetailFilter>
          <InputRow>
            <RowName>난이도</RowName>
            <Checkbox type="checkbox" value="상" name="level" id="level1" />
            <CheckboxLabel htmlFor="level1">상</CheckboxLabel>
            <Checkbox type="checkbox" value="중" name="level" id="level2" />
            <CheckboxLabel htmlFor="level2">중</CheckboxLabel>
            <Checkbox type="checkbox" value="하" name="level" id="level3" />
            <CheckboxLabel htmlFor="level3">하</CheckboxLabel>
          </InputRow>
          <InputRow>
            <RowName>예약방식</RowName>
            <Checkbox
              type="checkbox"
              value="way-bu"
              name="method"
              id="way-bu"
            />
            <CheckboxLabel htmlFor="way-bu">WAY-BU 예약</CheckboxLabel>
            <Checkbox type="checkbox" value="link" name="method" id="link" />
            <CheckboxLabel htmlFor="link">예약 링크</CheckboxLabel>
          </InputRow>
          <InputRow>
            <RowName>나이대</RowName>
            <Checkbox type="checkbox" value="10" name="age" id="10" />
            <CheckboxLabel htmlFor="10">10세 이하 포함</CheckboxLabel>
            <Checkbox type="checkbox" value="14" name="age" id="14" />
            <CheckboxLabel htmlFor="14">14세 이하 포함</CheckboxLabel>
          </InputRow>
          <InputRow>
            <RowName>인원</RowName>
            <NumberInput type="number" />
          </InputRow>
          <InputRow>
            <RowName>프로그램 기간</RowName>
            <Checkbox type="checkbox" value="way-bu" name="term" id="long" />
            <CheckboxLabel htmlFor="long">장기</CheckboxLabel>
            <Checkbox type="checkbox" value="link" name="term" id="short" />
            <CheckboxLabel htmlFor="short">단기</CheckboxLabel>
            <Checkbox type="checkbox" value="link" name="term" id="oneday" />
            <CheckboxLabel htmlFor="oneday">하루</CheckboxLabel>
          </InputRow>
        </DetailFilter>
        <ButtonContainer>
          <ButtonBlue text={"필터 적용하기"} size={"m"} />
        </ButtonContainer>
      </FilterContainer>
      <ProgramContainer>
        <SortOption>
          {["인기순", "가격 높은순", "별점 높은순"].map((str, i) => {
            return (
              <div key={i}>
                <Checkbox type="radio" value={str} name="sortOption" id={i} />
                <CheckboxLabel htmlFor={i}>{str}</CheckboxLabel>
              </div>
            );
          })}
        </SortOption>
        {programLoading ? (
          "Loading..."
        ) : (
          <GridBox>
            {programs.map((p) => (
              <ProgramItem program={p} key={p.id} />
            ))}
          </GridBox>
        )}
      </ProgramContainer>
    </Wrapper>
  );
}
