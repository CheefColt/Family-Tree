import React, { useState } from "react";

const NodeDetailsForm = ({ onSubmit }) => {
  const [label, setLabel] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(label);
    setLabel("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ position: "absolute", zIndex: 10 }}>
      <input
        type="text"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        placeholder="Enter node label"
        required
      />
      <button type="submit">Add Child</button>
    </form>
  );
};

export default NodeDetailsForm;