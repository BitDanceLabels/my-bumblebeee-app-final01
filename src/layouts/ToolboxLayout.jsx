import React, { useState } from "react";
import Sidebar from "../layouts/Sidebar";
import MenuProc from "../modals/menu_proc";

const ToolboxLayout = ({
    children,
    groups,
    onCreateNewProcess,
    onProcessSelect,
    currentProcess,
    handleToggleSidebar,
    isSidebarVisible,
    isMenuOpen,
    setIsMenuOpen,
    handleAddProcess,
    handleSelectProcess,
}) => {
    return (
        <div className="flex h-screen">
            <button className="toggle-sidebar" onClick={handleToggleSidebar}>
                {isSidebarVisible ? "Ẩn thanh tiến trình" : "Hiện thanh tiến trình"}
            </button>
            {isSidebarVisible && (
                <Sidebar
                    groups={groups}
                    onCreateNewProcess={onCreateNewProcess}
                    onProcessSelect={onProcessSelect}
                />
            )}
            <div
                className={`flex-grow transition-all ${isSidebarVisible ? "w-4/5" : "w-full"
                    }`}
            >
                <h1 className="text-center text-2xl font-bold p-4">
                    {currentProcess
                        ? `Đang xem: ${currentProcess.name}`
                        : "Trang bảng công cụ"}
                </h1>
                {children}
            </div>
            {isMenuOpen && (
                <MenuProc
                    groups={groups}
                    onClose={() => setIsMenuOpen(false)}
                    onAddProcess={handleAddProcess}
                    onSelectProcess={handleSelectProcess}
                />
            )}
        </div>
    );
};

export default ToolboxLayout;