import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  useTransition,
} from "react";
import Dropdownlist from "../DropdownList/DropdownList";
import Button from "../Button/Button";
import { useDispatch, useSelector } from "react-redux";
import "./Customize.css";
import { Swap, XCircle } from "@phosphor-icons/react";
import Draggable from "react-draggable";
import { dontClickInputText } from "../../redux/clickTextSlice";
import { dontClickInputUrl } from "../../redux/clickURLSlice";
import { dontClickImage } from "../../redux/clickImageSlice";
import { dontClickVideo } from "../../redux/clickVideoSlice";
import { dontClickRecord } from "../../redux/clickRecordSlice";
import { dontClickAudio } from "../../redux/clickAudioSlice";
import Xarrow from "react-xarrows";
import { useBoxContext } from "../Whitespace/Element";
// import { FileFromUrl, getFileFromUrl } from "../../Utils/helpers";
import { getFileFromUrl } from "../../Utils/helpers";
import toast, { Toaster } from 'react-hot-toast';
function Customize({
  title,
  tools = [],
  addElement,
  setDefaultPosition,
  transform,
  boxSelected,
  updateElement,
  removeElement,
}) {
  const apiUrl = process.env.REACT_APP_API_URL;
  const dispatch = useDispatch();
  const [dataSample, setDataSample] = useState([]);
  useEffect(() => {
    console.log(boxSelected);
  }, [boxSelected]);
  // const [toolsSelected, setToolsSelected] = useState(0);
  // const handleToolSelected = (value) => {
  //   setToolsSelected(value);
  // };
  function randomUUID() {
    const hexDigits = "0123456789abcdef";
    let uuid = "";

    for (let i = 0; i < 36; i++) {
      if (i === 8 || i === 13 || i === 18 || i === 23) {
        uuid += "_";
      } else if (i === 14) {
        uuid += "4";
      } else if (i === 19) {
        uuid += hexDigits[(Math.random() * 4) | 8];
      } else {
        uuid += hexDigits[(Math.random() * 16) | 0];
      }
    }

    return uuid;
  }

  const importData = (id, type, value) => {
    const newDataSample = [...dataSample, { id: id, type: type, value: value }];
    setDataSample(newDataSample);
  };
  const defaultValue = useSelector((state) => state.globalDefaultValue.value);

  const [indexTool, setIndexTool] = useState(0);
  const [currentTool, setCurrentTool] = useState(<></>);
  const [result, setResult] = useState();
  const displayToolSelected = useCallback(
    (toolIndex = 0) => {
      // setClick(false);
      setIndexTool(toolIndex);
      setCurrentTool(tools[toolIndex].comp);
      // setPreview(tools[toolIndex].preview);
      setResult(tools[toolIndex].result);
    },
    [tools]
  );
  useEffect(() => {
    setIndexTool(0);
    displayToolSelected(0);
  }, [displayToolSelected, tools]);

  // Dữ liệu gồm id, type của mỗi input được kéo lên screen
  const idType = useSelector((state) => state.clickIdType.data);

  // Thao tác nhấn nút transfer
  const transfer = useSelector((state) => state.typeModel.value);

  // Dữ liệu inputText Chưa sử lý
  const inputText = useSelector((state) => state.clickText.value);
  const dataInputText = useSelector((state) => state.clickText.data);
  // Dữ liệu inputUrl Chưa sử lý
  const inputUrl = useSelector((state) => state.clickUrl.value);
  const dataInputUrl = useSelector((state) => state.clickUrl.data);

  // Dữ liệu Video Chưa sử lý
  const inputVideo = useSelector((state) => state.clickVideo.value);
  const dataInputVideo = useSelector((state) => state.clickVideo.data);

  // Dữ liệu Audio Chưa sử lý
  const inputAudio = useSelector((state) => state.clickAudio.value);
  const dataInputAudio = useSelector((state) => state.clickAudio.data);

  // Dữ liệu Record Chưa sử lý
  const inputRecord = useSelector((state) => state.clickRecord.value);
  const dataInputRecord = useSelector((state) => state.clickRecord.data);

  // Dữ liệu Image Chưa sử lý
  const inputImage = useSelector((state) => state.clickImage.value);
  const dataInputImage = useSelector((state) => state.clickImage.data);
  // DỮ liệu select
  const selectData = useSelector((state) => state.clickSelect.data);

  // Thao tác lọc dữ liệu
  const handleData = () => {
    switch (selectData.type) {
      case "Text":
        const dataText = dataInputText.find((item, index) => {
          return selectData.id === item.id;
        });
        if (typeof dataText === "undefined") {
          dispatch(dontClickInputText());
        }
        break;

      case "Image":
        const dataImage = dataInputImage.find((item, index) => {
          return selectData.id === item.id;
        });
        if (dataInputImage.length === 0) {
          dispatch(dontClickImage());
        }

        break;

      case "Video":
        const dataVideo = dataInputVideo.find((item, index) => {
          return selectData.id === item.id;
        });
        if (dataInputVideo.length === 0) {
          dispatch(dontClickVideo());
        }

        break;

      case "Audio":
        const dataAudio = dataInputAudio.find((item, index) => {
          return selectData.id === item.id;
        });
        if (dataInputAudio.length === 0) {
          dispatch(dontClickAudio());
        }

        break;

      case "URL":
        const dataUrl = dataInputUrl.find((item, index) => {
          return selectData.id === item.id;
        });
        if (dataInputUrl.length === 0) {
          dispatch(dontClickInputUrl());
        }

        break;

      case "Record":
        const dataRecord = dataInputRecord.find((item, index) => {
          return selectData.id === item.id;
        });
        if (dataInputRecord.length === 0) {
          dispatch(dontClickRecord());
        }

        break;
      default:
        break;
    }
  };
  useEffect(() => {
    handleData();
  }, [
    idType,
    // dataInputText,
    // dataInputImage,
    // dataInputVideo,
    // dataInputAudio,
    // dataInputUrl,
    // dataInputRecord,
  ]);

  // const [preview, setPreview] = useState(tools[indexTool].preview);
  // const [clicked, setClick] = useState(false);

  const parentRef = useRef();
  const [screen, setScreen] = useState(
    window.innerWidth >= defaultValue.tabletScreenSize
  );

  const handleClosePopup = () => {
    setScreen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setScreen(window.innerWidth >= defaultValue.tabletScreenSize);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const customize = useSelector((state) => state.customize.value);
  const [audioReview, setAudioReview] = useState(<></>);
  const audio_review = useRef();
  //request api
  const tts_google = async (text) => {
    if (!text) throw new Error("text is null");
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const output_name = randomUUID();

    var raw = JSON.stringify({
      text: text,
      output_name: output_name,
      lang: "vi",
      slow_speech: false,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    return await fetch(`${apiUrl}/api/tts/google`, requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        return getFileFromUrl(`${apiUrl}/api/download?filename=${output_name}`);
        //preview.ref.current.src = `https://www.netdancetalent.asia/download?filename=${output_name}`;
        //preview.ref.current.pause();
        //preview.ref.current.load();
      })
      .catch((error) => console.log("error", error));
  };
  const tts_zalo = async (text, props = { speaker_id: 1, speed: 1 }) => {
    if (!text) throw new Error("text is null");
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const output_name = randomUUID();

    var raw = JSON.stringify({
      input_text: text,
      output_name_zalo: output_name,
      speaker_id: props.speaker_id,
      speed: props.speed,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    return await fetch(`${apiUrl}/api/tts/zalo`, requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        return getFileFromUrl(`${apiUrl}/api/download?filename=${output_name}`);
        //preview.ref.current.src = `https://www.netdancetalent.asia/download?filename=${output_name}`;
        //preview.ref.current.pause();
        //preview.ref.current.load();
      })
      .catch((error) => console.log("error", error));
  };
  const tts_hugging = async (text) => {
    if (!text) throw new Error("text is null");
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const output_name = randomUUID();

    var raw = JSON.stringify({
      text: text,
      gender: 0,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    return await fetch(
      `${apiUrl}/api/tts/hugging`,
      requestOptions
    )
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        return getFileFromUrl(`${apiUrl}/api/download?filename=${output_name}`);
        //preview.ref.current.src = `https://www.netdancetalent.asia/download?filename=${output_name}`;
        //preview.ref.current.pause();
        //preview.ref.current.load();
      })
      .catch((error) => console.log("error", error));
  };
  const sq2sq_summary_vn = async (text) => {
    if (!text) throw new Error("text is null");
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const output_name = randomUUID();

    var raw = JSON.stringify({
      user_input: text,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    return await fetch(`${apiUrl}/api/openai/vn`, requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        return result.response;
        //preview.ref.current.src = `https://www.netdancetalent.asia/download?filename=${output_name}`;
        //preview.ref.current.pause();
        //preview.ref.current.load();
      })
      .catch((error) => console.log("error", error));
  };
  const sq2sq_summary_eng = async (text) => {
    if (!text) throw new Error("text is null");
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const output_name = randomUUID();

    var raw = JSON.stringify({
      user_input: text,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    return await fetch(
      `${apiUrl}/api/openai/eng`,
      requestOptions
    )
      .then((response) => {
        return response.json()
      })
      .then((result) => {
        return result.response;
        //preview.ref.current.src = `https://www.netdancetalent.asia/download?filename=${output_name}`;
        //preview.ref.current.pause();
        //preview.ref.current.load();
      })
      .catch((error) => console.log("error", error));
  };
  const text2Image = async (text) => {
    if (!text) throw new Error("text is null");

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      prompt: text,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    return await fetch(`${apiUrl}/api/text2image`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        const res = JSON.parse(result);
        return getFileFromUrl(res["result"]);
        //console.log(preview.ref.current.src, "\n", res, res["result"]);
        //preview.ref.current.src = res["result"];
      })
      .catch((error) => console.log("error", error));
  };
  const sq2sq_QA = async (text) => {
    if (!text) throw new Error("text is null");

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      question: text,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    return await fetch(`${apiUrl}/api/answer`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        return result;
        //console.log(preview.ref.current.src, "\n", res, res["result"]);
        //preview.ref.current.src = res["result"];
      })
      .catch((error) => console.log("error", error));
  };

  const boxSize = {
    width: defaultValue.defaultBoxSize.width,
    height: defaultValue.defaultBoxSize.height,
  };

  const setPositionResult = (e) => {
    e.stopPropagation();
    const wsContainer = document.getElementById("ws-container");
    const workspace = document.querySelector(".whitespace");
    let rect;
    if (workspace) {
      rect = workspace.getBoundingClientRect();
    }
    const dirX =
      // (window.innerWidth / 2 - transform.positionX) / transform.scale -
      // boxSize.width / 2;
      (window.innerWidth / 2 - transform.positionX) / transform.scale +
      boxSize.width;

    const dirY =
      (rect.height - window.innerHeight / 2 + transform.positionY) /
      transform.scale +
      Math.floor(Math.random() * (80 - 40 + 1)) +
      40;
    setDefaultPosition({
      x: dirX,
      y: dirY,
    });
  };

  const getSampleValue = (type) => {
    switch (type) {
      case "Text":
        return Promise.resolve("lorem");
      case "Audio":
        return getFileFromUrl(
          "https://us-tuna-sounds-files.voicemod.net/586170f0-fd6a-4faf-bc24-072eb2810f4b-1703754367944.mp3"
        );
      case "Image":
        return getFileFromUrl(
          "https://1.bp.blogspot.com/_GrGWs0PdE_Y/THU-Iswf-7I/AAAAAAAAAEI/rlPFbzCNArc/s1600/sky-04.jpg"
        );
      case "Video":
        return getFileFromUrl(
          "https://v6.cdnpk.net/videvo_files/video/partners1012/large_watermarked/h792f814a_Brutatema01411794_1_preview.mp4"
        );
      default:
        return Promise.resolve(null);
    }
  };
  const [isPending, startTransition] = useTransition();
  const [newElement, setNewElement] = useState(null);
  const handleResult = (e) => {
    // if (boxSelected) {
    //   switch (boxSelected.type) {
    //     case "Text":
    //       const inputText = boxSelected.value;
    //       console.log("input", inputText);
    //       break;

    //     default: //file value
    //       const inputFile = boxSelected.value;
    //       console.log("input", inputFile);
    //   }
    // }

    // const newE = addElement(result); //result type Image, Text, Audio, Video
    startTransition(() => {
      setNewElement(addElement(result, true));
    });
    // boxSelected.endpoint.push(newE.boxRef);
    // updateElement(boxSelected.type, boxSelected.id, {
    //   endpoint: [ newE.boxRef, ...boxSelected.endpoint],
    // });
    console.log(boxSelected);
    console.log("screen: ", screen);
    if (window.innerWidth <= defaultValue.tabletScreenSize) {
      handleClosePopup(); //in mobile screen, close popup when clicked transfer
    }
  };
  const [showTransfer, setShowTransfer] = useState(false);
  const handleInitNewElement = async (newEl) => {
    if (boxSelected) {
      switch (boxSelected.type) {
        case "Text":
          const inputText = boxSelected.value;
          console.log("input", inputText);
          break;

        default: //file value
          const inputFile = boxSelected.value;
          console.log("input", inputFile);
      }
    }

    console.assert(newEl.boxRef, "box ref null");
    updateElement(boxSelected.type, boxSelected.id, {
      endpoint: [...boxSelected.endpoint, newEl.boxRef],
    });

    /*fetching here */
    try {
      switch (boxSelected.type) {
        case "Text":
          if (indexTool == 0) {
            newEl.children.ref.current.setInput(await tts_google(boxSelected.value)); // fetch result type:data, file
          } else if (indexTool == 1) {
            newEl.children.ref.current.setInput(await tts_zalo(boxSelected.value, { speaker_id: 1, speed: 1 }));
          } else if (indexTool == 2) {
            newEl.children.ref.current.setInput(await tts_hugging(boxSelected.value));
          } else if (indexTool == 3) {
            newEl.children.ref.current.setInput(await text2Image(boxSelected.value));
          } else if (indexTool == 4) {
            newEl.children.ref.current.setInput(await sq2sq_summary_vn(boxSelected.value));
          } else if (indexTool == 5) {
            newEl.children.ref.current.setInput(await sq2sq_summary_eng(boxSelected.value));
          }
          else if (indexTool == 6) {
            newEl.children.ref.current.setInput(await sq2sq_QA(boxSelected.value));
          }
          else {
            alert("not found type");
            console.error("not found type");
          }
          break;
        default:
          await getSampleValue(result).then((result) => {
            newEl.children.ref.current.setInput(result); // fetch result type:data, file
            console.log(newEl);
            //updateElement(newEl.type, newEl.id, {
            //    parent: boxSelected.boxRef,
            //});
          });
      }
      //newEl.children.ref.current.setInput(result); // fetch result type:data, file
      updateElement(newEl.type, newEl.id, {
        parent: boxSelected.boxRef,
        onCreating: false
      });
      toast.success('Successfully')
      //await getSampleValue(result).then((result) => {
      //    newEl.children.ref.current.setInput(result); // fetch result type:data, file
      //    console.log(newEl);
      //    updateElement(newEl.type, newEl.id, {
      //        parent: boxSelected.boxRef,
      //    });
      //});
    } catch (error) {
      removeElement(newEl);
      toast.error(`Create fail`);
      console.error("execute fail", error);
    }
  };

  useEffect(() => {
    if (!newElement) return;
    handleInitNewElement({ ...newElement });
  }, [newElement]);

  useEffect(() => {
    if (boxSelected) {
      switch (boxSelected.type) {
        case "Text":
          break;
        default: //file
      }
      setShowTransfer(boxSelected.isValid);
    }
  }, [boxSelected]);

  return (
    boxSelected && <>
      {/* {screen ? ( */}
      {/* <> */}
      {/* <div
            className="fixed left-0 top-0 z-[100] md:w-0 md:h-0 lg:w-0 lg:h-0 animation-[open-popup] transition-[0.25s] overlay_customzie bg-overlay md:bg-transparent lg:bg-transparent w-full h-full"
            ref={parentRef}
            onClick={() => handleClosePopup()}
            onTouchStart={() => handleClosePopup()}
          > */}
      <Draggable onDrag={(e) => e.stopPropagation()} disabled={!customize}>
        <div
          className="z-100 max-h-[190px] lg:max-h-fit md:max-h-fit h-fit shadow-md w-[180px] container_customize scrollar-cus overflow-auto bg-white md:w-[350px] lg:w-[350px] lg:border-2 lg:border-grey md:border-2 md:border-grey rounded-tr-0 rounded-br-0 rounded-tl-[16px] rounded-bl-[16px] pt-1 px-3 pb-0 fixed top-[20%] md:top-[20%] md:right-0 right-0"
          onClick={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
        >
          <div className="bpx-2 w-full">
            <div className="flex items-center justify-center text-lg font-bold md:pt-2 lg:pt-2 w-full border-b-2 mb-2 md:pb-3 lg:pb-3">
              <span className="text-blue uppercase lg:text-lg text-[14px]">
                {" "}
                transfer {title}
              </span>
              {screen && (
                <XCircle
                  size={28}
                  color="white"
                  className="lg:hidden md:hidden cursor-pointer font-bold bg-[#e74c3c] p-1 absolute top-0 right-0 rounded-bl-[15px]"
                  onClick={() => handleClosePopup()}
                  onTouchStart={() => handleClosePopup()}
                />
              )}
            </div>
            <Dropdownlist
              title="Tools"
              options={tools.map((v) => {
                return v.title;
              })}
              callback={displayToolSelected}
              selected={indexTool}
            />
            {currentTool}
          </div>
          <div className="flex justify-end my-2">
            {
              // (transfer === "Text" && inputText === true) ||
              // (transfer === "Image" && inputImage === true) ||
              // (transfer === "Video" && inputVideo === true) ||
              // (transfer === "Audio" && inputAudio === true) ||
              // (transfer === "Record" && inputRecord === true) ||
              // (transfer === "URL" && inputUrl === true) ||
              showTransfer ? (
                <Button
                  title="Transfer"
                  onMouseDown={(e) => {
                    setPositionResult(e);
                  }}
                  onMouseUp={(e) => handleResult(e)}
                  onTouchStart={(e) => {
                    setPositionResult(e);
                  }}
                  onTouchEnd={(e) => handleResult(e)}
                  disabled={isPending}
                />
              ) : (
                <></>
              )
            }
          </div>
          {/* PREVIEW */}
        </div>
      </Draggable>
      {/* </div> */}
      {/* </> */}
      {/* ) : (
        <Draggable>
          <div
            className="z-[100] md:hidden lg:hidden fixed top-[50%] right-0 bg-white border-[#3498DB] border p-3 flex items-center justify-center rounded-full"
            onClick={() => setScreen(true)}
            onTouchStart={() => setScreen(true)}
          >
            <Swap size={32} className="" color="#3498DB" />
          </div>
        </Draggable>
      )} */}
    </>
  );
}
export default Customize;
