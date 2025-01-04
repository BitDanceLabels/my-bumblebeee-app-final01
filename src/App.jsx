// import React, { useEffect, useState } from "react";
// import Navbar from "./components/Navbar/Navbar";
// import { Audio, Video, Image } from "./components/Input/Media";
// import { TextInput, URLInput } from "./components/Input/Text";
// import Record from "./components/Input/Record";
// import Header from "./components/Header/Header";
// import Whitespace from "./components/Whitespace/Whitespace";
// import Draggable from "react-draggable";
// import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
// import { onClickDataIdType } from "./redux/clickDataIdType";
// import { Toaster } from 'react-hot-toast';

// import Sidebar from "./layouts/Sidebar";
// import MenuProc from "./modals/menu_proc";

// function App() {
//     const dispatch = useDispatch();
//     const defaultValue = useSelector((state) => state.globalDefaultValue.value);
//     const defaultBoxSize = {
//         width: defaultValue.defaultBoxSize.width,
//         height: defaultValue.defaultBoxSize.height,
//     };
//     const [defaultPosition, setDefaultPosition] = useState({
//         x: 0,
//         y: 0,
//     });

//     const [data, setData] = useState([
//         {
//             typeId: 1,
//             typeName: "none",
//             list: [
//                 // {
//                 //   id: 0,
//                 //   type: "none",
//                 //   x: 0,
//                 //   y: 0,
//                 //   w: 0,
//                 //   h: 0,
//                 //   isSelected: false,
//                 //   isValid: false,
//                 //   value: null,
//                 //   z: 0,
//                 //   children: <></>,
//                 //   boxRef: React.createRef(),
//                 //   endpoint: [],
//                 // },
//             ],
//         },
//     ]);
//     const [procedure, setProcedure] = useState([]);
//     const setCenterDefaultrPositionBox = (arr) => {
//         const workspace = document.querySelector(".whitespace");
//         let rect;
//         if (workspace) {
//             rect = workspace.getBoundingClientRect();
//         }
//         setDefaultPosition({
//             x:
//                 (window.innerWidth / 2 - transform.positionX) / transform.scale -
//                 defaultBoxSize.width * arr.length,
//             y:
//                 (rect.height - window.innerHeight / 2 + transform.positionY) /
//                 transform.scale,
//         });
//     };

//     const [update, setUpdate] = useState(0);

//     const elements = (type, self) => {
//         let input;
//         const refBox = React.createRef();
//         switch (type) {
//             case "Text":
//                 input = <TextInput ref={refBox} />;
//                 break;
//             case "URL":
//                 input = <URLInput ref={refBox} />;
//                 break;
//             case "Audio":
//                 input = <Audio ref={refBox} />;
//                 break;
//             case "Video":
//                 input = <Video ref={refBox} />;
//                 break;
//             case "Image":
//                 input = <Image ref={refBox} />;
//                 break;
//             case "Record":
//                 input = <Record ref={refBox} />;
//                 break;
//             default:
//                 input = null; // or any other default value
//         }
//         return input;
//     };
//     const [zDefault, setZDefault] = useState(0);
//     const addElement = (typeName, onCreating = false) => {
//         console.trace()
//         const newEl = {
//             type: typeName,
//             x: defaultPosition.x,
//             y: defaultPosition.y,
//             w: defaultBoxSize.width,
//             h: defaultBoxSize.height,
//             mw: defaultBoxSize.width,
//             mh: defaultBoxSize.height,
//             isSelected: false,
//             address: "",
//             value: null,
//             isValid: false,
//             onCreating: onCreating,
//             z: 0,
//             children: elements(typeName),
//             parent: null,
//             boxRef: React.createRef(),
//             endpoint: [],
//         };
//         let addedEl = newEl;
//         setData((prev) => {
//             let maxId = 0;
//             prev.forEach((type) => {
//                 // Object.keys(prev).forEach((type) => {
//                 if (type.typeName === typeName) {
//                     const maxInType = Math.max(...type.list.map((el) => el.id));
//                     maxId = Math.max(maxId, maxInType);
//                 }
//             });

//             let typeFound = prev.find((type) => type.typeName === typeName);

//             // Not found type
//             if (!typeFound) {
//                 const typeId = prev.length + 1;
//                 setZDefault(zDefault + 1);
//                 addedEl = { ...newEl, id: maxId + 1, z: zDefault };
//                 typeFound = {
//                     typeId,
//                     typeName,
//                     // list: [{ ...newEl, id: maxId + 1 }],
//                     list: [addedEl],
//                 };
//                 prev.push(typeFound);
//                 return prev;
//             }
//             // Found type
//             else {
//                 setZDefault(zDefault + 1);
//                 addedEl = {
//                     ...newEl,
//                     id: maxId + 1,
//                     z: zDefault,
//                 };
//                 typeFound.list.push(addedEl);
//                 return prev;
//             }
//         });
//         setUpdate((prev) => prev + 1);
//         return addedEl;
//     };

