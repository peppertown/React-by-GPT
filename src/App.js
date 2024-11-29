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
import AddWordPage from "./components/AddWordPage";
import EditWordPage from "./components/EditWordPage"; // EditWordPage import
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app">
        <h1>공부</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/words/:date" element={<WordListWrapper />} />
          <Route path="/add-word" element={<AddWordPage />} />
          <Route path="/edit-word/:id" element={<EditWordPage />} />
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
      <Quote />
      <Calendar />
    </div>
  );
};

// 날짜를 prop으로 전달하는 Wrapper 컴포넌트
const WordListWrapper = () => {
  const { date } = useParams(); // useParams를 이용해 URL에서 날짜를 가져옵니다.
  const [year, month, day] = date.split("-").map(Number);
  const parsedDate = new Date(year, month - 1, day);
  return <WordList date={parsedDate} />;
};

export default App;
