import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Calendar.css";

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  // 'YYYY-MM-DD' 형식으로 날짜 저장 (예: "2024-11-05")
  const [registeredWords, setRegisteredWords] = useState([
    "2024-11-05",
    "2024-11-10",
    "2024-11-15",
    "2024-11-24",
  ]);
  const navigate = useNavigate();

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    );
  };

  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    );
  };

  // 'YYYY-MM-DD' 형식으로 비교
  const isWordRegistered = (day) => {
    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    const dateString = date.toISOString().split("T")[0]; // 'YYYY-MM-DD' 형식으로 변환
    return registeredWords.includes(dateString); // 등록된 날짜와 비교
  };

  const renderDays = () => {
    const month = currentMonth.getMonth();
    const year = currentMonth.getFullYear();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="day empty"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const hasWord = isWordRegistered(day); // 해당 날짜에 단어가 등록되어 있는지 확인

      days.push(
        <div
          key={day}
          className={`day ${hasWord ? "has-word" : ""}`} // 단어가 등록된 날에 스타일 추가
          onClick={() =>
            navigate(
              `/words/${year}-${String(month + 1).padStart(2, "0")}-${String(
                day
              ).padStart(2, "0")}`
            )
          }
        >
          {day}
          {hasWord && <span className="checkmark">✔</span>}{" "}
          {/* 체크 표시 추가 */}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="calendar">
      <h2>
        {currentMonth.toLocaleString("default", {
          month: "long",
          year: "numeric",
        })}
      </h2>

      <div className="navigation">
        <button onClick={handlePrevMonth}>&lt;</button>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
      <div className="weekdays">
        <div className="weekday">SUN</div>
        <div className="weekday">MON</div>
        <div className="weekday">TUE</div>
        <div className="weekday">WED</div>
        <div className="weekday">THU</div>
        <div className="weekday">FRI</div>
        <div className="weekday">SAT</div>
      </div>

      <div className="days">{renderDays()}</div>
    </div>
  );
};

export default Calendar;
