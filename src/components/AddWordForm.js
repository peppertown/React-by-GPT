import React, { useState } from "react";

const AddWordForm = ({ onAddDone, onAddCancel }) => {
  const [newWord, setNewWord] = useState("");
  const [newMean, setNewMean] = useState("");

  const handleAddWord = (event) => {
    if (event.key === "Enter" && newWord && newMean) {
      onAddDone({ word: newWord, mean: newMean });
      setNewWord("");
      setNewMean("");
    }
  };

  return (
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
      <button
        className="done-button"
        onClick={() => onAddDone({ word: newWord, mean: newMean })}
      >
        Done
      </button>
      <button className="cancel-button" onClick={onAddCancel}>
        Cancel
      </button>
    </div>
  );
};

export default AddWordForm;
