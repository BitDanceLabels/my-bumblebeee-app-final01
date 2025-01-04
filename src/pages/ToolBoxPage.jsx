import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import { Audio, Video, Image } from "../components/Input/Media";
import { TextInput, URLInput } from "../components/Input/Text";
import Record from "../components/Input/Record";
import Header from "../components/Header/Header";
import Whitespace from "../components/Whitespace/Whitespace";
import Draggable from "react-draggable";
import { useSelector, useDispatch } from "react-redux";
import { onClickDataIdType } from "../redux/clickDataIdType";
import { Toaster } from "react-hot-toast";
import Sidebar from "../layouts/Sidebar";
import MenuProc from "../modals/menu_proc";

function ToolBoxPage() {
    const dispatch = useDispatch();
    const defaultValue = useSelector((state) => state.globalDefaultValue.value);
    const defaultBoxSize = {
        width: defaultValue.defaultBoxSize.width,
        height: defaultValue.defaultBoxSize.height,
    };

    const [defaultPosition, setDefaultPosition] = useState({ x: 0, y: 0 });
    const [data, setData] = useState([
        {
            typeId: 1,
            typeName: "none",
            list: [],
        },
    ]);
    const [procedure, setProcedure] = useState([]);
    const [update, setUpdate] = useState(0);
    const [zDefault, setZDefault] = useState(0);
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [currentProcess, setCurrentProcess] = useState(null);
    const [transform, setTransform] = useState({
        scale: 1,
        positionX: 0,
        positionY: 0,
    });
    const toolbox = useSelector((state) => state.toolbox.value);
    const [groups, setGroups] = useState([
        {
            id: "group_1",
            name: "Nhóm Yêu Thích",
            processes: [
                { id: "process_1", name: "Tiến trình A" },
                { id: "process_2", name: "Tiến trình B" },
            ],
        },
        {
            id: "group_2",
            name: "Pending",
            processes: [
                { id: "process_3", name: "Tiến trình C" },
                { id: "process_4", name: "Tiến trình D" },
            ],
        },
    ]);

    const addElement = (typeName, onCreating = false) => {
        const newEl = {
            type: typeName,
            x: defaultPosition.x,
            y: defaultPosition.y,
            w: defaultBoxSize.width,
            h: defaultBoxSize.height,
            mw: defaultBoxSize.width,
            mh: defaultBoxSize.height,
            isSelected: false,
            address: "",
            value: null,
            isValid: false,
            onCreating: onCreating,
            z: 0,
            children: elements(typeName),
            parent: null,
            boxRef: React.createRef(),
            endpoint: [],
        };
        let addedEl = newEl;
        setData((prev) => {
            let maxId = 0;
            prev.forEach((type) => {
                if (type.typeName === typeName) {
                    const maxInType = Math.max(...type.list.map((el) => el.id));
                    maxId = Math.max(maxId, maxInType);
                }
            });

            let typeFound = prev.find((type) => type.typeName === typeName);
            if (!typeFound) {
                const typeId = prev.length + 1;
                addedEl = { ...newEl, id: maxId + 1, z: zDefault + 1 };
                typeFound = {
                    typeId,
                    typeName,
                    list: [addedEl],
                };
                prev.push(typeFound);
                return prev;
            } else {
                addedEl = { ...newEl, id: maxId + 1, z: zDefault + 1 };
                typeFound.list.push(addedEl);
                return prev;
            }
        });
        setZDefault((prev) => prev + 1);
        return addedEl;
    };

    const elements = (type) => {
        switch (type) {
            case "Text":
                return <TextInput />;
            case "URL":
                return <URLInput />;
            case "Audio":
                return <Audio />;
            case "Video":
                return <Video />;
            case "Image":
                return <Image />;
            case "Record":
                return <Record />;
            default:
                return null;
        }
    };

    return (
        <div className="flex h-screen">
            <button className="toggle-sidebar" onClick={() => setIsSidebarVisible(!isSidebarVisible)}>
                {isSidebarVisible ? "Ẩn thanh tiến trình" : "Hiện thanh tiến trình"}
            </button>
            {isSidebarVisible && (
                <Sidebar
                    groups={groups}
                    onCreateNewProcess={() => setIsMenuOpen(true)}
                    onProcessSelect={setCurrentProcess}
                />
            )}
            <div className={`flex-grow transition-all ${isSidebarVisible ? "w-4/5" : "w-full"}`}>
                <h1 className="text-center text-2xl font-bold p-4">
                    {currentProcess
                        ? `Đang xem: ${currentProcess.name}`
                        : "Trang bảng công cụ"}
                </h1>
                <Whitespace
                    data={data}
                    setData={setData}
                    update={update}
                    updateElement={() => { }}
                    addElement={addElement}
                    setTransform={setTransform}
                    setDefaultPosition={setDefaultPosition}
                    transform={transform}
                />
                <Draggable disabled={!toolbox}>
                    <div className="fixed z-20 bottom-0 left-0 right-0 flex justify-center items-center ">
                        <Navbar
                            data={data}
                            addElement={addElement}
                            setDefaultPosition={setDefaultPosition}
                            transform={transform}
                        />
                    </div>
                </Draggable>
                <Toaster />
            </div>
            {isMenuOpen && (
                <MenuProc
                    groups={groups}
                    onClose={() => setIsMenuOpen(false)}
                    onAddProcess={(groupID, processName) => {
                        const newProcess = {
                            id: `process_${Date.now()}`,
                            name: processName,
                        };
                        setGroups((prevGroups) =>
                            prevGroups.map((group) =>
                                group.id === groupID
                                    ? { ...group, processes: [...group.processes, newProcess] }
                                    : group
                            )
                        );
                    }}
                    onSelectProcess={setCurrentProcess}
                />
            )}
        </div>
    );
}

export default ToolBoxPage;