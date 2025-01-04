import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import StudentBoard from "../components/StudentBoard";
import { ArrowLeft, Plus, Info, Pencil, LinkSimpleHorizontal, X, CircleNotch } from '@phosphor-icons/react'
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import PDF from '../asset/images/pdf_icon.svg'
import ModalInformation from "../components/Modal/ModalInformation";
import ModalEdit from "../components/Modal/ModalEdit";
import { Draggable } from 'react-drag-and-drop';

import Chart from "../components/Chart";

import JSONPretty from 'react-json-pretty';
import { ToggleSwitch } from "flowbite-react";
import { studentsActions } from "../store/features/studentsSlice";
import ModalAddStudent from "../components/Modal/ModalAddStudent";

const students = [
  {
    id: 1,
    name: "Erikson",
    url: "https://cc-prod.scene7.com/is/image/CCProdAuthor/portrait-photography_P6b_379x392?$pjpeg$&jpegSize=100&wid=378",
    email: "erik@gmail.com",
    class: "IS207",
    gender: "male",
  },
  {
    id: 2,
    name: "Dasha Elano",
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUb3AURQ_YR7QnqzsvYP0YHeptFlcr3ivvug&usqp=CAU",
    email: "erik@gmail.com",
    class: "IS207",
    gender: "female",
  },
  {
    id: 1,
    name: "Erikson",
    url: "https://cc-prod.scene7.com/is/image/CCProdAuthor/portrait-photography_P6b_379x392?$pjpeg$&jpegSize=100&wid=378",
    email: "erik@gmail.com",
    class: "IS207",
    gender: "male",
  },
  {
    id: 2,
    name: "Dasha Elano",
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUb3AURQ_YR7QnqzsvYP0YHeptFlcr3ivvug&usqp=CAU",
    email: "erik@gmail.com",
    class: "IS207",
    gender: "female",
  },
  {
    id: 1,
    name: "Erikson",
    url: "https://cc-prod.scene7.com/is/image/CCProdAuthor/portrait-photography_P6b_379x392?$pjpeg$&jpegSize=100&wid=378",
    email: "erik@gmail.com",
    class: "IS207",
    gender: "male",
  },
  {
    id: 2,
    name: "Dasha Elano",
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUb3AURQ_YR7QnqzsvYP0YHeptFlcr3ivvug&usqp=CAU",
    email: "erik@gmail.com",
    class: "IS207",
    gender: "female",
  },
  {
    id: 1,
    name: "Erikson",
    url: "https://cc-prod.scene7.com/is/image/CCProdAuthor/portrait-photography_P6b_379x392?$pjpeg$&jpegSize=100&wid=378",
    email: "erik@gmail.com",
    class: "IS207",
    gender: "male",
  },
  {
    id: 2,
    name: "Dasha Elano",
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUb3AURQ_YR7QnqzsvYP0YHeptFlcr3ivvug&usqp=CAU",
    email: "erik@gmail.com",
    class: "IS207",
    gender: "female",
  },
];


// const objectUser = [
//   {
//     id: '1',
//     name: 'Giáo trình ABC',
//     point: 100,
//     ratio: '100%',
//     reviewPer: 'Nguyễn Văn A',
//     reviewId: 'D5PP6612',
//     reliability: 5,
//     result: 'Tốt',
//     data: [
//       {
//         id: 1245,
//         name: 'Image 1',
//         url: Image1
//       }
//     ]
//   }
// ]

