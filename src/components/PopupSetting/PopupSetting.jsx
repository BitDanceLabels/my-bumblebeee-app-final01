import { Option, Swap } from "@phosphor-icons/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  IsActiveToolbox,
  NotActiveToolbox,
} from "../../redux/activeToolboxSlice";
import {
  IsActiveCustomize,
  NotActiveCustomize,
} from "../../redux/activeCustomizeSlice";

function PopupSetting() {
  const dispatch = useDispatch();
  const toolbox = useSelector((state) => state.toolbox.value);
  const customize = useSelector((value) => value.customize.value);

  const handleToggleToolbox = () => {
    toolbox ? dispatch(NotActiveToolbox()) : dispatch(IsActiveToolbox());
  };

  const handleToggleCustomize = () => {
    customize ? dispatch(NotActiveCustomize()) : dispatch(IsActiveCustomize());
  };

  const [screen, setScreen] = useState(window.innerWidth >= 768);
  useEffect(() => {
    const handleResize = () => {
      setScreen(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      <div className="w-[250px] absolute top-6 left-[-3rem] bg-white text-[#2f3542] shadow-md rounded-md px-3 py-3">
        <span className="font-bold text-lg">Lock / Unlock</span>
        {/* {screen && ( */}
        <div
          onClick={() => {
            handleToggleToolbox();
          }}
          className={`my-2 flex items-center border-2 w-[100%] p-2 justify-around cursor-pointer transition-[0.25s]
          ${toolbox && "border-[#3498DB] text-[#3498DB]"}`}
        >
          <Swap size={26} />
          <span className="text-[1.2rem]">Toolbox</span>
        </div>
        {/* )} */}
        <div
          onClick={() => handleToggleCustomize()}
          className={`my-2 flex items-center border-2 w-[100%] p-2 justify-around cursor-pointer transition-[0.25s]
          ${customize && "border-[#3498DB] text-[#3498DB]"}`}
        >
          <Option size={20} />
          <span>Customize</span>
        </div>
      </div>
    </>
  );
}

export default PopupSetting;
