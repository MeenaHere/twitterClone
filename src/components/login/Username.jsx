import React from "react";

const Username = ({ value, onChange }) => {
  return (
    <div>
      <label>Username:</label>
      <input type="text" value={value} onChange={onChange} />
    </div>
  );
};

export default Username;
