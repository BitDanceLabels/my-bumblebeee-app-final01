import { XCircle } from "@phosphor-icons/react/dist/ssr";
import React, { useEffect, useRef, useState } from "react";

const types = ["Text", "Image", "Audio", "Video", "Record", "URL"];

function PopupCreateProc(props) {
  const [isSuccess, setIsSuccess] = useState(null);
  const appendProc = (name, list) => {
    setIsSuccess(true);
    props.procedureList((pre) => [...pre, { name: name, list: list }]);
  };
  let list;
  const listArr = [];

  const nameRef = useRef();
  const listRef = useRef();

  const handleCreate = (e) => {
    e.stopPropagation();
    e.preventDefault();
    let list = listRef.current.innerHTML;
    let name = nameRef.current.value;
    if (name !== "" && list.trim() !== "") {
      setIsSuccess(true);
      appendProc(name, list.trim().split(" - "));
      document.getElementById("notify").innerHTML =
        "Create procedure successfully";
      document.getElementById("notify").style.color = "#27ae60";
      setTimeout(() => {
        props.setCreate(false);
      }, 1200);
    } else {
      document.getElementById("notify").innerHTML = "Error creating procedure";
      document.getElementById("notify").style.color = "#e74c3c";
      setIsSuccess(false);
    }
  };
  return (
    <div
      className="fixed bg-overlay w-full h-full top-0 left-0 z-20"
      onClick={() => props.setCreate(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="md:w-[400px] lg:w-[400px] w-[320px] h-fit bg-white absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] p-4 rounded-md text-blue"
      >
        <div
          onClick={() => props.setCreate(false)}
          className="cursor-pointer font-bold bg-[#e74c3c] p-1 rounded-bl-[15px] top-0 right-0 absolute"
        >
          <XCircle size={20} color="white" />
        </div>
        <h2 className="font-bold text-lg my-2 mx-1 text-center">
          CREATE YOUR PROCEDURE
        </h2>
        <div className="flex flex-col my-2">
          <span className="text-[#2f3542] font-bold">Procedure Name</span>
          <input
            type="text"
            ref={nameRef}
            className="h-[40px] outline-none border-blue rounded-md text-black"
          />
        </div>
        <div>
          <div className="flex items-center justify-between">
            <span className="text-[#2f3542] font-bold">
              Procedure Selection
            </span>
            <span
              onClick={() => {
                listRef.current.innerHTML = "";
                listArr.length = 0;
              }}
              className="text-[#7f8c8d] text-sm cursor-pointer font-bold"
            >
              Clear
            </span>
          </div>
          <div
            ref={listRef}
            id="procSelection"
            className="relative w-full min-h-[40px] text-[#2f3542] max-h-[80px] overflow-auto p-2 scrollar-cus border border-blue rounded-md bg-white break-words"
          >
            {"  "}
          </div>

          <p className="text-gray-500 italic text-sm">
            *Add selection by clicking on inputs below
          </p>
        </div>
        {/* selection zone */}
        <div className="flex flex-wrap justify-evenly items-center my-2">
          {types.map((type) => {
            return (
              <span
                onClick={() => {
                  list = document.getElementById("procSelection");
                  listArr.push(type);
                  list.innerHTML = listArr.join(" - ");
                }}
                className="text-sm lg:text-lg text-center mx-4 my-2 md:w-[70px] lg:w-[70px] w-[60px] cursor-pointer bg-white border border-blue rounded-md text-blue py-2 font-bold transition-[0.25s]"
              >
                {type}
              </span>
            );
          })}
        </div>
        {/* BUTTON */}
        <div className={`flex items-center justify-between`}>
          <span
            id="notify"
            className={`font-bold md:text-md lg:text-md text-[12px]`}
          >
            {" "}
          </span>
          <button
            onClick={(e) => {
              handleCreate(e);
            }}
            className="md:text-md lg:text-md text-sm border border-blue text-white font-bold bg-blue cursor-pointer rounded-md p-1 w-[100px] hover:w-[120px] transition-[0.25s] hover:font-bold"
          >
            CREATE
          </button>
        </div>
      </div>
    </div>
  );
}

export default PopupCreateProc;
