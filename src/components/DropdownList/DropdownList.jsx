import React, { useState, useRef, useEffect } from "react";

function Dropdownlist({ title, options, callback, selected }) {
  return (
    <div className="flex flex-col mx-1 my-2 w-full">
      <p className="font-bold md:text-[18px] lg:text-[18px] text-[14px]">
        {title}
      </p>
      {
        <select
          onChange={(e) => callback(e.target.value)}
          className="w-full border-gray-300 rounded-md h-full md:text-lg lg:text-lg text-[14px] lg:p-2 md:p-2 p-1"
          value={selected}
        >
          {options.map((o, i) => (
            <option value={i} key={i} className="text-black p-2 ">
              {o}
            </option>
          ))}
        </select>
      }
    </div>
  );
}

export default Dropdownlist;
