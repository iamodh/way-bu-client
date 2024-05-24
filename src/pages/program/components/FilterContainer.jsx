import { styled } from "styled-components";

const Wrapper = styled.div`
  height: 100px;
  width: 100%;
  background-color: white;
`;

// const FilterContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;
const Sports = styled.div`
  padding: 10px;
  margin: 5px;
  display: flex;
  flex-wrap: wrap;
`;

const Tag = styled.div`
  border: 1px solid #ccc;
  padding: 5px 10px;
  margin: 2px;
`;

const MainFilter = styled.div`
  padding: 10px;
  margin: 5px;
  display: flex;
  align-items: center;
`;

const MainTag = styled.div`
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  margin-right: 10px;
`;

const DetailFilter = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  margin: 5px;
  display: flex;
  flex-direction: column; /* Align rows vertically */
`;

const InputRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const Label = styled.label`
  margin-right: 10px;
`;

const Input = styled.input`
  padding: 5px;
  border: 1px solid #ccc;
`;

export default function FilterContainer() {
  return (
    <Wrapper>
      <Sports>
        <span>종목</span>
        <Tag>서핑</Tag>
        <Tag>수영</Tag>
        <Tag>보트</Tag>
      </Sports>
      <MainFilter>
        <MainTag>
          <Input type="date" />
        </MainTag>
        <MainTag>
          <Input type="time" />
        </MainTag>
        <MainTag>
          <Input placeholder="Price" type="text" />
        </MainTag>
        <MainTag>지역</MainTag>
      </MainFilter>
      <DetailFilter>
        <InputRow>
          <Label>난이도:</Label>
          <Tag>상</Tag>
          <Tag>중</Tag>
          <Tag>하</Tag>
        </InputRow>
        <InputRow>
          <Label>인원:</Label>
          <Input type="number" />
        </InputRow>
        <InputRow>
          <Label htmlFor="name">ㅇㅇ:</Label>
          <Input id="name" type="checkbox" />
        </InputRow>
        <InputRow>
          <Label>기간:</Label>
          <Tag>장기</Tag>
          <Tag>단기</Tag>
        </InputRow>
      </DetailFilter>
    </Wrapper>
  );
}
