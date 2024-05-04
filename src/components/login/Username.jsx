import React from "react";

const Username = ({ value, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        className="form-control"
        id="username"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Username;
