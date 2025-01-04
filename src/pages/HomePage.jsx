import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold mb-4">Welcome to Bumblebee</h1>
            <div className="space-x-4">
                <Link to="/login" className="px-4 py-2 bg-blue-500 text-white rounded">
                    Login
                </Link>
                <Link to="/dashboard" className="px-4 py-2 bg-green-500 text-white rounded">
                    Dashboard
                </Link>
            </div>
        </div>
    );
};

export default HomePage;