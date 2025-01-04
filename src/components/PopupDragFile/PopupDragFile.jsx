import React, { useRef } from "react";
import { CloudArrowUp } from "@phosphor-icons/react";
import { useDispatch } from "react-redux";
import { dontClickImage, onClickImage } from "../../redux/clickImageSlice";
import { FileUploader } from "react-drag-drop-files";

function PopupDragFile({ toggle, accepts,  fileOutput }) {
  // const dispatch = useDispatch();
  // const [dataFile,setDataFile] = useState("")
  // const inputFile = useRef(null);
  const closePopup = (e) => {
    toggle(false);
  };
  const dispatch = useDispatch();

  const handleChangeFile = (file) => {
    if (file) {
      // fileOutput({ source: URL.createObjectURL(file), filetype: file.type });
      fileOutput(file);
      
      // //console.log("geted file", file);
      // dispatch(onClickImage());
      toggle(false);
    } else {
      // dispatch(dontClickImage());
    }
  };

  // const uploadFile = (e) => {
  //   e.stopPropagation();
  //   inputFile.current.click();
  // };

  // const fileChange = (event) => {
  //   if (event.target.files && event.target.files[0]) {
  //     callback(URL.createObjectURL(event.target.files[0]));
  //     toggle(false);
  //   }
  //   if (event.target.files[0]) {
  //     dispatch(onClickImage());
  //   } else {
  //     dispatch(dontClickImage());
  //   }
  // };

  return (
    <div
      className=" animate-open-popup w-full h-full bg-white flex items-center justify-center z-10 "
      onClick={closePopup}
    >
      <FileUploader
        handleChange={handleChangeFile}
        name="file"
        types={accepts}
        classes="flex items-center justify-center w-[80%] h-[70%]"
        
        children={
          <div className=" cursor-pointer bg-gray w-full h-full rounded-md  flex items-center justify-center opacity-100 text-center">
            <div className="border-dashed rounded-md border-blue w-[100%] h-[100%] border-2 flex flex-col justify-center items-center p-2">
              <CloudArrowUp size={80} className="text-black" />
              {/* <input
            type="file"
            className="hidden"
            id="input-file"
            accept={accepts}
            ref={inputFile}
            onChange={fileChange}
          /> */}
              <p className="text-xs text-black">Drag and drop your file type</p>
              <div className="flex flex-row">
                <p className="text-xs text-black">{accepts.join(", ").toString()}</p>
              </div>
            </div>
          </div>
        }
      ></FileUploader>
    </div>
  );
}

export default PopupDragFile;
