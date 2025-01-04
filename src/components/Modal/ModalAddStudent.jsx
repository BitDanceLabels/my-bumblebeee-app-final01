import axios from "axios";
import React, { useEffect, useState } from "react";
import { Check, Info, LinkSimpleHorizontal, Minus, Pencil, Plus, Star, X, XCircle } from '@phosphor-icons/react'
import { Badge, Modal, ToggleSwitch } from "flowbite-react";
import { useSelector, useDispatch } from "react-redux";
import { studentsActions } from "../../store/features/studentsSlice";
import PDF from '../../asset/images/pdf_icon.svg'

import 'react-dropdown/style.css';
import JSONPretty from 'react-json-pretty';
import Chart from "../Chart";

const recommendLabel = [

    {
        id: '552210',
        name: 'Poster Truyền thông',
        point: 100,
        ratio: 90,
        reviewPer: 'Nguyễn Văn A',
        reviewId: 'D5PP6612',
        reliability: 5,
        result: 'Tốt',
        data: []
    },
    {
        id: '552210',
        name: 'Nhạc Pop',
        point: 100,
        ratio: 90,
        reviewPer: 'Nguyễn Văn A',
        reviewId: 'D5PP6612',
        reliability: 5,
        result: 'Tốt',
        data: []
    },
    {
        id: '552210',
        name: 'Poster Truyền thông',
        point: 100,
        ratio: 80,
        reviewPer: 'Nguyễn Văn A',
        reviewId: 'D5PP6612',
        reliability: 5,
        result: 'Tốt',
        data: []
    },
    {
        id: '552210',
        name: 'Video dạy Tiếng Anh',
        point: 100,
        ratio: 50,
        reviewPer: 'Nguyễn Văn A',
        reviewId: 'D5PP6612',
        reliability: 5,
        result: 'Tốt',
        data: []
    }

]

const signLabel = ['warning', 'failure', 'purple', 'pink']

