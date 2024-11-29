import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditWordPage = () => {
  const { id } = useParams();
  const [word, setWord] = useState("");
  const [mean, setMean] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWord = async () => {
      try {
        const response = await axios.get(`http://localhost:824/word/${id}`);
        if (response.data.success) {
          setWord(response.data.word.word);
          setMean(response.data.word.mean);
        }
      } catch (error) {
        console.error(error);
        alert("단어 정보를 불러오는 데 실패했습니다.");
      }
    };

    fetchWord();
  }, [id]);

  const handleSaveChanges = async () => {
    try {
      const response = await axios.put(`http://localhost:824/word/${id}`, {
        word,
        mean,
      });
      if (response.data.success) {
        alert("단어가 수정되었습니다!");
        navigate("/");
      } else {
        alert("단어 수정에 실패했습니다.");
      }
    } catch (error) {
      console.error(error);
      alert("서버 오류");
    }
  };

  return (
    <div>
      <h2>단어 수정</h2>
      <input
        type="text"
        value={word}
        onChange={(e) => setWord(e.target.value)}
      />
      <input
        type="text"
        value={mean}
        onChange={(e) => setMean(e.target.value)}
      />
      <button onClick={handleSaveChanges}>Save</button>
    </div>
  );
};

export default EditWordPage;
