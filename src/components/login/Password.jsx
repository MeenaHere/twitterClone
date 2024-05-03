import React from "react";

const PasswordInput = ({ value, onChange }) => {
  return (
    <div>
      <label>Password:</label>
      <input type="password" value={value} onChange={onChange} />
    </div>
  );
};

export default PasswordInput;
