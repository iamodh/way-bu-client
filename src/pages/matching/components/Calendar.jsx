import React, { useState, useEffect } from "react";
import styled from "styled-components";

const CalendarContainer = styled.div`
  padding: var(--padding-base);
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const YearMonth = styled.div`
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: aliceblue;
  margin: 0 20%;
  gap: var(--gap-3xs);
`;

const Year = styled.div`
  font-size: var(--font-size-xl);
  font-weight: bold;
`;

const Month = styled.div`
  font-size: var(--font-size-xl);
  font-weight: bold;
`;

const DayContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--gap-base);
  padding: var(--padding-xs) var(--padding-xl);
  margin-top: 20px;
  margin-bottom: 15px;
`;

const Day = styled.div`
  display: flex;
  align-items: center;
`;

const DateButton = styled.button`
  font-size: var(--font-size-ml);
  font-weight: bold;
  padding: 15px 50px;
  width: 150px;
  height: 70px;
  color: var(--color-blue-main);
  border-radius: 15px;
  border: 1px var(--color-blue-main) solid;
  background-color: transparent;
  cursor: pointer;
  &:hover {
    background-color: var(--color-blue-light);
    color: white;
  }

  @media screen and (max-width: 376px) {
    width: 120px;
    height: 50px;
    padding-bottom: 50px;
  }
`;

const DayLabel = styled.div`
  font-size: var(--font-size-s);
  color: ${props => props.isSunday ? 'red' : 'var(--color-navy)'&& props.isSaturday ? 'blue' : 'var(--color-navy)'};
  @media screen and (max-width: 376px) {
    margin-bottom: 10px;
  }
`;

const ButtonContainer = styled.div`
  button {
    margin: 0 10px;
    padding: 10px 30px;
    font-size: var(--font-size-m);
    border-radius: 10px;
    border: none;
    box-shadow: 1px 1px 1px 1px gainsboro;
    background-color: transparent;
    font-weight: bold;
    color: var(--color-blue-light);
    cursor: pointer;
  }

  button:disabled {
    cursor: not-allowed;
    opacity: 0.33;
  }

  button:hover {
    background-color: var(--color-blue-light);
    color: white;
  }
`;

const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState('');

  useEffect(() => {
    setCurrentMonth((currentDate.getMonth() + 1) + '월');
  }, [currentDate]);

  const getNextDays = (startDate) => {
    let dates = [];
    let currentDay = new Date(startDate);

    for (let i = 0; i < 7; i++) {
      dates.push(new Date(currentDay));
      currentDay.setDate(currentDay.getDate() + 1);
    }

    return dates;
  };

  const changeWeek = (weeks) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + weeks * 7);
    setCurrentDate(newDate);
  };

  const nextDays = getNextDays(currentDate);

  const previousWeekDisabled = () => {
    const startWeek = new Date(currentDate);
    startWeek.setDate(startWeek.getDate() - startWeek.getDay());
    return startWeek <= new Date();
  };

  const nextWeekDisabled = () => {
    const twoWeeksLater = new Date();
    twoWeeksLater.setDate(twoWeeksLater.getDate() + 14);
    const endWeek = new Date(currentDate);
    endWeek.setDate(endWeek.getDate() + 6);
    return endWeek >= twoWeeksLater;
  };

  return (
    <CalendarContainer>
      <YearMonth>
        <Year>{currentDate.getFullYear()}년</Year>
        <Month>{currentMonth}</Month>
      </YearMonth>
      <DayContainer>
        {nextDays.map((date, index) => (
          <Day key={index}>
            <DateButton>{date.getDate()}
              <DayLabel isSunday={date.getDay() === 0} isSaturday={date.getDay() === 6}>{daysOfWeek[date.getDay()]}</DayLabel>
            </DateButton>
          </Day>
        ))}
      </DayContainer>
      <ButtonContainer>
        <button onClick={() => changeWeek(-1)} disabled={previousWeekDisabled()}>이전</button>
        <button onClick={() => changeWeek(1)} disabled={nextWeekDisabled()}>다음</button>
      </ButtonContainer>
    </CalendarContainer>
  );
};

export default Calendar;
