import React from 'react'

const DashboardContent = ({ activeSection }) => {
    return (
        <div>
            <h3 className="text-xl font-semibold mb-4">Manage {activeSection}</h3>
            <div className="mb-4 flex space-x-2">
                <input
                    type="text"
                    placeholder="Name"
                    value={newTeacher.name}
                    onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
                    className="border p-2"
                />
                <input
                    type="text"
                    placeholder="Subject"
                    value={newTeacher.subject}
                    onChange={(e) => setNewTeacher({ ...newTeacher, subject: e.target.value })}
                    className="border p-2"
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={newTeacher.email}
                    onChange={(e) => setNewTeacher({ ...newTeacher, email: e.target.value })}
                    className="border p-2"
                />
                {editingTeacher ? (
                    <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={handleUpdateTeacher}>Update</button>
                ) : (
                    <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleAddTeacher}>Add</button>
                )}
            </div>
            <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="py-2 px-4">ID</th>
                        <th className="py-2 px-4">Name</th>
                        <th className="py-2 px-4">Subject</th>
                        <th className="py-2 px-4">Email</th>
                        <th className="py-2 px-4">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {teachers.map((teacher) => (
                        <tr key={teacher.id} className="border-t">
                            <td className="py-2 px-4">{teacher.id}</td>
                            <td className="py-2 px-4">{teacher.name}</td>
                            <td className="py-2 px-4">{teacher.subject}</td>
                            <td className="py-2 px-4">{teacher.email}</td>
                            <td className="py-2 px-4 flex space-x-2">
                                <button className="text-blue-500" onClick={() => handleEditTeacher(teacher)}><FiEdit /></button>
                                <button className="text-red-500" onClick={() => handleDeleteTeacher(teacher.id)}><FiTrash /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default DashboardContent