const AddProjectPage = ({ allInfo, setAllInfo, info, setInfo, currentStudent }) => {
  const students = useSelector(state => state.students);
  const [student, setStudent] = useState({});

  const [isSwitch, setIsSwitch] = useState(false)

  const [showInfo, setShowInfo] = useState(false)
  const [showEdit, setShowEdit] = useState(false)

  const [loadFile, setLoadFile] = useState(false)

  const { id } = useParams();
  const navigate = useNavigate();
  const [show, setShow] = useState(false)

  const [indexItem, setIndexItem] = useState()

  const dispatch = useDispatch()

  useEffect(() => {
    if (allInfo)
      setInfo(allInfo[indexItem])
  }, [allInfo, indexItem])

  useEffect(() => {
    setStudent(students.find(stu => stu.id === parseInt(id)));
  }, [])

  const showModalInfo = (item) => {
    setInfo(item)
    setShowInfo(true)
  }

  const showModalEdit = (item) => {
    setInfo(item)
    setShow(true)
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

        console.log(allInfo)
        setAllInfo((prevArray) => [
          ...prevArray.slice(0, indexItem), // Keep the elements before the specified index
          { ...prevArray[indexItem], data: arr },
          ...prevArray.slice(indexItem + 1), // Keep the elements after the specified outer index
        ]);

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

  const handleDelete = (item) => {
    var test = allInfo;
    setAllInfo(test?.filter((el) => {
      return el.name !== item.name
    }))
  }

  const handleSelectItem = (item, idx) => {
    setIndexItem(idx)
  }

  const handleDeleteImage = (idx) => {
    var arrTemp = allInfo;
    var arr = arrTemp[indexItem]?.data?.splice(idx, 1)
    setAllInfo([...arrTemp])
  }

  const handleSave = () => {

  }
  return (
    <>
      <div className="w-full md:h-screen overflow-y-auto">
        <Header />
        <div className="grid grid-cols-12 gap-4">
          <div onClick={() => navigate(-1)} className="flex justify-center items-center cursor-pointer">
            <ArrowLeft size={24} color='white' weight='bold' />
          </div>
          <div className="col-span-11 md:col-span-8">
            {/* Tool bar */}
            <div className="flex justify-between">
              {/* Search box */}
              <div className='flex items-center text-gray-400 text-md bg-white rounded-md w-full md:w-2/3'>
                <i class="fa-solid fa-magnifying-glass p-3"></i>
                <input className='bg-white outline-0 border-0 focus:ring-0 text-gray-950 flex-1 rounded-md' type="text" placeholder='Search for students, teachers, exams...' />
              </div>
            </div>
          </div>
        </div>
        {/* Student Detail board */}
        <div className="flex flex-col md:flex-row w-full pt-4 pb-4">
          <div className="w-full md:w-1/4 h-full">
            <StudentBoard id={student.id} name={student.name} url={student.url} classname={student.class} gender={student.gender} />
          </div>
          <div className="w-full mt-2 md:mt-0 md:w-3/4">
            <div className="w-full flex justify-between items-center">
              <span className=" font-semibold">Thêm đối tượng cho <span className="text-[#7D7D7D]">{student.id} - {student.name}</span></span>
              <div className={`py-[3px] px-4 bg-[#3750AA] flex justify-center items-center rounded-full mr-2 ${allInfo?.length === 0 && "opacity-50 cursor-not-allowed"}`} onClick={handleSave}>
                <span className="text-white text-center">Lưu thay đổi</span>
              </div>
            </div>
            <div className="w-full mt-2 p-4 bg-[rgba(255,255,255,0.5)] rounded-xl">
              {students[currentStudent].asset ? students[currentStudent]?.asset?.map((item, idx) => (
                <Draggable type="components" data={item.id}>
                  <div key={idx} className={`w-full bg-[rgba(255,255,255,0.8)] py-2 px-4 flex flex-col md:flex-row justify-between md:items-center rounded-xl mb-2 hover:text-black ${indexItem === idx ? "text-black" : "text-gray-400"}`}>
                    <div className="cursor-pointer md:w-1/3" onClick={() => handleSelectItem(item, idx)}>{item.id}. {item.name}</div>
                    <div>Điểm số: {item.point} điểm</div>
                    <div>Tỷ trọng: {item.ratio} %</div>
                    <div className="flex md:items-center justify-end md:justify-center gap-2">
                      <Info size={20} color='black' className="cursor-pointer" onClick={() => showModalInfo(item)} />
                      <Pencil size={20} color='black' className="cursor-pointer" onClick={() => showModalEdit(item)} />
                      <LinkSimpleHorizontal size={20} color={`${item.data.length > 0 ? "black" : "gray"}`} />
                      <X size={20} color='black' className="cursor-pointer" onClick={() => handleDelete(item)} />
                    </div>
                  </div>
                </Draggable>
              )) : (
                <></>
              )}
              <div className="w-full bg-[rgba(177,177,177,0.4)] flex justify-center items-center cursor-pointer rounded-full pt-[3px] pb-[3px]"
                onClick={() => setShow(true)}
              >
                <Plus size={24} color='white' />
              </div>
              <div className="w-full h-[1px] rounded-full bg-black mt-2 mb-4"></div>

              {/* Biểu đồ Chart*/}
              <span>Data dữ liệu biểu đồ của đối tượng:</span>
              <div className={`w-full overflow-hidden bg-white ${allInfo?.length > 0 ? "py-16 pl-16" : "opacity-50 py-4"} my-2 rounded-xl flex justify-start items-center`}>
                {allInfo?.length > 0 && (
                  <span>
                    <Chart allInfo={allInfo} />
                  </span>
                )}

              </div>
              {/* Tài sản dữ liệu */}
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

              {/* <input type="file" id="file" name="file" multiple className="hidden" onChange={changeFile} accept="image/*,application/pdf,audio/mpeg3"></input> */}
              <div className="w-full h-[1px] rounded-full bg-black mt-2 mb-4"></div>
              {/* Danh sách dữ liệu */}
              <span>Data dữ liệu theo dạng JSON:</span>
              <div className="my-2 flex items-center gap-4">
                <span>Hiện JSON tổng: </span>
                <ToggleSwitch checked={isSwitch} onChange={setIsSwitch} />
              </div>

              <div className="w-full bg-white p-4 mt-2 rounded-xl flex justify-start items-center overflow-x-auto">
                <JSONPretty id="json-pretty" data={isSwitch ? allInfo : info}></JSONPretty>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalAddStudent type='child' show={show} setShow={setShow} setAllInfo={setAllInfo} allInfo={allInfo} info={info} setInfo={setInfo} currentStudent={currentStudent} />
      <ModalInformation data={info} show={showInfo} setShow={setShowInfo} />
      <ModalEdit data={info} show={showEdit} setShow={setShowEdit} setInfo={setInfo} setAllInfo={setAllInfo} allInfo={allInfo} indexItem={indexItem} />
    </>
  )
}

export default AddProjectPage;