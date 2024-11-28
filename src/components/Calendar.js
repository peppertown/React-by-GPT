import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Calendar.css";

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [registeredDates, setRegisteredDates] = useState([]); // 등록된 날짜를 저장
  const navigate = useNavigate();

  // 백엔드에서 등록된 날짜 가져오기
  useEffect(() => {
    const fetchRegisteredDates = async () => {
      try {
        const response = await fetch("http://localhost:824/word/registered"); // API URL 확인
        if (!response.ok) {
          throw new Error("Failed to fetch registered dates");
        }
        const data = await response.json();
        setRegisteredDates(data); // 등록된 날짜를 상태에 저장
      } catch (error) {
        console.error("Error fetching registered dates:", error);
      }
    };

    fetchRegisteredDates();
  }, []); // 최초 한 번만 실행

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
      const date = `${year}-${String(month + 1).padStart(2, "0")}-${String(
        day
      ).padStart(2, "0")}`;

      const isRegistered = registeredDates.includes(date); // 해당 날짜가 등록된 날짜인지 확인

      days.push(
        <div
          key={day}
          className={`day ${isRegistered ? "registered" : ""}`}
          onClick={() => navigate(`/words/${date}`)}
        >
          {day}
          {isRegistered && <span className="checkmark">✔</span>}{" "}
          {/* 체크 표시 */}
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
