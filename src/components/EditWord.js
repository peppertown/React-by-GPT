import React, { useState } from "react";
import axios from "axios";

const EditWord = ({ word, onEditComplete }) => {
  const [updatedWord, setUpdatedWord] = useState(word.word);
  const [updatedMean, setUpdatedMean] = useState(word.mean);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // API 호출로 단어 업데이트
      const response = await axios.put(`http://localhost:824/word/${word.id}`, {
        word: updatedWord,
        mean: updatedMean,
      });
      onEditComplete(response.data); // 수정 완료 데이터 전달
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>단어 수정하기</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Word:</label>
          <input
            type="text"
            value={updatedWord}
            onChange={(e) => setUpdatedWord(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Mean:</label>
          <input
            type="text"
            value={updatedMean}
            onChange={(e) => setUpdatedMean(e.target.value)}
            required
          />
        </div>
        <button type="submit">수정 완료</button>
        <button type="button" onClick={() => onEditComplete(word)}>
          취소
        </button>
      </form>
    </div>
  );
};

export default EditWord;
