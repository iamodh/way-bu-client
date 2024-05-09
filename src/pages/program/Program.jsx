import { useQuery } from "react-query";
import { getPrograms } from "../../../apis/program";
import { styled } from "styled-components";
import SportTag from "../../components/SportTag";
import ButtonBlue from "../../components/ButtonBlue";
import Rating from "react-simple-star-rating";
import { useState } from "react";

const Span = styled.span`
  font-size: var(--font-size-l);
  line-height: 1.5rem;
`;
const SpanBold = styled(Span)`
  font-weight: bold;
`;
const H3 = styled.h3`
  font-size: var(--font-size-xl);
  font-weight: 900;
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
  max-width: 600px;
  margin: var(--padding-xl) auto;
  border: 1px solid var(--color-blue-main);
  border-radius: var(--br-mini);
  background-color: var(--color-white);
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
  justify-content: space-between;
  height: 80px;
  margin: var(--padding-xl) 0;
`;
const DateAndTime = styled.div`
  display: flex;
  min-width: 100px;
  width: 48%;
  height: 100%;
  border: 1px solid var(--color-gray);
  border-radius: var(--br-mini);
  background-color: var(--color-white);
`;
const Date = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  min-width: 50px;
  height: 100%;
  border-right: 1px solid var(--color-gray);
`;
const Time = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  min-width: 50px;
  height: 100%;
`;
const Price = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 50px;
  width: 24%;
  height: 100%;
  border: 1px solid var(--color-gray);
  border-radius: var(--br-mini);
  background-color: var(--color-white);
`;
const Location = styled(Price)``;
const DetailFilter = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--padding-base);
  width: 100%;
  min-width: 1000px;
  margin: 0 auto;
  padding: var(--padding-13xl) 0;
  background-color: var(--color-white);
  border: 1px solid var(--color-gray);
  border-radius: var(--br-mini);
`;
const InputRow = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 var(--padding-41xl);
`;
const RowName = styled.label`
  font-weight: 900;
  width: 20%;
  min-width: 200px;
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
const SortOption = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: var(--padding-base);
`;
const GridBox = styled.div`
  display: grid;
  width: 1000px;
  max-height: 2400px;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: var(--padding-xl);
  grid-row-gap: var(--padding-41xl);
  justify-items: center;
`;
const GridItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 300px;
  height: 450px;
  padding: var(--padding-base);
  background-color: var(--color-white);
  border: 1px solid var(--color-gray);
  border-radius: var(--br-mini);
`;
const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: var(--padding-base) 0;
`;

export default function Program() {
  const [rating, setRating] = useState(0);
  const handleRating = (rate) => {
    setRating(rate);
  };
  const onPointerEnter = () => console.log("Enter");
  const onPointerLeave = () => console.log("Leave");
  const onPointerMove = (value, index) => console.log(value, index);
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
          {["서핑", "요트", "패들보드", "카약", "모터보트"].map((str, i) => {
            return <SportTag text={str} key={i} />;
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
          {[1, 2, 3, 4, 5].map((str, i) => (
            <GridItem key={i}>
              <img src="/img/ellipse-13@2x.png" alt="image" />
              <TextBox>
                <H3>프로그램명{str}</H3>
                <Span>150,000원</Span>
                <Span>10:00 - 18:00</Span>
              </TextBox>
              <ButtonBlue text="비교하기" />
            </GridItem>
          ))}
        </GridBox>
      </ProgramContainer>
    </Wrapper>
  );
}
