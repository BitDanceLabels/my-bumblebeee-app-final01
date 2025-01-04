import React, { useState } from "react";

const MenuProc = ({ groups, onAddProcess, onClose, onSelectProcess }) => {
    const [selectedGroup, setSelectedGroup] = useState(groups[0]?.id || "");
    const [processName, setProcessName] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    const filteredProcesses = groups
        .flatMap((group) => group.processes)
        .filter((process) =>
            process.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

    const handleAdd = () => {
        if (processName.trim()) {
            onAddProcess(selectedGroup, processName);
            setProcessName("");
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-lg w-1/3">
                <h2 className="text-xl font-bold mb-4">Tạo hoặc Chọn Tiến Trình</h2>

                {/* Tìm kiếm tiến trình */}
                <div className="mb-4">
                    <label className="block mb-2 font-bold">Tìm kiếm tiến trình:</label>
                    <input
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full border p-2 rounded"
                        placeholder="Nhập từ khóa để tìm tiến trình..."
                    />
                </div>

                {/* Danh sách tiến trình hiện có */}
                <div className="mb-4 max-h-40 overflow-y-auto">
                    <label className="block mb-2 font-bold">Tiến trình có sẵn:</label>
                    {filteredProcesses.length > 0 ? (
                        filteredProcesses.map((process) => (
                            <div
                                key={process.id}
                                className="p-2 bg-gray-100 rounded mb-2 cursor-pointer hover:bg-gray-200"
                                onClick={() => {
                                    onSelectProcess(process);
                                    onClose();
                                }}
                            >
                                {process.name}
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">Không tìm thấy tiến trình nào.</p>
                    )}
                </div>

                {/* Tạo tiến trình mới */}
                <div className="mb-4">
                    <label className="block mb-2 font-bold">Tạo tiến trình mới:</label>
                    <input
                        value={processName}
                        onChange={(e) => setProcessName(e.target.value)}
                        className="w-full border p-2 rounded"
                        placeholder="Nhập tên tiến trình mới..."
                    />
                </div>

                <div className="flex justify-end space-x-2">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
                        Hủy
                    </button>
                    <button
                        onClick={handleAdd}
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        Thêm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MenuProc;