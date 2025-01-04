import {
  DownloadSimple,
  GooglePodcastsLogo,
  Image,
  TextT,
  VideoCamera,
} from "@phosphor-icons/react";
import React, { forwardRef } from "react";
import Draggable from "react-draggable";
import TextareaAutosize from "react-textarea-autosize";

const Preview = forwardRef(function Preview({ type }, ref) {
  return (
    <>
      {/* PREVIEW */}
      <Draggable>
        <div className="w-[250px] h-[150px] py-2 flex flex-col">
          {/* <span className="text-lg text-blue font-bold w-full">Result</span> */}
          {type === "Speech" &&  (
            <div className="cursor-pointer w-full h-full bg-white border-blue border-2 rounded-md inline-flex items-center overflow-hidden p-[11px]">
              <GooglePodcastsLogo
                size={25}
                className="text-blue mr-2 shrink-0 flex-0"
              />
              <div className="outline-none border-0 border-none focus:ring-0 h-full flex items-center justify-center flex-1">
                <audio controls autoPlay className="w-full">
                  <source src="" type="audio/mpeg" />
                </audio>
              </div>
            </div>
          )}
          {type === "Image" && (
            <div className="cursor-pointer w-full h-full bg-white border-blue border-2 rounded-md inline-flex items-center overflow-hidden p-[11px]">
              <Image size={25} className="text-blue mr-2 shrink-0 flex-0" />
              <div className="outline-none border-0 border-none focus:ring-0 h-full flex items-center justify-center flex-1">
                <img src="" alt="Preview Image" />
              </div>
            </div>
          )}
          {type === "Video" && (
            <div className="cursor-pointer w-full h-full bg-white border-blue border-2 rounded-md inline-flex items-center overflow-hidden p-[11px]">
              <VideoCamera size={25} className="text-blue mr-2 shrink-0 flex-0" />
              <div className="outline-none border-0 border-none focus:ring-0 h-full flex items-center justify-center flex-1">
                <video width="400" height="400" controls autoPlay>
                  <source src="" type="video/*" />
                </video>
              </div>
            </div>
          )}
          {type === "Text" && (
            <div className="bg-white w-full h-full max-h-full border-blue border-2 rounded-md inline-flex justify-center items-center p-[11px]  overflow-y-scroll no-scrollbar">
              <TextT size={25} className="text-blue bg-transparent mr-2" />
              <TextareaAutosize
                onKeyDown={(e) => {
                  e.stopPropagation();
                }}
                value="TEXT PREVIEW"
                readOnly
                className="h-full resize-none text-black outline-none border-0 border-none focus:ring-0 bg-transparent flex-grow p-0 mr-5 overflow-y-scroll no-scrollbar"
                minRows={1}
                maxRows={10}
              />
            </div>
          )}
        </div>
      </Draggable>
        {/* <div className="flex items-center justify-between p-2">
          <p className="text-lg font-bold">Export</p>
          <div>
            {" "}
            <abbr title="Export">
              <DownloadSimple
                size={20}
                className="text-black cursor-pointer hover:text-blue transition-all"
              />
            </abbr>
          </div>
        </div> */}
        {/* SHOW WHEN CAN NOT TRANSFER */}
        {/* <>
            <div className="text-center cursor-pointer w-full h-full bg-white border-red-600 border-2 rounded-md inline-flex items-center overflow-hidden p-[11px]">
              <span className="w-full text-red-600">CAN NOT TRANSFER</span>
            </div>
          </> */}
    </>
  );
});

export default Preview;
