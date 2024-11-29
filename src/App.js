import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Calendar from "./components/Calendar";
import WordList from "./components/WordList"; // WordList 컴포넌트 추가
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app">
        <h1>공부</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/words/:date" element={<WordList />} />{" "}
          {/* 날짜에 맞는 단어 목록 페이지 */}
        </Routes>
      </div>
    </Router>
  );
}

// 홈 화면 컴포넌트
const Home = () => {
  return (
    <div>
      <Calendar /> {/* Calendar 컴포넌트 추가 */}
    </div>
  );
};

export default App;
