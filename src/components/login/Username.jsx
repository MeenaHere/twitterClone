import React from "react";

const Username = ({ value, onChange }) => {
  const handleInputChange = (e) => {
    const newValue = e.target.value;
    const isValid = /^[a-zA-Z0-9_]*$/.test(newValue);

    if (isValid) {
      onChange(e);
    } else {
      console.warn("Invalid characters in username");
    }
  };

  return (
    <div className="form-group">
      <label htmlFor="username">Username:</label>{" "}
      <input
        type="text"
        className="form-control"
        id="username"
        placeholder="Enter your username"
        value={value}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default Username;
