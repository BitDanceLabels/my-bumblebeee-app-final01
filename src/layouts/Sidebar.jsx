import React, { useState } from "react";

const Sidebar = ({ onCreateNewProcess, onProcessSelect, groups }) => {
    return (
        <div className="sidebar">
            <h2 className="sidebar-header">Danh sách phân loại</h2>
            {groups.map((group) => (
                <div key={group.id} className="sidebar-group">
                    <h3 className="sidebar-group-title">{group.name}</h3>
                    {group.processes.map((process) => (
                        <div
                            key={process.id}
                            className="sidebar-item"
                            onClick={() => onProcessSelect(process)}
                        >
                            {process.name}
                        </div>
                    ))}
                </div>
            ))}
            <div className="sidebar-footer">
                <button onClick={onCreateNewProcess}>+ Tạo tiến trình mới</button>
            </div>
        </div>
    );
};

export default Sidebar;