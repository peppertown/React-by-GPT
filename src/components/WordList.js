import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/WordList.css";

const WordList = ({ date }) => {
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isEditing, setIsEditing] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editedWords, setEditedWords] = useState([]);

  const [newWord, setNewWord] = useState("");
  const [newMean, setNewMean] = useState("");

  // 오늘 날짜와 비교하기 위한 UTC 포맷
  const todayUtc = new Date(
    Date.UTC(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
    )
  )
    .toISOString()
    .split("T")[0];

  // date를 UTC 기준으로 변환
  const targetDateUtc = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  )
    .toISOString()
    .split("T")[0];

  // 오늘 날짜와 targetDate 비교
  const isTargetDate = todayUtc === targetDateUtc;

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
        setEditedWords(response.data.words || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWords();
  }, [date]);

  const handleAddWord = (event) => {
    if (event.key === "Enter" && newWord && newMean) {
      const newWordData = { id: Date.now(), word: newWord, mean: newMean };
      setWords([...words, newWordData]);
      setNewWord("");
      setNewMean("");
    }
  };

  const handleAddDone = () => {
    console.log("등록된 단어:", words);
    setShowAddForm(false);
  };

  const handleAddCancel = () => {
    setNewWord("");
    setNewMean("");
    setShowAddForm(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setShowAddForm(false);
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
      setWords(editedWords);
      setIsEditing(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditCancel = () => {
    setEditedWords(words);
    setIsEditing(false);
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
          {isTargetDate && (
            <button className="add-word" onClick={() => setShowAddForm(true)}>
              Add Word
            </button>
          )}
          <button className="edit-word" onClick={handleEditClick}>
            Edit
          </button>
        </>
      )}

      {showAddForm && (
        <div>
          <input
            type="text"
            placeholder="Word"
            value={newWord}
            onChange={(e) => setNewWord(e.target.value)}
            onKeyPress={handleAddWord}
          />
          <input
            type="text"
            placeholder="Mean"
            value={newMean}
            onChange={(e) => setNewMean(e.target.value)}
            onKeyPress={handleAddWord}
          />
          <button className="done-button" onClick={handleAddDone}>
            Done
          </button>
          <button className="cancel-button" onClick={handleAddCancel}>
            Cancel
          </button>
        </div>
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
