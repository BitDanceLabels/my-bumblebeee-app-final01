import { Chats } from "@phosphor-icons/react/dist/ssr";
import "./header.css";
import { useRef, useState } from "react";
import BotChat from "../BotChat/BotChat";
import ToggleSwitch from "../Button/ToggleSwitch";
import ContextMenu from "../Input/ContextMenu";
import {
  ArrowDown,
  ArrowRight,
  PlusCircle,
  X,
  XCircle,
} from "@phosphor-icons/react";
import PopupCreateProc from "../PopupCreateProc/PopupCreateProc";

const Header = (props) => {
  const [botChat, setBotChat] = useState(false);
  const [procList, setProList] = useState(false);

  const closeList = () => {
    setProList(false);
  };

  const [procedures, setProcedures] = useState([
    {
      name: "Basic Procedure",
      list: ["Text", "Audio", "Video"],
    },
  ]);

  const context = useRef();

  const [horizontal, setHorizontal] = useState(true);
  const [vertical, setVertical] = useState(false);

  const [create, setCreate] = useState(false);

  return (
    <>
      <div className="headerTrans">
        <div>
          <ToggleSwitch />
        </div>
        <div className="flex items-center">
          <abbr title="BotChat">
            <button className="p-2 btn-botAI" onClick={() => setBotChat(true)}>
              <Chats size={30} />
            </button>
          </abbr>
          <button
            className="btn-save p-1 relative"
            onClick={() => {
              setProList(true);
            }}
          >
            PROC
          </button>
          {procList && (
            <ul
              id="procList"
              ref={context}
              className="absolute top-[5rem] right-[5rem] z-10 w-[270px] border-grey shadow-md text-[#2f3542] bg-white border-2 rounded-md"
            >
              <div className="flex items-center justify-between px-2">
                <span>Procedure Direction</span>
                <div className="flex justify-end items-center">
                  <span
                    onClick={() => {
                      setHorizontal(true);
                      setVertical(false);
                    }}
                    onLoad={() => {
                      setHorizontal(true);
                    }}
                    className={`w-[30px] ml-2 rounded-lg cursor-pointer p-1 m-2 transition-[0.25s] ${
                      horizontal ? "bg-blue" : "bg-gray-300"
                    }`}
                  >
                    <ArrowRight
                      size={20}
                      color={`${horizontal ? "white" : "black"}`}
                    />
                  </span>
                  <span
                    className={`w-[30px] ml-2 rounded-lg cursor-pointer p-1 m-2 transition-[0.25s] ${
                      vertical ? "bg-blue" : "bg-gray-300"
                    }`}
                    onClick={() => {
                      setHorizontal(false);
                      setVertical(true);
                    }}
                  >
                    <ArrowDown
                      size={20}
                      color={`${vertical ? "white" : "black"}`}
                    />
                  </span>
                </div>
              </div>
              {procedures.map((procedure) => {
                return (
                  <li
                    className="w-full h-fit break-words border-b-2 border-gray px-3 py-2 cursor-pointer hover:bg-gray-200 transition-[0.25s]"
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      props.setDefaultPosition(procedure.list);
                    }}
                    onMouseUp={() => {
                      props.createProcedures(
                        procedure.list,
                        horizontal ? "horizontal" : "vertical"
                      );
                      closeList();
                    }}
                  >
                    <p className="text-[18px] font-bold">{procedure.name}</p>
                    <span>{procedure.list.join(" - ")}</span>
                  </li>
                );
              })}
              <li
                onClick={() => {
                  setCreate(true);
                  closeList();
                }}
                className="w-full h-fit border-b-2 border-gray px-4 pt-2 pb-2 cursor-pointer hover:bg-gray-200 transition-[0.25s] flex justify-center"
              >
                <PlusCircle size={32} />
              </li>
            </ul>
          )}
          {create && (
            <PopupCreateProc
              procedureList={setProcedures}
              setCreate={setCreate}
            />
          )}
          <ContextMenu
            contextMenuRef={context}
            callback={closeList}
          ></ContextMenu>
          <div className="btn-save">
            <span>SAVE</span>
          </div>
        </div>
      </div>
      {botChat && <BotChat closeBotChat={setBotChat} />}
    </>
  );
};

export default Header;
