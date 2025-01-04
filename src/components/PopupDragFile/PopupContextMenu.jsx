// ... code trước đó
import { Trash } from "@phosphor-icons/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Popup from "reactjs-popup";
import { onClickDelete } from "../../redux/clickDeletefile";
const RightClickMenu = ({ children }) => {
  const dispath = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleContextMenu = (e) => {
    e.preventDefault();
    setPosition({ x: e.pageX, y: e.pageY }); // Lưu vị trí chuột click
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleDelete = () => {
    // setOnDelete(false);
    dispath(onClickDelete());
  };

  return (
    <>
      <div onContextMenu={handleContextMenu} className="relative">
        {children}
        <Popup
          open={isOpen}
          closeOnDocumentClick
          onClose={handleClose}
          contentStyle={{
            position: "absolute",
            top: position.y,
            left: position.x + 50, // Xác định khoảng cách từ children sang phải popup
          }}
        >
          <div
            className="settings-popup"
            style={{
              width: "150px",
              backgroundColor: "white",
              borderRadius: "5px",
            }}
          >
            <ul>
              <li
                className="flex p-[10px] cursor-pointer bg-red-600 items-center text-white rounded-md transition-[0.25s] animate-blur-option"
                onClick={handleDelete}
              >
                <Trash size={24} />
                <span className="pl-10 font-bold">Delete</span>
              </li>
            </ul>
          </div>
        </Popup>
      </div>
    </>
  );
};

export default RightClickMenu;
