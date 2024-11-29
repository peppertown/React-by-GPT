import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/WordList.css";

const WordList = () => {
  const { date } = useParams();
  const [words, setWords] = useState([]);
  const navigate = useNavigate();

  // 해당 날짜에 등록된 단어 목록 가져오기
  useEffect(() => {
    const fetchWords = async () => {
      try {
        const response = await fetch(`http://localhost:824/word?date=${date}`);
        if (!response.ok) {
          throw new Error("단어 데이터를 불러오는 데 실패했습니다.");
        }
        const data = await response.json();
        setWords(data.words); // 단어 목록 업데이트
      } catch (error) {
        console.error("Error fetching words:", error);
      }
    };

    fetchWords();
  }, [date]); // date가 변경될 때마다 단어 목록을 다시 가져옴

  return (
    <div className="word-list">
      <h2>{date}에 등록된 단어 목록</h2>
      <div className="table">
        <div className="table-header">
          <div className="header-cell">단어</div>
          <div className="header-cell">뜻</div>
        </div>
        <div className="table-body">
          {words.length === 0 ? (
            <div>등록된 단어가 없습니다.</div>
          ) : (
            words.map((word) => (
              <div key={word.id} className="table-row">
                <div className="table-cell">{word.word}</div>
                <div className="table-cell">{word.mean}</div>
              </div>
            ))
          )}
        </div>
      </div>
      <button className="add-word" onClick={() => navigate("/edit-word")}>
        단어 추가
      </button>
    </div>
  );
};

export default WordList;
