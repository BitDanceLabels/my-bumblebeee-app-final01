import { Check } from "@phosphor-icons/react";
import React, { useEffect } from "react";
import { typeList } from "../../asset/sourceFile/TypeObject";

const DefaultInfo = ({ packageData }) => {
    const keysArray = Object.keys(packageData);
    useEffect(() => {
        console.log(packageData)
    }, [packageData])

    return (
        <>
            {packageData?.value === 'student' && (
                <>
                    <div className="w-full p-2 flex flex-wrap items-center">
                        <span className="pr-4 w-[15%]">{typeList[0]?.name}: </span>
                        <input type="text" id={`${keysArray[1] + packageData?.value}`} class="bg-white border-[1px] border-[rgba(0,0,0,0.5)] text-gray-900 text-sm rounded-lg block w-1/2 p-2.5 shadow-[4px_4px_4px_rgba(0,0,0,0.25)]" placeholder="Nhập tên đối tượng" required />
                        <span className="text-green-700 flex gap-2 ml-4">Tên đối tượng hợp lệ <Check size={20} color='green' /> </span>
                    </div>
                    <div className="w-full flex flex-wrap">
                        <div className="w-1/2 p-2 flex items-center">
                            <span className="pr-4">{typeList[0]?.class}:</span>
                            <input type="text" id={`${keysArray[5] + packageData?.value}`} className={`bg-white border-[1px] border-[rgba(0,0,0,0.5)] text-gray-900 text-sm rounded-lg block w-2/3 p-2.5 shadow-[4px_4px_4px_rgba(0,0,0,0.25)] `} placeholder="Nhập tên đối tượng" required />
                        </div>

                        <div className="w-1/2  p-2 flex items-center">
                            <span className="pr-4">{typeList[0]?.id}:</span>
                            <input type="text" id={`${keysArray[2] + packageData?.value}`} className={`bg-white border-[1px] border-[rgba(0,0,0,0.5)] text-gray-900 text-sm rounded-lg block w-2/3 p-2.5 shadow-[4px_4px_4px_rgba(0,0,0,0.25)] `} placeholder="Nhập tên đối tượng" required />
                        </div>
                    </div>
                    <div className="w-full p-2 flex flex-wrap items-center">
                        <span className="pr-4 w-[15%]">Giới tính:</span>
                        {/* <input name="" type="text" id="first_name" className="w-2/5 bg-white border-[1px] border-[rgba(0,0,0,0.5)] text-gray-900 text-sm rounded-lg block w-1/2 p-2.5 shadow-[4px_4px_4px_rgba(0,0,0,0.25)]" placeholder="Nguyen Van A...." required /> */}
                        <div className=" flex items-center">
                            <label className="pr-2" htmlFor={`${keysArray[3] + packageData?.value + 'male'}`}>Nam</label>
                            <input checked={true} id={`${keysArray[3] + packageData?.value + 'male'}`} type="radio" name="gender" value="Nam" />
                            <label className="pr-2 ml-8" htmlFor={`${keysArray[3] + packageData?.value + 'female'}`}>Nữ</label>
                            <input checked={false} id={`${keysArray[3] + packageData?.value + 'female'}`} type="radio" name="gender" value="Nữ" className="" />
                        </div>
                    </div>
                    <div className="w-full p-2 flex flex-wrap items-center">
                        <span className="pr-4 w-[15%]">{typeList[0]?.email}: </span>
                        <input type="text" id={`${keysArray[4] + packageData?.value}`} class="bg-white border-[1px] border-[rgba(0,0,0,0.5)] text-gray-900 text-sm rounded-lg block w-1/2 p-2.5 shadow-[4px_4px_4px_rgba(0,0,0,0.25)]" placeholder="Nhập tên đối tượng" required />
                        <span className="text-green-700 flex gap-2 ml-4">Tên đối tượng hợp lệ <Check size={20} color='green' /> </span>
                    </div>
                    <div className="w-full p-2 flex flex-wrap items-center">
                        <span className="pr-4 ">{typeList[0]?.teacher}: </span>
                        <input type="text" id={`${keysArray[6] + packageData?.value}`} class="bg-white border-[1px] border-[rgba(0,0,0,0.5)] text-gray-900 text-sm rounded-lg block w-1/2 p-2.5 shadow-[4px_4px_4px_rgba(0,0,0,0.25)]" placeholder="Nhập tên đối tượng" required />
                        <span className="text-green-700 flex gap-2 ml-4">Tên đối tượng hợp lệ <Check size={20} color='green' /> </span>
                    </div>
                </>
            )}
            {packageData?.value === 'teacher' && (
                <>
                    <div className="w-full p-2 flex flex-wrap items-center">
                        <span className="pr-4 w-[15%]">{typeList[1]?.name}: </span>
                        <input type="text" id={`${keysArray[1] + packageData?.value}`} class="bg-white border-[1px] border-[rgba(0,0,0,0.5)] text-gray-900 text-sm rounded-lg block w-1/2 p-2.5 shadow-[4px_4px_4px_rgba(0,0,0,0.25)]" placeholder="Nhập tên đối tượng" required />
                        <span className="text-green-700 flex gap-2 ml-4">Tên đối tượng hợp lệ <Check size={20} color='green' /> </span>
                    </div>
                    <div className="w-full flex flex-wrap">
                        <div className="w-1/2 p-2 flex items-center">
                            <span className="pr-4">{typeList[1]?.class}:</span>
                            <input type="text" id={`${keysArray[5] + packageData?.value}`} className={`bg-white border-[1px] border-[rgba(0,0,0,0.5)] text-gray-900 text-sm rounded-lg block w-2/3 p-2.5 shadow-[4px_4px_4px_rgba(0,0,0,0.25)] `} placeholder="Nhập tên đối tượng" required />
                        </div>

                        <div className="w-1/2  p-2 flex items-center">
                            <span className="pr-4">{typeList[1]?.id}:</span>
                            <input type="text" id={`${keysArray[2] + packageData?.value}`} className={`bg-white border-[1px] border-[rgba(0,0,0,0.5)] text-gray-900 text-sm rounded-lg block w-2/3 p-2.5 shadow-[4px_4px_4px_rgba(0,0,0,0.25)] `} placeholder="Nhập tên đối tượng" required />
                        </div>
                    </div>
                    <div className="w-full p-2 flex flex-wrap items-center">
                        <span className="pr-4 w-[15%]">Giới tính</span>
                        {/* <input name="" type="text" id="first_name" className="w-2/5 bg-white border-[1px] border-[rgba(0,0,0,0.5)] text-gray-900 text-sm rounded-lg block w-1/2 p-2.5 shadow-[4px_4px_4px_rgba(0,0,0,0.25)]" placeholder="Nguyen Van A...." required /> */}
                        <div className="w-2/5 flex items-center">
                            <label className="pr-2" htmlFor={`${keysArray[3] + packageData?.value + 'male'}`}>Nam</label>
                            <input checked={true} id={`${keysArray[3] + packageData?.value + 'male'}`} type="radio" name="gender" value="Nam" />
                            <label className="pr-2 ml-8" htmlFor={`${keysArray[3] + packageData?.value + 'female'}`}>Nữ</label>
                            <input checked={false} id={`${keysArray[3] + packageData?.value + 'female'}`} type="radio" name="gender" value="Nữ" className="" />
                        </div>
                    </div>
                    <div className="w-full p-2 flex flex-wrap items-center">
                        <span className="pr-4 w-[15%]">{typeList[1]?.email}: </span>
                        <input type="text" id={`${keysArray[4] + packageData?.value}`} class="bg-white border-[1px] border-[rgba(0,0,0,0.5)] text-gray-900 text-sm rounded-lg block w-1/2 p-2.5 shadow-[4px_4px_4px_rgba(0,0,0,0.25)]" placeholder="Nhập tên đối tượng" required />
                        <span className="text-green-700 flex gap-2 ml-4">Tên đối tượng hợp lệ <Check size={20} color='green' /> </span>
                    </div>
                    <div className="w-full p-2 flex flex-wrap items-center">
                        <span className="pr-4 w-[15%]">{typeList[1]?.number}: </span>
                        <input type="text" id={`${keysArray[6] + packageData?.value}`} class="bg-white border-[1px] border-[rgba(0,0,0,0.5)] text-gray-900 text-sm rounded-lg block w-1/2 p-2.5 shadow-[4px_4px_4px_rgba(0,0,0,0.25)]" placeholder="Nhập tên đối tượng" required />
                        <span className="text-green-700 flex gap-2 ml-4">Tên đối tượng hợp lệ <Check size={20} color='green' /> </span>
                    </div>
                </>
            )}
            {packageData?.value === 'company' && (
                <>
                    <div className="w-full p-2 flex flex-wrap items-center">
                        <span className="pr-4 w-[15%]">{typeList[2]?.name}: </span>
                        <input type="text" id={`${keysArray[1] + packageData?.value}`} class="bg-white border-[1px] border-[rgba(0,0,0,0.5)] text-gray-900 text-sm rounded-lg block w-1/2 p-2.5 shadow-[4px_4px_4px_rgba(0,0,0,0.25)]" placeholder="Nhập tên đối tượng" required />
                        <span className="text-green-700 flex gap-2 ml-4">Tên đối tượng hợp lệ <Check size={20} color='green' /> </span>
                    </div>
                    <div className="w-full flex flex-wrap">
                        <div className="w-1/2 p-2 flex items-center">
                            <span className="pr-4">{typeList[2]?.id}:</span>
                            <input type="text" id={`${keysArray[2] + packageData?.value}`} className={`bg-white border-[1px] border-[rgba(0,0,0,0.5)] text-gray-900 text-sm rounded-lg block w-2/3 p-2.5 shadow-[4px_4px_4px_rgba(0,0,0,0.25)] `} placeholder="Nhập tên đối tượng" required />
                        </div>

                        <div className="w-1/2  p-2 flex items-center">
                            <span className="pr-4">{typeList[2]?.total}:</span>
                            <input type="text" id={`${keysArray[4] + packageData?.value}`} className={`bg-white border-[1px] border-[rgba(0,0,0,0.5)] text-gray-900 text-sm rounded-lg block w-2/3 p-2.5 shadow-[4px_4px_4px_rgba(0,0,0,0.25)] `} placeholder="Nhập tên đối tượng" required />
                        </div>
                    </div>
                    <div className="w-full flex flex-wrap">
                        <div className="w-1/2 p-2 flex items-center">
                            <span className="pr-4">{typeList[2]?.taxCode}:</span>
                            <input type="text" id={`${keysArray[3] + packageData?.value}`} className={`bg-white border-[1px] border-[rgba(0,0,0,0.5)] text-gray-900 text-sm rounded-lg block w-2/3 p-2.5 shadow-[4px_4px_4px_rgba(0,0,0,0.25)] `} placeholder="Nhập tên đối tượng" required />
                        </div>

                        <div className="w-1/2  p-2 flex items-center">
                            <span className="pr-4">{typeList[2]?.phone}:</span>
                            <input type="text" id={`${keysArray[5] + packageData?.value}`} className={`bg-white border-[1px] border-[rgba(0,0,0,0.5)] text-gray-900 text-sm rounded-lg block w-2/3 p-2.5 shadow-[4px_4px_4px_rgba(0,0,0,0.25)] `} placeholder="Nhập tên đối tượng" required />
                        </div>
                    </div>
                </>
            )}
            {packageData?.value === 'other' && (
                <>
                    <div className="w-full p-2 flex flex-wrap items-center">
                        <span className="pr-4 w-[15%]">Tên đối tượng: </span>
                        <input type="text" id="nameOther" class="bg-white border-[1px] border-[rgba(0,0,0,0.5)] text-gray-900 text-sm rounded-lg block w-1/2 p-2.5 shadow-[4px_4px_4px_rgba(0,0,0,0.25)]" placeholder="Nhập tên đối tượng" required />
                        <span className="text-green-700 flex gap-2 ml-4">Tên đối tượng hợp lệ <Check size={20} color='green' /> </span>
                    </div>
                </>
            )}
        </>
    )
}

export default DefaultInfo;