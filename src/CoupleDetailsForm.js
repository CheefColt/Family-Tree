import React, { useState } from "react";

const CoupleDetailsForm = ({ onSubmit }) => {
  const [label1, setLabel1] = useState("");
  const [label2, setLabel2] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(label1, label2);
    setLabel1("");
    setLabel2("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ position: "absolute", zIndex: 10 }}>
      <input
        type="text"
        value={label1}
        onChange={(e) => setLabel1(e.target.value)}
        placeholder="Enter first person label"
        required
      />
      <input
        type="text"
        value={label2}
        onChange={(e) => setLabel2(e.target.value)}
        placeholder="Enter second person label"
        required
      />
      <button type="submit">Add Couple</button>
    </form>
  );
};

export default CoupleDetailsForm;