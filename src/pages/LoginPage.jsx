import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = () => {
        if (username === "user" && password === "password") {
            navigate("/dashboard");
        } else {
            alert("Invalid credentials");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold mb-4">Login</h1>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Username"
                    className="px-4 py-2 border rounded w-64"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <input
                    type="password"
                    placeholder="Password"
                    className="px-4 py-2 border rounded w-64"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button
                onClick={handleLogin}
                className="px-4 py-2 bg-blue-500 text-white rounded"
            >
                Login
            </button>
        </div>
    );
};

export default LoginPage;