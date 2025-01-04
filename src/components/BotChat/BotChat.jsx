import { PaperPlaneTilt, X } from "@phosphor-icons/react";
import React, { useState } from "react";
// import "./botchat.css"

function BotChat({ closeBotChat }) {
  const [select, setSelect] = useState(false);

  return (
    <div className="mobile overflow-hidden z-[1000] bg-white border-[#ccc] border-2 w-[300px] lg:w-[360px] h-[400px] fixed right-2 lg:right-3 bottom-2 shadow-sm">
      <div className="flex flex-col justify-between">
        <div className="flex justify-between p-2 items-center border-b-2">
          <span className="text-lg font-bold">BOT AI</span>
          <X
            size={24}
            className="cursor-pointer"
            onClick={() => closeBotChat(false)}
          />
        </div>
        <div className="h-full max-h-[80%] w-full absolute top-[12%] scrollar-cus overflow-auto">
          {/* UNSELECTED TOPIC */}
          {!select && (
            <div className="flex flex-col items-center w-full">
              <span className="text-[1.5rem] mt-2">You wanna ask about</span>
              <ul className="w-[80%] mt-2">
                <li className="border-2 rounded-3xl p-2 lg:p-3 w-full text-center my-2 cursor-pointer transition-[0.5s] hover:bg-blue hover:text-white">
                  Text to speech
                </li>
                <li className="border-2 rounded-3xl p-2 lg:p-3 w-full text-center my-2 cursor-pointer hover:bg-blue hover:transition[0.25s] hover:text-white">
                  Speech to text
                </li>
                <li className="border-2 rounded-3xl p-2 lg:p-3 w-full text-center my-2 cursor-pointer hover:bg-blue hover:transition[0.25s] hover:text-white">
                  Others
                </li>
              </ul>
            </div>
          )}
          {/* SELECTED TOPIC */}
        </div>
        <div className="bg-white flex border-t-2 w-full items-center absolute bottom-0 h-12">
          <input
            type="text"
            placeholder="Aa"
            className="w-[90%] border-none outline-none focus:ring-0 "
          />
          <PaperPlaneTilt
            size={28}
            className="cursor-pointer text-black transition-[0.25s] hover:text-blue"
          />
        </div>
      </div>
    </div>
  );
}

export default BotChat;
