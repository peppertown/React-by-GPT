import React, { useEffect, useState } from "react";
import axios from "axios";
import AddWordForm from "./AddWordForm"; // AddWordForm 컴포넌트를 불러옵니다
import "../styles/WordList.css";

const WordList = ({ date }) => {
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 상태 관리
  const [isEditing, setIsEditing] = useState(false); // Edit 모드
  const [showAddForm, setShowAddForm] = useState(false); // Add Word 폼
  const [editedWords, setEditedWords] = useState([]); // 수정 중인 단어 목록

  useEffect(() => {
    const fetchWords = async () => {
      try {
        setLoading(true);
        const utcDate = new Date(
          Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
        );
        const response = await axios.get(
          `http://localhost:824/word?date=${
            utcDate.toISOString().split("T")[0]
          }`
        );
        setWords(response.data.words || []);
        setEditedWords(response.data.words || []); // 초기화
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWords();
  }, [date]);

  // Add Word 동작
  const handleAddDone = (newWordData) => {
    setWords([...words, { ...newWordData, id: Date.now() }]);
    setShowAddForm(false); // 폼 닫기
  };

  const handleAddCancel = () => {
    setShowAddForm(false); // 폼 닫기
  };

  // Edit 동작
  const handleEditClick = () => {
    setIsEditing(true);
    setShowAddForm(false); // Add Word 모드 종료
  };

  const handleEditChange = (index, field, value) => {
    const updatedWords = [...editedWords];
    updatedWords[index] = { ...updatedWords[index], [field]: value };
    setEditedWords(updatedWords);
  };

  const handleEditDone = async () => {
    try {
      await Promise.all(
        editedWords.map((word) =>
          axios.put(`http://localhost:824/word/${word.id}`, {
            word: word.word,
            mean: word.mean,
          })
        )
      );
      setWords(editedWords); // 수정된 단어 목록 업데이트
      setIsEditing(false); // 수정 모드 종료
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditCancel = () => {
    setEditedWords(words); // 원래 상태로 복원
    setIsEditing(false); // 수정 모드 종료
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="word-list">
      <h2>{date.toLocaleDateString()}에 등록된 단어 목록</h2>
      <div className="table">
        <div className="table-header">
          <div className="header-cell">Word</div>
          <div className="header-cell">Mean</div>
        </div>
        <div className="table-body">
          {(isEditing ? editedWords : words).map((item, index) => (
            <div className="table-row" key={item.id}>
              {isEditing ? (
                <>
                  <div className="table-cell">
                    <input
                      type="text"
                      value={item.word}
                      onChange={(e) =>
                        handleEditChange(index, "word", e.target.value)
                      }
                    />
                  </div>
                  <div className="table-cell">
                    <input
                      type="text"
                      value={item.mean}
                      onChange={(e) =>
                        handleEditChange(index, "mean", e.target.value)
                      }
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="table-cell">{item.word}</div>
                  <div className="table-cell">{item.mean}</div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {!isEditing && !showAddForm && (
        <>
          <button className="add-word" onClick={() => setShowAddForm(true)}>
            Add Word
          </button>
          <button className="edit-word" onClick={handleEditClick}>
            Edit
          </button>
        </>
      )}

      {showAddForm && (
        <AddWordForm onAddDone={handleAddDone} onAddCancel={handleAddCancel} />
      )}

      {isEditing && (
        <div>
          <button className="done-button" onClick={handleEditDone}>
            Done
          </button>
          <button className="cancel-button" onClick={handleEditCancel}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default WordList;
