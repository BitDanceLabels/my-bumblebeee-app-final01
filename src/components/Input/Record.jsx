import {
  ArrowClockwise,
  Microphone,
  Pause,
  Record as R,
  Stop,
  XCircle,
} from "@phosphor-icons/react";
import React, { useState, useEffect, useRef } from "react";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import { useDispatch, useSelector } from "react-redux";
import { onClickRecord } from "../../redux/clickRecordSlice";
import { onClickDelete } from "../../redux/clickDeletefile";
import { useBoxContext } from "../Whitespace/Element";
import { blobToFile } from "../../Utils/helpers";
function Record(_, ref) {
  const {handleBoxChange} = useBoxContext();
  const selectDataRecord = useSelector((state) => state.clickSelect.data)
  const selectDataIdRecord =  selectDataRecord.id
  const dispatch = useDispatch();
  const [click, setClick] = useState(false);
  const [recordValue, setRecordValue] = useState("");
  const reControl = useAudioRecorder();
  const handleClickDelete = () => {
    dispatch(onClickDelete());
  };
  useEffect(() => {
    if (!reControl.recordingBlob) return;
    //console.log(reControl.recordingBlob);
    addAudioElement(reControl.recordingBlob);
  }, [reControl.recordingBlob]);

  const addAudioElement = (blob) => {
    var file = blobToFile(blob)
    handleBoxChange(file, true);
    const url = URL.createObjectURL(blob);
    // dispatch(onClickRecord({id:selectDataIdRecord,source:blob}));
    setRecordValue(url);
  };
  function format(time) {
    // Hours, minutes and seconds
    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = ~~time % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";
    if (hrs > 0) {
      ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }
    ret += "" + String(mins).padStart(2, "0") + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
  }
  const RecordDOM = () => {
    return <span>{reControl.recordingTime}</span>;
  };

  const [isPause, setIsPause] = useState(false);

  return (
    <>
      <div className="touch-none bg-white w-full h-full cursor-pointer border-blue border-2 rounded-md inline-flex items-center overflow-hidden p-[11px]">
        <Microphone size={25} className="text-blue mr-2 flex-shrink-0" />
        <div className="outline-none border-0 border-none focus:ring-0 flex-1 text-center">
          {!click && (
            <span
              className="text-black"
              onClick={() => {
                reControl.startRecording();
                setClick(true);
              }}
            >
              Click to record
            </span>
          )}
          {reControl.isRecording && (
            <div className="flex flex-col">
              <div className="flex">
                <div className="flex items-center">
                  <div
                    className="inline-flex bg-[#2f3640] text-white rounded-full p-2 items-center gap-2 mr-2"
                    onClick={() => {
                      reControl.stopRecording();
                      setIsPause(false);
                    }}
                  >
                    <Stop
                      size={20}
                      color="inherit"
                      className="bg-white rounded-full p-1"
                    />
                    <span className="mr-2">
                      {format(reControl.recordingTime)}
                    </span>
                  </div>
                  <Pause
                    size={30}
                    onClick={() => {
                      reControl.togglePauseResume();
                      setIsPause(!isPause);
                    }}
                    color={!isPause ? "black" : "red"}
                    className="transition-[0.25s]"
                  />
                </div>
              </div>
              {/* 
              <AudioRecorder
                onRecordingComplete={addAudioElement}
                audioTrackConstraints={{
                  noiseSuppression: true,
                  echoCancellation: true,
                }}
                recorderControls={reControl}
                downloadFileExtension="webm"
                showVisualizer={true}
              /> */}
            </div>
          )}
          {recordValue && !reControl.isRecording && (
            <div className="flex items-center">
              <audio ref={ref}
                id="audio"
                controls
                src={recordValue}
                className="w-full"
              ></audio>
              <ArrowClockwise
                color="black"
                size={24}
                onClick={() => {
                  reControl.startRecording();
                }}
              />
            </div>
          )}
        </div>
        <div className="absolute right-0 top-0 transition-[0.25s] font-bold flex flex-col bg-[#3498DB] rounded-bl-[15px] p-1 ">
          <div
            className="flex items-center justify-center cursor-pointer"
            onClick={handleClickDelete}
            onTouchStart={handleClickDelete}
          >
            <XCircle size={22} color="white" />
          </div>
        </div>
        {/* <ReactMic record={record} onData={onData} onStop={onStop} /> */}
      </div>
      {/* <button onClick={startRecord} type="button" className="text-black">
        Start
      </button>
      <button onClick={stopRecord} type="button" className="text-black">
        Stop
      </button> */}
    </>
  );
}
export default React.forwardRef(Record);
