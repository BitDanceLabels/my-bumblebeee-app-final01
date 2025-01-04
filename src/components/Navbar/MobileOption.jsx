import {
  GooglePodcastsLogo,
  LinkSimple,
  Microphone,
} from "@phosphor-icons/react";
import React from "react";
import { Draggable } from "react-drag-and-drop";

function MobileOption(props, ref) {
  return (
    <div
      ref={ref}
      className="flex flex-col bg-[#2f3640] text-white absolute right-[.5rem] top-[-9rem] rounded-sm px-4 py-2 shadow-xl w-[140px]"
    >
      <Draggable className=" cursor-pointer" type="components" data="Audio">
        <div
          className="flex items-center justify-between py-2 cursor-pointer border-b-2 border-gray-100"
          onMouseDown={(e) => {
            e.stopPropagation();
            props.setCenterDefaultPosition();
          }}
          onMouseUp={(e) => {
            e.stopPropagation();
            props.addElement("Audio");
            props.setClosePopup(false);
            props.setClosePopup(false);
          }}
          onTouchEnd={(e) => {
            e.stopPropagation();
            props.addElement("Audio");
            props.setClosePopup(false);
          }}
          onTouchStart={(e) => {
            e.stopPropagation();
            props.setCenterDefaultPosition();
          }}
        >
          <GooglePodcastsLogo size={20} />
          <span>Audio</span>
        </div>
      </Draggable>
      <Draggable className=" cursor-pointer" type="components" data="Record">
        <div
          className="flex items-center justify-between py-2 cursor-pointer border-b-2 border-gray-100"
          onMouseDown={(e) => {
            e.stopPropagation();
            props.setCenterDefaultPosition();
          }}
          onMouseUp={(e) => {
            e.stopPropagation();
            props.addElement("Record");
            props.setClosePopup(false);
          }}
          onTouchEnd={(e) => {
            e.stopPropagation();
            props.addElement("Record");
            props.setClosePopup(false);
          }}
          onTouchStart={(e) => {
            e.stopPropagation();
            props.setCenterDefaultPosition();
          }}
        >
          <Microphone size={20} />
          <span>Record</span>
        </div>
      </Draggable>
      <Draggable className=" cursor-pointer" type="components" data="URL">
        <div
          className="flex items-center justify-between py-2 cursor-pointer"
          onMouseDown={(e) => {
            e.stopPropagation();
            props.setCenterDefaultPosition();
          }}
          onMouseUp={(e) => {
            e.stopPropagation();
            props.addElement("URL");
            props.setClosePopup(false);
          }}
          onTouchEnd={(e) => {
            e.stopPropagation();
            props.addElement("URL");
            props.setClosePopup(false);
          }}
          onTouchStart={(e) => {
            e.stopPropagation();
            props.setCenterDefaultPosition();
          }}
        >
          <LinkSimple size={20} />
          <span>URL</span>
        </div>
      </Draggable>
    </div>
  );
}

export default React.forwardRef(MobileOption);
