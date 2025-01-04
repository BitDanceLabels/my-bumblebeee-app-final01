import { Swap, Trash } from "@phosphor-icons/react";
import React from "react";
import { useDispatch } from "react-redux";
import { onClickDelete } from "../../redux/clickDeletefile";

function InputOption() {
  const dispatch = useDispatch();
  const handleClickDelete = () => {
    dispatch(onClickDelete());
  };
  return (
    <>
      <div className="transition-[0.25s] font-bold flex flex-col bg-red-600 rounded-md text-white absolute right-[-5rem] top-[-6rem] px-4 py-2 shadow-xl w-[140px]">
        {/* <div className="flex items-center justify-between py-2 border-b-2 border-gray-100">
          <Swap size={20} />
          <span>Transfer</span>
        </div> */}
        <div
          className="flex items-center justify-between py-2 cursor-pointer"
          onClick={handleClickDelete}
        >
          <Trash size={20} />
          <span>Delete</span>
        </div>
      </div>
    </>
  );
}

export default InputOption;
