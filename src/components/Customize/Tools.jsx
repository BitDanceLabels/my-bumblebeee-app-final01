import { CircleHalf, Dot, Images, Record, Textbox, Video, Waveform } from "@phosphor-icons/react";
import React, { useState } from "react";
import "./Tools.css";

export const ToolBase = ({ Icon, title, list }) => {
  const [toggle, setToggle] = useState(false);
  const [active, setActive] = useState(false);
  const Active = () => {
    setActive(!active);
  };
  return (
    <>
      <div
        className={`mt-4 mb-2 flex w-full items-center text-[#778ca3] py-2 pl-6 relative transition-[0.25s] cursor-pointer
      hover:border-r-4 hover:border-[#4b7bec] hover:text-[#4b7bec] hover:bg-bgrgba ${
        active ? "active" : ""
      }`}
        onClick={() => {
          Active();
          setToggle(!toggle);
        }}
      >
        <Icon size={32} className="mr-5" />
        <span className="text-xl font-bold">{title}</span>
      </div>
      {toggle && (
        <ul
          className={`list-none cursor-pointer flex flex-col w-full pl-20 transition-[0.25s]`}
        >
          {list.map((item) => (
            <li className="py-2 text-lg text-[#2c2c54] font-bold border-b-2 w-full transition-[0.25s] hover:translate-x-2">
              {item}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

function Tools() {
  const textTool = ["Text to speech", "Text to image", "Text to video"];
  const imageTool = ["Image to speech", "Image to text"];
  const videoTool = ["Video to image", "Video to text"];
  const audioTool = ["Audio to text"];
  const recordTool = ["Record to text"];

  return (
    <div className="z-[1000] shadow-md overflow-auto overflow-x-hidden lg:h-[450px] bg-white md:w-[300px] lg:w-[350px] border-2 border-grey rounded-tr-0 rounded-br-0 rounded-tl-[16px] rounded-bl-[16px] pt-1 pb-0 fixed right-0 top-[20%] scrollar-cus">
      <div className="w-full h-[100%]">
        <div className="relative bg-[] text-xl font-bold py-2 mt-2 mb-3 w-[100%] flex justify-center items-center">
          <span className="w-[70%] text-center marker text-[#2f3542]">
            AI TOOLS
          </span>
        </div>
        <div>
          <div className="flex flex-col">
            <ToolBase
              title="Text"
              Icon={Textbox}
              colorBase="#686de0"
              list={textTool}
              //   className="hover:bg-bgrgba"
            />
            <ToolBase
              title="Image"
              Icon={Images}
              colorBase="#686de0"
              list={imageTool}
              //   className="hover:bg-bgrgba"
            />
            <ToolBase
              title="Video"
              Icon={Video}
              colorBase="#686de0"
              list={videoTool}
              //   className="hover:bg-bgrgba"
            />
            <ToolBase
              title="Audio"
              Icon={Waveform}
              colorBase="#686de0"
              list={audioTool}
              //   className="hover:bg-bgrgba"
            />
            <ToolBase
              title="Record"
              Icon={Record}
              colorBase="#686de0"
              list={recordTool}
              //   className="hover:bg-bgrgba"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Tools;