const ModalAddStudent = ({ type, show, setShow, info, setInfo, allInfo, setAllInfo, currentStudent }) => {
    const [newStu, setNewStu] = useState({
        name: '', email: '', phone: '', pass: '', gender: 'Nam', class: "", img: ''
    })

    const students = useSelector(state => state.students);
    const [properitiesList, setProperitiesList] = useState([{
        id: 0
    }])

    const [count, setCount] = useState(1)
    const [finalArr, setFinalArr] = useState([])
    const [indexItem, setIndexItem] = useState()
    const [loadFile, setLoadFile] = useState(false)
    const [isSwitch, setIsSwitch] = useState(false)
    const [optionType, setOptionType] = useState(false)

    const dispatch = useDispatch();

    useEffect(() => {
        if (allInfo)
            setInfo(allInfo[indexItem])
    }, [allInfo, indexItem])

    useEffect(() => {
        if (show)
            setFinalArr([])
    }, [show])

    const handleChange = (event) => {
        setNewStu(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }))
    }
    const handleSubmit = (event) => {
        setShow(false);

        finalArr?.map((item, idx) => {
            if (type === 'parent')
                dispatch(studentsActions.add({
                    id: students.length + 1,
                    asset: [],
                    ...finalArr[idx]
                }))
            else if (type === 'child') {
                setAllInfo(prev => [
                    ...prev, {
                        id: allInfo?.length + 1,
                        name: item.name,
                        point: item.point,
                        ratio: item.ratio,
                        data: []
                    }
                ])
                dispatch(studentsActions.update({
                    ...students[currentStudent],
                    asset: [
                        ...allInfo, {
                            id: allInfo?.length + 1,
                            name: item.name,
                            point: item.point,
                            ratio: item.ratio,
                            data: []
                        }
                    ]
                }))
            }
        })
    }

    const handleSelectedPro = (idx) => {
        let arr = [...properitiesList];
        let arrTemp = [...arr.splice(idx, 1)]
        setProperitiesList([...arr])
    }

    const handleAddProperities = () => {
        setProperitiesList([...properitiesList, {
            id: count
        }])

        setCount(count + 1)
    }

    const handleDelete = (idx) => {
        let arr = [...properitiesList];
        let arrTemp = [...arr.splice(idx, 1)]
        setProperitiesList([...arr])
    }

    const handleShowInfo = () => {
        const nameList = document.getElementsByClassName('nameTest')
        const pointList = document.getElementsByClassName('pointTest')
        const ratioList = document.getElementsByClassName('ratioTest')

        var arr = []
        for (let i in nameList) {
            if (nameList[i]?.value && pointList[i]?.value && ratioList[i]?.value) {

                arr.push({
                    id: arr?.length + 1,
                    name: nameList[i]?.value,
                    point: pointList[i]?.value,
                    ratio: ratioList[i]?.value,
                    data: allInfo[indexItem]?.data ? allInfo[indexItem]?.data : []
                })
            }

        }

        setFinalArr(arr)

    }

    const handlePostLabel = (name, idx) => {
        const nameList = document.getElementsByClassName('nameTest')
        nameList[idx].value = name
    }

    const handlePostLabel2 = (name, idx) => {
        const nameList = document.getElementsByClassName('nameText')
        nameList[idx].value = name
    }

    const handleSaveInfo = () => {
        setAllInfo(finalArr)
    }

    const handleSelectItem = (item, idx) => {
        setIndexItem(idx)
    }

    const handleDeleteImage = (idx) => {
        var arrTemp = allInfo;
        var arr = arrTemp[indexItem]?.data?.splice(idx, 1)
        setAllInfo([...arrTemp])
    }

    const changeFile = async (e) => {
        // console.log(e)
        // setLoadFile(true)

        const files = document.getElementById('file').files;

        const arr = []

        Object.keys(files).forEach(i => {
            const file = files[i];
            const reader = new FileReader();
            reader.onload = (e) => {
                arr.push({
                    item: file.name,
                    data: e.target.result,
                    type: file.type
                })

                setAllInfo((prevArray) => [
                    ...prevArray.slice(0, indexItem), // Keep the elements before the specified index
                    { ...prevArray[indexItem], data: arr },
                    ...prevArray.slice(indexItem + 1), // Keep the elements after the specified outer index
                ]);

                setFinalArr([...allInfo.slice(0, indexItem), // Keep the elements before the specified index
                { ...allInfo[indexItem], data: arr },
                ...allInfo.slice(indexItem + 1)])

                dispatch(studentsActions.update({
                    ...students[currentStudent],
                    asset: [
                        ...allInfo.slice(0, indexItem), // Keep the elements before the specified index
                        { ...allInfo[indexItem], data: arr },
                        ...allInfo.slice(indexItem + 1), // Keep the elements after the specified outer index
                    ]
                }))
                setLoadFile(e.target.result)
            }
            reader.readAsDataURL(file);
        })


    }

    const optionalType = (e) => {
        setOptionType(e.target.checked)
    }

    return (
        <>
            <Modal style={{ minWidth: window.innerWidth > 1280 ? '66%' : '90%' }} position={`${finalArr?.length > 0 && window.innerWidth > 1280 ? 'center-left' : 'center'}`} show={show} onClose={() => setShow(false)}>
                <Modal.Header>
                    Thêm đối tượng mới
                </Modal.Header>
                <Modal.Body>
                    <form action="javascript:void(0)" onSubmit={handleSubmit}>

                        {properitiesList?.map((item, idx) => (
                            <>
                                <div className={`w-full flex flex-col md:flex-row gap-4 mb-2 ${optionType && "opacity-50"}`}>
                                    <input type="text" id="name" className={`bg-white border-[1px] w-full md:w-1/3 border-[rgba(0,0,0,0.5)] text-gray-900 text-sm rounded-lg block w-2/3 p-2.5 shadow-[4px_4px_4px_rgba(0,0,0,0.25)] ${optionType && "cursor-not-allowed"} nameTest`} disabled={optionType ? true : false} placeholder={`Nhập tên đối tượng ${idx + 1}`} onChange={handleShowInfo} required />
                                    <input type="text" id="point" className={`bg-white border-[1px] w-full md:w-1/3 border-[rgba(0,0,0,0.5)] text-gray-900 text-sm rounded-lg block w-2/3 p-2.5 shadow-[4px_4px_4px_rgba(0,0,0,0.25)] ${optionType && "cursor-not-allowed"} pointTest`} disabled={optionType ? true : false} placeholder="Nhập điểm" onChange={handleShowInfo} required />
                                    <input type="text" id="ratio" className={`bg-white border-[1px] w-full md:w-1/3 border-[rgba(0,0,0,0.5)] text-gray-900 text-sm rounded-lg block w-2/3 p-2.5 shadow-[4px_4px_4px_rgba(0,0,0,0.25)] ${optionType && "cursor-not-allowed"} ratioTest`} disabled={optionType ? true : false} placeholder="Nhập tỷ trọng" onChange={handleShowInfo} required />
                                    {idx > 0 && (
                                        <Minus size={24} color='red' weight="bold" className="cursor-pointer" onClick={() => handleDelete(idx)} />
                                    )}

                                </div>
                                <div className={`flex items-center gap-4 flex-wrap mb-2 ${optionType && "opacity-50"}`}>
                                    {recommendLabel.map((item, idx2) => (
                                        <>
                                            <Badge color={signLabel[idx2]} className="cursor-pointer" onClick={() => handlePostLabel(item.name, idx)} >{item.name}</Badge>
                                        </>
                                    ))}

                                </div>
                            </>
                        ))}

                        <span className="w-full flex gap-4 mt-2 items-center">Bạn có muốn thêm đối tượng bằng từ ngữ?
                            <input id="default-checkbox" onChange={optionalType} type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        </span>

                        {properitiesList?.map((item, idx) => (
                            <>
                                <div className={`w-full flex flex-col md:flex-row gap-4 mb-2 items-center ${!optionType && "hidden"}`}>

                                    <input type="text" id="name" className={`bg-white border-[1px] w-full md:w-1/3 border-[rgba(0,0,0,0.5)] text-gray-900 text-sm rounded-lg block w-2/3 p-2.5 shadow-[4px_4px_4px_rgba(0,0,0,0.25)] nameText`} placeholder={`Nhập tên đối tượng ${idx + 1}`} required />
                                    <input type="text" id="point" className={`bg-white border-[1px] w-full md:w-1/3 border-[rgba(0,0,0,0.5)] text-gray-900 text-sm rounded-lg block w-2/3 p-2.5 shadow-[4px_4px_4px_rgba(0,0,0,0.25)] pointText`} placeholder="Nhập giá trị" required />
                                    <input type="text" id="ratio" className={`bg-white border-[1px] w-full md:w-1/3 border-[rgba(0,0,0,0.5)] text-gray-900 text-sm rounded-lg block w-2/3 p-2.5 shadow-[4px_4px_4px_rgba(0,0,0,0.25)] ratioText`} placeholder="Nhập đánh giá chi tiết" required />
                                    {idx > 0 && (
                                        <Minus size={24} color='red' weight="bold" className="cursor-pointer" onClick={() => handleDelete(idx)} />
                                    )}
                                </div>
                                <div className={`flex items-center gap-4 flex-wrap mb-2 ${!optionType && "hidden"}`}>
                                    {recommendLabel.map((item, idx2) => (
                                        <>
                                            <Badge color={signLabel[idx2]} className="cursor-pointer" onClick={() => handlePostLabel2(item.name, idx)}>{item.name}</Badge>
                                        </>
                                    ))}

                                </div>
                            </>
                        ))}

                        <div className="w-full flex gap-4">
                            <div className="cursor-pointer mt-2 px-4 py-[3px] w-1/2 flex justify-center items-center bg-blue-200 rounded-full" onClick={handleAddProperities}>Thêm</div>
                            <div className="cursor-pointer mt-2 px-4 py-[3px] w-1/2 flex justify-center items-center bg-gray-200 rounded-full" onClick={handleSaveInfo}>Lưu tạm thời</div>

                        </div>
                        <div className="w-full h-[1px] rounded-full bg-black mt-2 mb-4"></div>

                        <span className="w-full py-2">Chi tiết đối tượng</span>
                        <div className="w-full mt-2 p-4 bg-[rgb(224,224,224)] rounded-xl">

                            {finalArr ? finalArr?.map((item, idx) => (
                                <div key={idx} className={`w-full bg-[rgba(255,255,255,0.8)] py-2 px-4 flex flex-col md:flex-row justify-between md:items-center rounded-xl mb-2 hover:text-black text-black`}>
                                    <div className="cursor-pointer md:w-1/3" onClick={() => handleSelectItem(item, idx)}>{item.id}. {item.name}</div>
                                    <div>Điểm số: {item.point} điểm</div>
                                    <div>Tỷ trọng: {item.ratio} %</div>
                                    <div className="flex md:items-center justify-end md:justify-center gap-2">
                                        <Info size={20} color='black' className="cursor-pointer" />
                                        <Pencil size={20} color='black' className="cursor-pointer" />
                                        <LinkSimpleHorizontal size={20} color='black' />
                                        <X size={20} color='black' className="cursor-pointer" />
                                    </div>
                                </div>
                            )) : (
                                <></>
                            )}

                            <div className="w-full h-[1px] rounded-full bg-black mt-2 mb-4"></div>
                            <span>Tài sản/dữ liệu của đối tượng: <span className="italic">{info?.name}</span></span>
                            <div className="w-full bg-white p-4 mt-2 rounded-xl flex justify-start items-center">
                                <span>
                                    Link drive:
                                </span>
                                <form className="flex-1 flex items-center" onSubmit={(event) => { alert("Cập nhật link thành công") }}>
                                    <input type="text" className="w-full ms-1 rounded-md outline-0" />
                                    <button type="submit"></button>
                                </form>
                            </div>
                            <div className="w-full bg-[rgba(255,255,255,0.4)] mt-2 rounded-xl flex justify-center items-center">

                                {info ? loadFile ? (
                                    <>
                                        <div className="w-full h-full flex flex-wrap p-8 gap-8">
                                            {allInfo[indexItem] && allInfo[indexItem]?.data?.map((item, idx) => (
                                                <div className="relative">
                                                    <img id="preview" key={idx} src={item.type === 'application/pdf' ? PDF : item.data} className="h-32 w-32 object-fit rounded-lg shadow-xl" />
                                                    <div className="p-[3px] rounded-full flex justify-center items-center bg-gray-700 absolute -top-2 -right-2 cursor-pointer" onClick={() => handleDeleteImage(idx)}>
                                                        <X size={12} color='white' />
                                                    </div>
                                                </div>
                                            ))}
                                            <label htmlFor="file" className="h-32 w-32 flex justify-center items-center bg-yellow-200 cursor-pointer">
                                                <Plus size={20} color="black" />
                                            </label>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <label htmlFor="file" className="w-full h-full flex pt-8 pb-8 justify-center items-center cursor-pointer">
                                            <Plus size={20} color="black" />
                                        </label>
                                    </>
                                ) : (
                                    <div className="w-full p-8 flex justify-center items-center">
                                        <span className="text-gray-400">Vui lòng thêm đối tượng để thực hiện bổ sung tài sản/dữ liệu của đối tượng</span>
                                    </div>
                                )}

                            </div>
                            {/*  */}
                            <input type="file" id="file" name="file" multiple className="hidden" onChange={changeFile} accept="image/*,application/pdf,audio/mpeg3"></input>
                            {show && finalArr?.length > 0 && (
                                <>
                                    <div className="w-full h-[1px] rounded-full bg-black mt-2 mb-4"></div>

                                    <div className="text-white flex xl:hidden justify-center items-center ">
                                        <Chart allInfo={finalArr} />
                                    </div>
                                </>
                            )}
                            <div className="w-full h-[1px] rounded-full bg-black mt-2 mb-4"></div>
                            {/* Danh sách dữ liệu */}
                            <span>Data dữ liệu theo dạng JSON:</span>
                            <div className="my-2 flex items-center gap-4">
                                <span>Hiện JSON tổng: </span>
                                <ToggleSwitch checked={isSwitch} onChange={setIsSwitch} />
                            </div>

                            <div className="w-full bg-white p-4 mt-2 rounded-xl flex justify-start items-center overflow-x-auto">
                                <JSONPretty id="json-pretty" data={isSwitch ? finalArr : info}></JSONPretty>
                            </div>

                        </div>




                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <div className="w-full flex justify-end items-center cursor-pointer">
                        <button type="submit" className="py-2 px-4 bg-[#3750AA] flex justify-center items-center rounded-full outline-0" onClick={handleSubmit}>
                            <span className="text-white">Thêm</span>
                        </button>
                    </div>
                </Modal.Footer>
            </Modal>
            {show && finalArr?.length > 0 && (
                <div className="hidden xl:flex text-white absolute top-0 right-0 z-[9999] w-1/3 h-screen justify-center items-center">
                    <Chart allInfo={finalArr} />
                </div>
            )}

        </>
    )
}

export default ModalAddStudent;