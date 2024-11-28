import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from "react-router-dom";
import Calendar from "./components/Calendar";
import Quote from "./components/Quote";
import BottomNav from "./components/BottomNav";
import WordList from "./components/WordList";
import EditWord from "./components/EditWord";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app">
        <h1>공부</h1>
        <Routes>
          <Route path="/words/:date" element={<WordListWrapper />} />
          <Route path="/" element={<Home />} />
          <Route path="/words/:date" element={<WordListWrapper />} />
          <Route path="/edit-word" element={<EditWord />} />{" "}
          {/* 수정 페이지 라우트 추가 */}
          <Route path="/" element={<Home />} />
        </Routes>
        <BottomNav />
      </div>
    </Router>
  );
}

// 홈 화면 컴포넌트
const Home = () => {
  return (
    <div>
      <Quote /> {/* 홈 화면에서는 Quote 컴포넌트가 보여야 함 */}
      <Calendar />
    </div>
  );
};

// 날짜를 prop으로 전달하는 Wrapper 컴포넌트
const WordListWrapper = () => {
  const { date } = useParams();
  const [year, month, day] = date.split("-").map(Number);
  const parsedDate = new Date(year, month - 1, day); // month는 0부터 시작하므로 -1
  return <WordList date={parsedDate} showAddButton={false} />; // Add Word 버튼 숨기기
};

export default App;
