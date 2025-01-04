import React from "react";
import { Link } from "react-router-dom";

const DashboardPage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
            <div className="space-x-4">
                <Link to="/" className="px-4 py-2 bg-blue-500 text-white rounded">
                    Home
                </Link>
                <Link to="/toolbox/new" className="px-4 py-2 bg-green-500 text-white rounded">
                    Toolbox
                </Link>
            </div>
        </div>
    );
};

export default DashboardPage;