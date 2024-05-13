import { useQuery } from "react-query";
import { getPrograms } from "../../../apis/program";
import { styled } from "styled-components";
import SportTag from "../../components/SportTag";
import { useState } from "react";
import ProgramItem from "../../components/ProgramItem";

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
const Span = styled.span`
  font-size: var(--font-size-l);
  line-height: 1.5rem;
  @media screen and (max-width: 768px) {
    font-size: var(--font-size-m);
  }
`;
const SpanBold = styled(Span)`
  font-weight: bold;
`;
const Wrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  font-size: var(--font-size-l);
  font-family: "Pretendard-regular";
`;
const SearchContainer = styled.div`
  display: flex;
  height: 60px;
  width: 50%;
  min-width: 300px;
  margin: var(--padding-xl) auto;
  border: 1px solid var(--color-blue-main);
  border-radius: var(--br-mini);
  @media screen and (max-width: 768px) {
    font-size: var(--font-size-m);
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
const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const Sports = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 32px;
  gap: 4px;
  margin: 0 auto;
`;
const MainFilter = styled.div`
  display: flex;
  justify-content: space-around;
  width: 80%;
  height: 80px;
  margin: var(--padding-xl) auto;
  @media screen and (max-width: 768px) {
    height: 60px;
  }
`;
const Price = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 30px;
  width: 24%;
  height: 100%;
  border: 1px solid var(--color-gray);
  border-radius: var(--br-mini);
  @media screen and (max-width: 768px) {
    font-size: var(--font-size-m);
    min-width: 15px;
  }
`;
const DateAndTime = styled(Price)`
  min-width: 60px;
  width: 48%;
`;
const Date = styled(Price)`
  width: 50%;
  border: none;
  border-radius: 0px;
  border-right: 1px solid var(--color-gray);
`;
const Time = styled(Price)`
  width: 50%;
  border: none;
  border-radius: 0px;
`;
const Location = styled(Price)``;
const DetailFilter = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--padding-base);
  width: 80%;
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
const Radio = styled.input`
  display: none;
  &:checked + label {
    color: var(--color-blue-main);
    font-weight: 900;
  }
`;
const RadioLabel = styled.label`
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
const ProgramContainer = styled.div`
  width: 100%;
`;
const SortOption = styled(Span)`
  display: flex;
  justify-content: flex-end;
  margin: var(--padding-base);
`;
const GridBox = styled.div`
  display: grid;
  width: 1000px;
  margin: 0 auto;
  max-height: 2400px;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: var(--padding-xl);
  grid-row-gap: var(--padding-41xl);
  justify-items: center;
  @media screen and (max-width: 1100px) {
    width: 600px;
    grid-template-columns: 1fr 1fr;
  }
  @media screen and (max-width: 600px) {
    width: 400px;
    grid-template-columns: 1fr;
  }
`;

const sportsSample = [
  { name: "수영", theme: "red" },
  { name: "서핑", theme: "orange" },
  { name: "요트", theme: "mint" },
  { name: "카약", theme: "green" },
];

export default function Program() {
  return (
    <Wrapper>
      <SearchContainer>
        <SearchInput placeholder="검색어를 입력해주세요." />
        <IconBox>
          <img src="/icon/search.svg" alt="search" />
        </IconBox>
      </SearchContainer>
      <FilterContainer>
        <Sports>
          <SpanBold>종목</SpanBold>
          {sportsSample.map((e, i) => {
            return <SportTag prop={e} key={i} />;
          })}
        </Sports>
        <MainFilter>
          <DateAndTime>
            <Date>날짜</Date>
            <Time>시간</Time>
          </DateAndTime>
          <Price>가격</Price>
          <Location>지역</Location>
        </MainFilter>
        <DetailFilter>
          <InputRow>
            <RowName>난이도</RowName>
            <Radio type="checkbox" value="상" name="level" id="level1" />
            <RadioLabel htmlFor="level1">상</RadioLabel>
            <Radio type="checkbox" value="중" name="level" id="level2" />
            <RadioLabel htmlFor="level2">중</RadioLabel>
            <Radio type="checkbox" value="하" name="level" id="level3" />
            <RadioLabel htmlFor="level3">하</RadioLabel>
          </InputRow>
          <InputRow>
            <RowName>예약방식</RowName>
            <Radio type="checkbox" value="way-bu" name="method" id="way-bu" />
            <RadioLabel htmlFor="way-bu">WAY-BU 예약</RadioLabel>
            <Radio type="checkbox" value="link" name="method" id="link" />
            <RadioLabel htmlFor="link">예약 링크</RadioLabel>
          </InputRow>
          <InputRow>
            <RowName>나이대</RowName>
            <Radio type="checkbox" value="10" name="age" id="10" />
            <RadioLabel htmlFor="10">10세 이하 포함</RadioLabel>
            <Radio type="checkbox" value="14" name="age" id="14" />
            <RadioLabel htmlFor="14">14세 이하 포함</RadioLabel>
          </InputRow>
          <InputRow>
            <RowName>인원</RowName>
            <NumberInput type="number" />
          </InputRow>
          <InputRow>
            <RowName>프로그램 기간</RowName>
            <Radio type="checkbox" value="way-bu" name="term" id="long" />
            <RadioLabel htmlFor="long">장기</RadioLabel>
            <Radio type="checkbox" value="link" name="term" id="short" />
            <RadioLabel htmlFor="short">단기</RadioLabel>
            <Radio type="checkbox" value="link" name="term" id="oneday" />
            <RadioLabel htmlFor="oneday">하루</RadioLabel>
          </InputRow>
        </DetailFilter>
      </FilterContainer>
      <ProgramContainer>
        <SortOption>
          {["인기순", "가격 높은순", "별점 높은순"].map((str, i) => {
            return (
              <>
                <Radio type="radio" value={str} name="sortOption" id={i} />
                <RadioLabel htmlFor={i}>{str}</RadioLabel>
              </>
            );
          })}
        </SortOption>
        <GridBox>
          {programSample.map((program, idx) => (
            <ProgramItem program={program} width={300} key={idx} />
          ))}
        </GridBox>
      </ProgramContainer>
    </Wrapper>
  );
}
