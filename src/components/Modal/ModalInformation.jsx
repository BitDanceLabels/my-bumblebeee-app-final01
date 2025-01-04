import { Star } from "@phosphor-icons/react";
import { Modal } from "flowbite-react";
import React from "react";

const ModalInformation = ({ data, show, setShow }) => {
    return (
        <>
            <Modal size='5xl' show={show} onClose={() => setShow(false)}>
                <Modal.Header>
                    Xem thông tin đối tượng
                </Modal.Header>
                <Modal.Body>
                    <div className="w-full p-2 flex flex-wrap items-center">
                        <span className="pr-4">Tên đối tượng: {data?.name}</span>
                    </div>
                    <div className="w-full flex flex-wrap">
                        <div className="w-1/2 p-2 flex items-center">
                            <span className="pr-4">Điểm số: {data?.point}</span>
                        </div>

                        <div className="w-1/2  p-2 flex items-center">
                            <span className="pr-4">Tỷ trọng: {data?.ratio}</span>
                        </div>
                    </div>
                    <div className="w-full flex flex-wrap items-center px-2">
                        <span className="pr-4">Người đánh giá:</span>

                        <div className="p-2 flex items-center rounded-xl flex items-center gap-4 bg-[#EDEDED]">
                            <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
                            <div className="pr-4 h-full flex items-center">Nguyễn Văn A</div>
                            <div className="flex h-full pb-[2px] gap-[2px] items-center">
                                <Star size={20} weight="fill" color='yellow' />
                                <Star size={20} weight="fill" color='yellow' />
                                <Star size={20} weight="fill" color='yellow' />
                                <Star size={20} weight="fill" color='yellow' />
                                <Star size={20} weight="fill" color='yellow' />
                            </div>
                        </div>
                    </div>
                    <div className="w-1/2 p-2 flex items-center">
                        <span className="pr-4">Đánh giá: {data?.result}</span>
                    </div>

                    <div className="w-1/2 p-2 flex items-center">
                        <span className="pr-4">Nhóm đối tượng: {data?.group}</span>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <div className="w-full flex justify-end items-center ">
                        <div className="py-[3px] px-4 bg-[#3750AA] flex justify-center items-center rounded-full cursor-pointer" onClick={() => setShow(false)}>
                            <span className="text-white">Đóng</span>
                        </div>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalInformation