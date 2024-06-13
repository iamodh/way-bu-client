import { Link, useLocation } from "react-router-dom";
import { styled } from "styled-components";
import SportsTag from "./components/SportsTag";
import StarAvgContainer from "./components/StarAvgContainer";
import { addCommaintoMoney } from "../../../libs/formatter";
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 100px;
`;

const Title = styled.h1`
  padding: var(--padding-13xl) 0;
  text-align: center;
  font-size: var(--font-size-xxl);
  font-weight: 700;
  color: var(--color-blue-main);
`;

const Programs = styled.div`
  margin: 0 auto;
  display: flex;
  gap: 32px;
  a {
    width: 300px;
    background-color: var(--color-skyblue-light);
    border-radius: var(--br-xl);
    padding: var(--padding-13xl);
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
    &:hover {
      background-color: #ceebf3a1;
    }
  }
  @media only screen and (max-width: 376px) {
    flex-direction: column;
  }
`;

const Program = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--gap-base);
`;

const Thumbnail = styled.div`
  width: 240px;
  height: 240px;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url(${(props) => props.$imageUrl});
`;

const Tags = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: var(--gap-5xs);
`;

const Name = styled.div`
  h2 {
    font-weight: 700;
    font-size: var(--font-size-l);
  }
  h3 {
    font-size: var(--font-size-l);
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }
`;

const RowBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--gap-5xs);
`;
const Row = styled.div`
  display: flex;
`;

const Col = styled.div`
  &:first-child {
    font-weight: 700;
    flex: 1.2;
  }
  &:nth-child(2) {
    flex: 2;
  }
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`;

export default function ComparePrograms() {
  const location = useLocation();
  return (
    <Wrapper>
      <Title>비교하기</Title>

      <Programs>
        {location.state.map((program) => (
          <Link to={`/program/${program.id}`}>
            <Program>
              <Thumbnail $imageUrl={program.thumbnail} />
              <Tags>
                <SportsTag
                  themeColor={program.SPORT.theme_color}
                  key={program.SPORT.id}
                  text={program.SPORT.title}
                />
                <SportsTag
                  themeColor={program.BEACH.theme_color}
                  key={program.BEACH.id}
                  text={program.BEACH.beach_name}
                />
              </Tags>
              <Name>
                <h2>{program.BUSINESS.business_name}</h2>
                <h3>: {program.program_name}</h3>
              </Name>
              <RowBox>
                <Row>
                  <Col>별점</Col>
                  <Col>
                    <StarAvgContainer programId={program.id} />
                  </Col>
                </Row>
                <Row>
                  <Col>가격</Col>
                  <Col>{addCommaintoMoney(program.price)}원</Col>
                </Row>
              </RowBox>
              <RowBox>
                <Row>
                  <Col>커리큘럼</Col>
                  <Col>
                    {program.curriculum ? program.curriculum : "제공되지 않음"}
                  </Col>
                </Row>
                <Row>
                  <Col>난이도</Col>
                  <Col>{program.difficulty}</Col>
                </Row>
                <Row>
                  <Col>인원</Col>
                  <Col>최대 {program.max_people}명</Col>
                </Row>
              </RowBox>
              <RowBox>
                <Row>
                  <Col>운영시간</Col>
                  <Col>
                    {program.open_time.substring(0, 5)} ~{" "}
                    {program.close_time.substring(0, 5)}
                  </Col>
                </Row>
                <Row>
                  <Col>대여용품</Col>
                  <Col>{program.supply ? program.supply : "없음"}</Col>
                </Row>
                <Row>
                  <Col>제한사항</Col>
                  <Col>
                    {program.restriction ? program.restriction : "없음"}
                  </Col>
                </Row>
              </RowBox>
            </Program>
          </Link>
        ))}
      </Programs>
    </Wrapper>
  );
}
