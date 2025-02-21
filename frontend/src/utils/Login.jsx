import React, { useState } from 'react'
import { InputField } from './InputField';

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        role: "student",
        studentName: "",
        studentID: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleLogin = (e) => {
        e.preventDefault();
        console.log("Logging in as:", formData);
        // Add authentication logic here
    };
    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="bg-white p-8 rounded-xl shadow-md w-96">
                    <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
                    <form onSubmit={handleLogin}>
                        <div className="mb-4">
                            <label className="block mb-1 font-medium">Role</label>
                            <select
                                name="role"
                                className="w-full p-2 border rounded-md"
                                value={formData.role}
                                onChange={handleChange}
                            >
                                <option value="admin">Admin</option>
                                <option value="teacher">Teacher</option>
                                <option value="student">Student</option>
                            </select>
                        </div>

                        {formData.role === "student" ? (
                            <>
                                <InputField label="Student Name" type="text" name="studentName" value={formData.studentName} onChange={handleChange} />
                                <InputField label="Student ID" type="text" name="studentID" value={formData.studentID} onChange={handleChange} />
                            </>
                        ) : (<>
                            <InputField label="Email" type="email" name="email" value={formData.email} onChange={handleChange} />
                            <InputField label="Password" type="password" name="password" value={formData.password} onChange={handleChange} /></>)}
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login