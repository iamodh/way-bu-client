import styled from "styled-components";
import BlueButton from "./components/BlueButton";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 576px;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: var(--padding-base) var(--padding-13xl);
  gap: 10px;
`;

const InputRow = styled.div`
  display: flex;
  align-items: center;
`;

const InputCol = styled.div`
  &:first-child {
    flex: 1;
  }
  &:nth-child(2) {
    flex: 2;
  }

  input {
    width: 100%;
    height: 47px;
    border: 1px solid var(--color-gray);
    &:focus {
      outline: none;
      border: 1px solid var(--color-blue-main);
    }
    border-radius: var(--br-8xs);
    padding: var(--padding-base);
    @media only screen and (max-width: 376px) {
      height: 30px;
    }
  }
  label {
    font-size: var(--font-size-l);
    @media only screen and (max-width: 376px) {
      font-size: 14px;
    }
  }
`;

const Buttons = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  padding: var(--padding-13xl) 0;
  @media only screen and (max-width: 376px) {
    padding: var(--padding-base);
  }

  button {
    @media only screen and (max-width: 376px) {
      height: 40px;
      width: 100px;
      font-size: var(--font-size-m);
    }
  }
`;

export default function ProgramBooking() {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.state);
  return (
    <Wrapper>
      <Form>
        <InputRow>
          <InputCol>
            <label htmlFor="name">예약자 이름</label>
          </InputCol>
          <InputCol>
            <input type="text" id="name" />
          </InputCol>
        </InputRow>
        <InputRow>
          <InputCol>
            <label htmlFor="phone">예약자 연락처</label>
          </InputCol>
          <InputCol>
            <input type="text" id="phone" />
          </InputCol>
        </InputRow>
        <InputRow>
          <InputCol>
            <label htmlFor="total_people">예약 인원</label>
          </InputCol>
          <InputCol>
            <input type="text" id="total_people" />
          </InputCol>
        </InputRow>
        <InputRow>
          <InputCol>
            <label htmlFor="date">날짜</label>
          </InputCol>
          <InputCol>
            <input type="date" id="date" />
          </InputCol>
        </InputRow>
        <InputRow>
          <InputCol>
            <label htmlFor="time">시간</label>
          </InputCol>
          <InputCol>
            <input type="time" id="time" />
          </InputCol>
        </InputRow>
        <InputRow>
          <InputCol>
            <label htmlFor="options">추가 옵션</label>
          </InputCol>
          <InputCol>
            <input
              type="text"
              id="options"
              disabled
              defaultValue={
                location.state.opt1 +
                `${location.state.opt2 && ", "}` +
                location.state.opt2
              }
            />
          </InputCol>
        </InputRow>
        <InputRow>
          <InputCol>
            <label htmlFor="request">요구 사항</label>
          </InputCol>
          <InputCol>
            <input type="text" id="request" />
          </InputCol>
        </InputRow>
        <Buttons>
          <BlueButton
            onClick={(event) => {
              event.preventDefault();
              navigate(-1);
            }}
            text={"되돌아가기"}
            width={"160px"}
            height={"56px"}
            bgColor={"var(--color-white)"}
            textColor={"var(--color-blue-main)"}
            fontSize={"var(--font-size-l)"}
            hoverColor={"var(--color-skyblue-main)"}
          />
          <BlueButton
            text={"예약하기"}
            width={"160px"}
            height={"56px"}
            fontSize={"var(--font-size-l)"}
            onClick={(event) => {
              event.preventDefault();
              alert("예약이 완료되었습니다.");
              navigate("/program");
            }}
          />
        </Buttons>
      </Form>
    </Wrapper>
  );
}
