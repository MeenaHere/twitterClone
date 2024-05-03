
import React from "react";

const Email = ({ value, onChange }) => {
  return (
    <div>
      <label>Email:</label>
      <input type="email" value={value} onChange={onChange} />
    </div>
  );
};

export default Email;
