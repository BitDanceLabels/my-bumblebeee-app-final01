// import { Repeat } from "@phosphor-icons/react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    deleteDataByIdText,
    dontClickInputText,
} from "../../redux/clickTextSlice";
import {
    deleteDataByIdImage,
    dontClickImage,
} from "../../redux/clickImageSlice";
import Element, { useBoxContext } from "./Element";
import Customize from "../Customize/Customize";
import ToSpeech from "../Customize/ToSpeech";
import {
    deleteDataByIdUrl,
    dontClickInputUrl,
} from "../../redux/clickURLSlice";
import {
    deleteDataByIdRecord,
    dontClickRecord,
} from "../../redux/clickRecordSlice";
import {
    deleteDataByIdVideo,
    dontClickVideo,
} from "../../redux/clickVideoSlice";
import {
    deleteDataByIdAudio,
    dontClickAudio,
} from "../../redux/clickAudioSlice";
import { onTypeModel } from "../../redux/typeModelSlice";
import Preview from "../Customize/Preview";
import RightClickMenu from "../PopupDragFile/PopupContextMenu";
import { dontClickDelete } from "../../redux/clickDeletefile";
import { onClickSelectData } from "../../redux/clickSelectData";
import Tools from "../Customize/Tools";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { NotActiveTools } from "../../redux/activeToolsSlice";
import { Droppable } from "react-drag-and-drop";
import Xarrow, { Xwrapper } from "react-xarrows";
import { onClickDelete } from "../../redux/clickDeletefile";

