import { WarningCircle } from "@phosphor-icons/react";
import React, { useState } from "react";

function Notify({ message }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      className="cursor-pointer absoulute top-[50%] translate-y-[-50%] right-0"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <WarningCircle size={15} className="text-white bg-red-600 rounded-full" />
      {!hover && (
        <span className="z-10 absolute bg-red-600 top-0 border-black border-1 bottom-2 w-56 rounded-md p-1 h-[40px] flex items-center ml-2">
          <nav className="text-white">{message}</nav>
        </span>
      )}
    </div>
  );
}

export default Notify;
