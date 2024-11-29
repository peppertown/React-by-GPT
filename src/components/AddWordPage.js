import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddWordPage = () => {
  const [newWord, setNewWord] = useState("");
  const [newMean, setNewMean] = useState("");
  const navigate = useNavigate();

  const handleAddWord = async () => {
    try {
      const response = await axios.post("http://localhost:824/word", {
        word: newWord,
        mean: newMean,
      });
      if (response.data.success) {
        alert("단어가 성공적으로 추가되었습니다!");
        navigate("/");
      } else {
        alert("단어 추가에 실패했습니다.");
      }
    } catch (error) {
      console.error(error);
      alert("서버 오류");
    }
  };

  return (
    <div>
      <h2>새 단어 추가</h2>
      <input
        type="text"
        placeholder="Word"
        value={newWord}
        onChange={(e) => setNewWord(e.target.value)}
      />
      <input
        type="text"
        placeholder="Meaning"
        value={newMean}
        onChange={(e) => setNewMean(e.target.value)}
      />
      <button onClick={handleAddWord}>Add Word</button>
    </div>
  );
};

export default AddWordPage;
