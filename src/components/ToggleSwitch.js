import React, { useState } from "react";

const ToggleSwitch = ({ label }) => {
  const [enabled, setEnabled] = useState(true);

  const toggle = () => {
    setEnabled(!enabled);
  };

  return (
    <div style={{ marginBottom: "10px" }}>
      <label>
        <input
          type="checkbox"
          checked={enabled}
          onChange={toggle}
          style={{ marginRight: "10px" }}
        />
        {label}
      </label>
    </div>
  );
};

export default ToggleSwitch;