//     const updateElement = (type, id, values, syncValues) => {
//         setData((prev) => {
//             return prev.map((typeBlock) => {
//                 // Update values inside this type Blockblock
//                 if (typeBlock.typeName === type) {
//                     typeBlock.list = typeBlock.list.map((el) => {
//                         if (el.id === id) return { ...el, ...values };
//                         if (syncValues) return { ...el, ...syncValues };
//                         return el;
//                     });
//                     return typeBlock;
//                 }
//                 if (syncValues) {
//                     typeBlock.list = typeBlock.list?.map((el) => {
//                         return { ...el, ...syncValues };
//                     });
//                     return typeBlock;
//                 }
//                 return typeBlock;
//             });
//         });
//         setUpdate((prev) => prev + 1);
//     };
//     useEffect(() => {
//         const data1 = data.map((item) => item.list);
//         const allTypes = data1.flatMap((innerArray) =>
//             innerArray.map((obj) => obj.type)
//         );
//         const allId = data1.flatMap((innerArray) =>
//             innerArray.map((obj) => obj.id)
//         );
//         const allTypesFromSecond = allTypes.slice(1);
//         const allIdFromSecond = allId.slice(1);
//         // dispatch(onClickDataIdType({ allTypesFromSecond, allIdFromSecond }));
//     }, [data]);
//     useEffect(() => {
//         procedure.map((elm, i) => {
//             if (i < procedure.length - 1) {
//                 const child = procedure[i + 1];
//                 // console.log(elm.boxRef, child.boxRef);
//                 elm.endpoint.push(child.boxRef);
//             }
//         });
//     }, [procedure]);

//     useEffect(() => {
//         console.log(data);
//     }, [data]);

//     const createProcedures = (types, dir) => {
//         setProcedure(""); // clear data
//         types.forEach((type, i) => {
//             setProcedure((pre) => {
//                 const El = addElement(type);
//                 console.log(dir);
//                 if (dir === "horizontal") {
//                     El.x =
//                         defaultPosition.x + (70 + defaultBoxSize.width) * (pre.length + 1);
//                     El.y = defaultPosition.y;
//                 } else {
//                     El.x = defaultPosition.x + defaultBoxSize.width * types.length;
//                     El.y =
//                         defaultPosition.y -
//                         (70 + defaultBoxSize.height) * (pre.length + 1) +
//                         types.length * defaultBoxSize.height;
//                 }
//                 El.parent = pre[pre.length - 1];
//                 return [...pre, El];
//             });
//         });
//     };
//     const toolbox = useSelector((state) => state.toolbox.value);
//     const [transform, setTransform] = useState({
//         scale: 1,
//         positionX: 0,
//         positionY: 0,
//     });

//     ///
//     // const defaultValue = useSelector((state) => state.globalDefaultValue.value);
//     // const defaultBoxSize = {
//     //     width: defaultValue.defaultBoxSize.width,
//     //     height: defaultValue.defaultBoxSize.height,
//     // };
//     const [isSidebarVisible, setIsSidebarVisible] = useState(true);
//     const [isMenuOpen, setIsMenuOpen] = useState(false);
//     const [currentProcess, setCurrentProcess] = useState(null);
//     const [groups, setGroups] = useState([
//         {
//             id: "group_1",
//             name: "Nhóm Yêu Thích",
//             processes: [
//                 { id: "process_1", name: "Tiến trình A" },
//                 { id: "process_2", name: "Tiến trình B" },
//             ],
//         },
//         {
//             id: "group_2",
//             name: "Pending",
//             processes: [
//                 { id: "process_3", name: "Tiến trình C" },
//                 { id: "process_4", name: "Tiến trình D" },
//             ],
//         },
//     ]);

//     const handleCreateNewProcess = () => {
//         setIsMenuOpen(true);
//     };

//     const handleProcessSelect = (process) => {
//         setCurrentProcess(process);
//         console.log("Mở tiến trình:", process);
//     };

//     const handleToggleSidebar = () => {
//         setIsSidebarVisible(!isSidebarVisible);
//     };

//     const handleAddProcess = (groupID, processName) => {
//         const newProcess = {
//             id: `process_${Date.now()}`,
//             name: processName,
//         };
//         setGroups((prevGroups) =>
//             prevGroups.map((group) =>
//                 group.id === groupID
//                     ? { ...group, processes: [...group.processes, newProcess] }
//                     : group
//             )
//         );
//     };
//     const handleSelectProcess = (process) => {
//         setCurrentProcess(process);
//         console.log(`Mở tiến trình: ${process.name}`);
//         setIsMenuOpen(false);
//     };


