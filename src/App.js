import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Calendar from "./components/Calendar";
import EditWord from "./components/EditWord"; // EditWord 컴포넌트도 유지
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app">
        <h1>공부</h1>
        <Routes>
          {/* 필요 없는 페이지들 삭제 */}
          <Route path="/" element={<Home />} />
          <Route path="/edit-word" element={<EditWord />} />{" "}
          {/* EditWord 라우트 유지 */}
        </Routes>
      </div>
    </Router>
  );
}

// 홈 화면 컴포넌트
const Home = () => {
  return (
    <div>
      <Calendar /> {/* Calendar 컴포넌트 유지 */}
    </div>
  );
};

export default App;