function Whitespace(props) {
    const deleteInput = useSelector((state) => state.clickDelete.value);
    const dispatch = useDispatch();
    const [onDelete, setOnDelete] = useState(true);
    const [update2, setUpdate2] = useState(0);
    const [isOpenCustomize, setIsOpenCustomize] = useState(false);
    const [DataOpenCustomize, setDataOpenCustomize] = useState({
        tools: [],
        title: "",
    });
    const [focusElement, setFocusElement] = useState(null);
    const tools = useSelector((tool) => tool.tools.value);
    const customize = useSelector((cus) => cus.customize.value);
    const onDrop = (value, e) => {
        e.stopPropagation();
        props.addElement(value.components);
    };

    const handleOpenCustomize = (typeModel, element) => {
        if (focusElement === element) return;
        // dispatch(onTypeModel(typeModel));
        setFocusElement(element);
        setIsOpenCustomize(true);
        setDataOpenCustomize((data) => {
            data.title = typeModel;
            switch (typeModel) {
                case "Text":
                    data.tools = [
                        {
                            title: "Text to speech - Google",
                            comp: <></>,
                            preview: <Preview type="Speech" />,
                            result: "Audio",
                        },
                        {
                            title: "Text to speech - Zalo",
                            comp: <ToSpeech />,
                            preview: <Preview type="Speech" />,
                            result: "Audio",
                        },
                        {
                            title: "Text to speech - Hugging",
                            comp: <></>,
                            preview: <Preview type="Speech" />,
                            result: "Audio",
                        },
                        {
                            title: "Text to image",
                            comp: <></>,
                            preview: <Preview type="Image" />,
                            result: "Image",
                        },
                        {
                            title: "Text summary VN",
                            comp: <></>,
                            preview: <Preview type="Text" />,
                            result: "Text",
                        },
                        {
                            title: "Text summary ENG",
                            comp: <></>,
                            preview: <Preview type="Text" />,
                            result: "Text",
                        },
                        {
                            title: "Q&A",
                            comp: <></>,
                            preview: <Preview type="Text" />,
                            result: "Text",
                        },
                    ];
                    break;
                case "Image":
                    data.tools = [
                        {
                            title: "Image to text",
                            comp: <></>,
                            preview: <Preview type="Text" />,
                            result: "Text",
                        },
                        {
                            title: "Image to video",
                            comp: <></>,
                            preview: <Preview type="Video" />,
                            result: "Video",
                        },
                        {
                            title: "Image to audio",
                            comp: <></>,
                            preview: <Preview type="Speech" />,
                            result: "Audio",
                        },
                    ];
                    break;
                case "Video":
                    data.tools = [
                        {
                            title: "Video to text",
                            comp: <></>,
                            preview: <Preview type="Text" />,
                            result: "Text",
                        },
                    ];
                    break;
                case "Audio":
                    data.tools = [
                        {
                            title: "Speech to text",
                            comp: <></>,
                            preview: <Preview type="Text" />,
                            result: "Text",
                        },
                        {
                            title: "Speech to image",
                            comp: <></>,
                            preview: <Preview type="Image" />,
                            result: "Image",
                        },
                    ];
                    break;
                case "URL":
                    data.tools = [
                        {
                            title: "URL to ...",
                            comp: <></>,
                            preview: <></>,
                            result: "",
                        },
                    ];
                    break;
                case "Record":
                    data.tools = [
                        {
                            title: "Record to text",
                            comp: <></>,
                            preview: <Preview type="Text" />,
                            result: "Text",
                        },
                        {
                            title: "Record to video",
                            comp: <></>,
                            preview: <Preview type="Video" />,
                            result: "Video",
                        },
                    ];
                    break;
                default:
                    break;
            }
            return data;
        });
    };
    const [scaleValue, setScaleValue] = useState(1);
    // const [boxRef, setBoxRef] = useState();
    const [boxSelected, setBoxSelected] = useState(null);

    // const renderedElements = props.data?.map((typeBlock) => (
    //     <>
    //         {typeBlock.list?.length > 0 &&
    //             typeBlock.list?.map((element, index) => {
    //                 return (
    //                     <Element
    //                         type={element.type}
    //                         key={element.type + "_" + element.id}
    //                         coor={element}
    //                         updateCoors={props.updateElement}
    //                         openCustomize={handleOpenCustomize}
    //                         wsScale={scaleValue}
    //                         setBoxSelected={setBoxSelected}
    //                         ref={element.boxRef}
    //                     // setBoxRef={setBoxRef}
    //                     />
    //                 );
    //             })}
    //     </>
    // ));
    const renderedElements = props.data?.map((typeBlock, typeBlockIndex) => (
        <React.Fragment key={`typeBlock_${typeBlockIndex}`}>
            {typeBlock.list?.map((element) => (
                <Element
                    type={element.type}
                    key={`element_${element.type}_${element.id}`}
                    coor={element}
                    updateCoors={props.updateElement}
                    openCustomize={handleOpenCustomize}
                    wsScale={scaleValue}
                    setBoxSelected={setBoxSelected}
                    ref={element.boxRef}
                />
            ))}
        </React.Fragment>
    ));

    // let paths = props.data?.map((typeBlock) => (
    //     <>
    //         {typeBlock.list?.flatMap((element) =>
    //             element.endpoint
    //                 .filter((el) => el.current !== null)
    //                 .map((endpoint) => <Xarrow start={element.boxRef} end={endpoint} />)
    //         )}
    //     </>
    // ));
    let paths = props.data?.map((typeBlock, typeBlockIndex) => (
        <React.Fragment key={`paths_${typeBlockIndex}`}>
            {typeBlock.list?.flatMap((element) =>
                element.endpoint
                    .filter((el) => el.current !== null)
                    .map((endpoint, endpointIndex) => (
                        <Xarrow
                            key={`xarrow_${element.id}_${endpointIndex}`}
                            start={element.boxRef}
                            end={endpoint}
                        />
                    ))
            )}
        </React.Fragment>
    ));

    useEffect(() => {
        setUpdate2((prev) => prev + 1);
    }, [props, props.update, props.data, props.setData]);

    useEffect(() => {
        if (deleteInput === true) {
            // props.data?.map((typeBlock, idx1) => {
            //   typeBlock.list?.map((item, idx2) => {
            //     if (item.isSelected) {
            //       setIsOpenCustomize(false);
            //       // //console.log("check:", item,idx1,idx2)
            //       removeElement(idx1, idx2);
            //       dispatch(dontClickDelete());
            //     }
            //   });
            // });
            handleDeleteSelected();
        }
    }, [deleteInput]);

    // useEffect(() => {
    //   if (onDelete === false) {
    //     props.data?.map((typeBlock, idx1) => {
    //       typeBlock.list?.map((item, idx2) => {
    //         if (item.isSelected) {
    //           setIsOpenCustomize(false);
    //           // //console.log("check:", item,idx1,idx2)
    //           removeElement(idx1, idx2);
    //           setOnDelete(true);
    //           switch (item.type) {
    //             case "Text":
    //               dispatch(deleteDataByIdText(item.id));
    //               break;
    //             case "Image":
    //               dispatch(deleteDataByIdImage(item.id));

    //               break;
    //             case "Video":
    //               dispatch(deleteDataByIdVideo(item.id));

    //               break;
    //             case "Audio":
    //               dispatch(deleteDataByIdAudio(item.id));

    //               break;
    //             case "URL":
    //               dispatch(deleteDataByIdUrl(item.id));

    //               break;
    //             case "Record":
    //               dispatch(deleteDataByIdRecord(item.id));

    //               break;
    //             default:
    //               break;
    //           }
    //           setIsOpenCustomize(false);
    //           // //console.log("check:", item,idx1,idx2)
    //           removeElement(idx1, idx2);
    //         }
    //       });
    //     });
    //     return () => {
    //       if (onDelete === false) {
    //         props.data?.map((typeBlock, idx1) => {
    //           typeBlock.list?.map((item, idx2) => {
    //             if (item.isSelected) {
    //               removeElement(idx1, idx2);
    //               setOnDelete(true);
    //               switch (item.type) {
    //                 case "Text":
    //                   dispatch(deleteDataByIdText(item.id));
    //                   break;
    //                 case "Image":
    //                   dispatch(deleteDataByIdImage(item.id));

    //                   break;
    //                 case "Video":
    //                   dispatch(deleteDataByIdVideo(item.id));

    //                   break;
    //                 case "Audio":
    //                   dispatch(deleteDataByIdAudio(item.id));

    //                   break;
    //                 case "URL":
    //                   dispatch(deleteDataByIdUrl(item.id));

    //                   break;
    //                 case "Record":
    //                   dispatch(deleteDataByIdRecord(item.id));

    //                   break;
    //                 default:
    //                   break;
    //               }
    //               removeElement(idx1, idx2);
    //               setOnDelete(true);
    //             }
    //           });
    //         });
    //       }
    //     };
    //   }
    // }, [onDelete]);

    const [i, setI] = useState({});

    // useEffect(() => {
    //   props.data?.map((typeBlock, idx1) => {
    //     typeBlock.list?.map((item, idx2) => {
    //         // //console.log("acnkanc:", item)
    //         const { id, type } = item;
    //         // setIsOpenCustomize(false);
    //         // // //console.log("check:", item,idx1,idx2)
    //         // removeElement(idx1, idx2);
    //         // setOnDelete(true)
    //         // dispatch(onClickSelectData({ id, type }));
    //         // dispatch(NotActiveTools());
    //         setI(item);
    //         // setSelect(item.isSelected)
    //       }
    //     });
    //   });
    //   return () => {

    //     props.data?.map((typeBlock, idx1) => {
    //       // //console.log("acnkanc:",typeBlock )
    //       typeBlock.list?.map((item, idx2) => {
    //         if (item.isSelected) {
    //           const { id, type } = item;
    //           // setIsOpenCustomize(false);
    //           // // //console.log("check:", item,idx1,idx2)
    //           // removeElement(idx1, idx2);
    //           // setOnDelete(true)
    //           // dispatch(onClickSelectData({ id, type }));
    //           // dispatch(NotActiveTools());

    //           setI(item);
    //           // setSelect(item.isSelected)
    //         }
    //       });
    //     });
    //   };
    // }, [props.data]);

    useEffect(() => {
        const handleDeleteSelected_BackSpace = (e) => {
            const isInputFocused =
                document.activeElement.tagName === "INPUT" ||
                document.activeElement.tagName === "TEXTAREA";
            if (e.key === "Backspace" && !isInputFocused) {
                // handleDeleteSelected();
                dispatch(onClickDelete());
            }
        };

        document.addEventListener("keyup", handleDeleteSelected_BackSpace);

        return () => {
            document.removeEventListener("keyup", handleDeleteSelected_BackSpace);
        };
    });

    const handleDeleteSelected = () => {
        if (boxSelected && boxSelected.boxRef.current != null) {
            props.data?.map((typeBlock, idx1) => {
                if (typeBlock.typeName === boxSelected.type)
                    typeBlock.list?.map((item, idx2) => {
                        if (item.id === boxSelected.id) {
                            removeElement(idx1, idx2);
                        }
                    });
            });
        } else {
            dispatch(dontClickDelete());
        }
    };

    const removeElementC = (el) => {
        if (el && el.boxRef.current != null) {
            props.data?.map((typeBlock, idx1) => {
                if (typeBlock.typeName === el.type)
                    typeBlock.list?.map((item, idx2) => {
                        if (item.id === el.id) {
                            removeElement(idx1, idx2);
                        }
                    });
            });
        } else {
            dispatch(dontClickDelete());
        }
    };

    const removeElement = (idx1, idx2) => {
        var data = props.data;
        if (data && data[idx1] && data[idx1].list && data[idx1].list[idx2]) {
            const target = data[idx1].list[idx2];
            const isBoxSelected = target.id === boxSelected.id && target.type === boxSelected.type;
            data[idx1].list.splice(idx2, 1);
            console.log({ isBoxSelected, target, boxSelected })
            if (isBoxSelected) {
                console.log("deleted boxselected")
                setBoxSelected(null)
                setIsOpenCustomize(false);
            }
            props.setData(data);
        } else {
            console.log("deleted ingored null")
        }
        dispatch(dontClickDelete());
    };

    const wsRef = useRef();
    const transformDefault = {
        scale: 0.6,
        positionX: 0,
        positionY: 0,
    };
    return (
        <>
            <Xwrapper>
                <TransformWrapper
                    onTransformed={(ref, state) => {
                        props.setTransform(state);
                        setScaleValue(state.scale);
                    }}
                    centerOnInit={true}
                    minScale={0.3}
                    maxScale={10}
                    initialScale={transformDefault.scale}
                    centerZoomedOutside={true}
                    doubleClick={{ disabled: true }}
                >
                    <TransformComponent
                        wrapperStyle={{ width: "100vw", height: "100vh" }}
                    >
                        <Droppable
                            types={["components"]} // <= allowed drop types
                            onDrop={onDrop}
                            id="droppable"
                        >
                            <div
                                className="w-[10000px] h-[10000px] bg-repeat whitespace"
                                id="boxDrop"
                                key={"boxDrop"}
                                ref={wsRef}
                            >
                                <div
                                    className="w-full h-full"
                                    style={{
                                        backgroundColor: "rgba(255,255,255,.6)",
                                    }}
                                >
                                    {renderedElements}
                                </div>
                            </div>
                        </Droppable>
                    </TransformComponent>
                </TransformWrapper>
                <div update={update2}>{paths}</div>
            </Xwrapper>

            {isOpenCustomize && (
                <Customize
                    title={DataOpenCustomize.title}
                    tools={DataOpenCustomize.tools}
                    addElement={props.addElement}
                    setDefaultPosition={props.setDefaultPosition}
                    transform={props.transform}
                    boxSelected={boxSelected}
                    updateElement={props.updateElement}
                    // boxRef={boxRef}
                    update={props.update}
                    removeElement={removeElementC}
                />
            )}
            {tools && <Tools />}
        </>
    );
}

export default Whitespace;
