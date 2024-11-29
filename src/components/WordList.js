import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const WordList = ({ date }) => {
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { date: urlDate } = useParams(); // URL에서 날짜를 가져옵니다.

  useEffect(() => {
    // 서버에서 단어 데이터를 받아오는 부분
    const fetchWords = async () => {
      try {
        // 여기에 실제 API 호출을 넣습니다.
        const response = await fetch(`/word?date=${urlDate}`);
        const data = await response.json();

        if (data.words) {
          setWords(data.words); // 서버에서 받아온 단어 목록을 상태에 저장
        } else {
          setWords([]); // 만약 words가 없다면 빈 배열로 설정
        }
      } catch (error) {
        console.error("단어 데이터를 불러오는 데 실패했습니다:", error);
        setWords([]); // 에러 발생 시 빈 배열로 설정
      } finally {
        setLoading(false); // 로딩 상태 종료
      }
    };

    fetchWords();
  }, [urlDate]);

  const handleAddWordClick = () => {
    navigate("/add-word");
  };

  const handleEditWordClick = (id) => {
    navigate(`/edit-word/${id}`);
  };

  // 로딩 중인 경우 메시지 또는 로딩 표시
  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div>
      <h2>{date.toLocaleDateString()}에 등록된 단어 목록</h2>
      <button onClick={handleAddWordClick}>Add Word</button>
      <div className="word-list">
        {/* words가 존재하고 배열일 때만 map() 호출 */}
        {words && Array.isArray(words) && words.length > 0 ? (
          words.map((word) => (
            <div key={word.id} className="word-item">
              <span>
                {word.word}: {word.mean}
              </span>
              <button onClick={() => handleEditWordClick(word.id)}>Edit</button>
            </div>
          ))
        ) : (
          <div>등록된 단어가 없습니다.</div> // 단어가 없을 때 표시할 내용
        )}
      </div>
    </div>
  );
};

export default WordList;
