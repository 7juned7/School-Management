import React from 'react'

export const InputField = ({ label, type, value, onChange }) => {
    return (
        <div className="mb-4">
            <label className="block mb-1 font-medium">{label}</label>
            <input
                type={type}
                className="w-full p-2 border rounded-md"
                value={value}
                onChange={onChange}
                required
            />
        </div>
    )
}
