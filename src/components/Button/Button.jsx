import React from "react";

function Button({
  title,
  onClick,
  onMouseDown,
  onMouseUp,
  onTouchStart,
  onTouchEnd,
  disabled,
}) {
  return (
    <button
      onClick={onClick}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className="bg-blue outline-none border-transparent rounded-md text-white p-2 text-sm font-bold w-24 hover:w-28 transition-all"
      disabled={disabled}>
      {title}
    </button>
  );
}

export default Button;
