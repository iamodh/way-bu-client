import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { styled } from "styled-components";

const StyledDatePicker = styled(DatePicker)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 0%;
  min-width: 30px;
  height: 100%;
  border: none;
  border-radius: 0px;
  /* text-align: center; */
  border-right: 1px solid var(--color-gray);

  font-size: var(--font-size-m);
  cursor: pointer;
  @media screen and (max-width: 768px) {
    min-width: 15px;
  }
  &:focus {
    border: 2px solid colors.$ORANGE;
  }
`;

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <StyledDatePicker
      dateFormat="yyyy.MM.dd" // 날짜 형태
      shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
      minDate={new Date("2024-01-01")} // minDate 이전 날짜 선택 불가
      maxDate={new Date()} // maxDate 이후 날짜 선택 불가
      selected={selectedDate}
      onChange={(date) => setSelectedDate(date)}
    />
  );
};

export default Calendar;
