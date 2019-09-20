import React from "react";

const Button = ({ val, id, handleclick }) => {
  return (
    <button
      id={id}
      value={val}
      onClick={handleclick}
      className="btn btn-primary col-3"
    >
      {val}
    </button>
  );
};

export default Button;
