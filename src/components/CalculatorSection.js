import React, { useState } from "react";

const CalculatorSection = ({ title }) => {
  const [input, setInput] = useState(0);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div style={{ margin: "20px 0", padding: "10px", border: "1px solid #ccc" }}>
      <h2>{title}</h2>
      <div>
        <label>Enter Value: </label>
        <input
          type="number"
          value={input}
          onChange={handleChange}
          style={{ marginLeft: "10px" }}
        />
      </div>
      <p>Calculated Value: {input * 2}</p>
    </div>
  );
};

export default CalculatorSection;