//     return (
//         <div className="flex h-screen">
//             <button className="toggle-sidebar" onClick={handleToggleSidebar}>
//                 {isSidebarVisible ? "Ẩn thanh tiến trình" : "Hiện thanh tiến trình"}
//             </button>
//             {isSidebarVisible && (
//                 <Sidebar
//                     groups={groups}
//                     onCreateNewProcess={handleCreateNewProcess}
//                     onProcessSelect={handleProcessSelect}
//                 />
//             )}
//             <div
//                 className={`flex-grow transition-all ${isSidebarVisible ? "w-4/5" : "w-full"
//                     }`}
//             >
//                 <h1 className="text-center text-2xl font-bold p-4">
//                     {currentProcess
//                         ? `Đang xem: ${currentProcess.name}`
//                         : "Trang bảng công cụ"}
//                 </h1>


//                 <div
//                     className="w-full h-screen bg-body relative flex flex-col items-stretch overflow-auto"
//                     id="ws-container"
//                 >
//                     <div>
//                         <Header
//                             createProcedures={createProcedures}
//                             setDefaultPosition={setCenterDefaultrPositionBox}
//                         />
//                     </div>
//                     <div className={`w-full h-ful overflow-hidden cursor-grab`}>
//                         <Whitespace
//                             data={data}
//                             setData={setData}
//                             update={update}
//                             updateElement={updateElement}
//                             setTransform={setTransform}
//                             transform={transform}
//                             addElement={addElement}
//                             setDefaultPosition={setDefaultPosition}
//                         />
//                     </div>
//                     <Draggable disabled={!toolbox}>
//                         <div className="fixed z-20 bottom-0 left-0 right-0 flex justify-center items-center ">
//                             <Navbar
//                                 data={data}
//                                 addElement={addElement}
//                                 setDefaultPosition={setDefaultPosition}
//                                 transform={transform}
//                             />
//                         </div>
//                         {/* <div
//                             className={`navbar ${isSidebarVisible ? 'with-sidebar' : 'no-sidebar'}`}
//                         >
//                             <Navbar
//                                 data={data}
//                                 addElement={addElement}
//                                 setDefaultPosition={setDefaultPosition}
//                                 transform={transform}
//                             />
//                         </div> */}
//                     </Draggable>
//                     <Toaster />
//                 </div>


//             </div>
//             {isMenuOpen && (
//                 <MenuProc
//                     groups={groups}
//                     onClose={() => setIsMenuOpen(false)}
//                     onAddProcess={handleAddProcess}
//                     onSelectProcess={handleSelectProcess}
//                 />
//             )}
//         </div>
//     );
// }

// export default App;

import React, { useEffect, useState } from "react";
import { createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

// Import các thành phần cần thiết
import './App.css';
import "./scss/index.scss";
import "./scss/chart.scss";
import Sidebar from './components/Sidebar';
import Chart from "./components/Chart";
import Layout from './components/Layout';

// Import các trang
import Dashboard from './page/Dashboard';
import AddProjectPage from './page/AddProject';
import RankingPage from './page/RankingPage';
import ToolBoxPage from "./pages/ToolBoxPage";

function App() {
    const [info, setInfo] = useState();
    const [allInfo, setAllInfo] = useState([]);
    const [currentStudent, setCurrentStudent] = useState(0);

    const students = useSelector(state => state.students);

    // Tạo router sử dụng RouterProvider
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route element={<Layout />}>
                <Route
                    path='/'
                    element={<Dashboard
                        allInfo={allInfo}
                        setAllInfo={setAllInfo}
                        info={info}
                        setInfo={setInfo}
                        currentStudent={currentStudent}
                        setCurrentStudent={setCurrentStudent}
                    />}
                />
                <Route
                    path='/object-user/:id'
                    element={<AddProjectPage
                        allInfo={allInfo}
                        setAllInfo={setAllInfo}
                        info={info}
                        setInfo={setInfo}
                        currentStudent={currentStudent}
                    />}
                />
                <Route path='/rank' element={<RankingPage />} />
            </Route>
        )
    );

    return (
        <>
            {/* Dùng <Routes> cho ToolBoxPage */}
            <Router>
                <Routes>
                    <Route path="/" element={<ToolBoxPage />} />
                </Routes>
            </Router>

            {/* Dùng RouterProvider cho các path còn lại */}
            <RouterProvider router={router} />
        </>
    );
}

export default App;