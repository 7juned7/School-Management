import { useEffect, useState } from "react";
import { FiUsers, FiBook, FiCalendar, FiLogOut, FiPlus, FiEdit, FiTrash } from "react-icons/fi";

import Sidebar from "./Sidebar";
import StudentCourses from "./Student/StudentCourses";
import StudentDashboard from "./Student/StudentDashboard";
import TeacherClasses from "./Teacher/TeacherClasses";
import TeacherDashboard from "./Teacher/TeacherDashboard";

const Dashboard = () => {

    const [activeSection, setActiveSection] = useState("dashboard");

    const [role, setRole] = useState("admin");
    const [students, setStudents] = useState([
        { id: 1, name: "John Doe", grade: "10th", email: "john@example.com" },
        { id: 2, name: "Jane Smith", grade: "12th", email: "jane@example.com" },
    ]);
    const [teachers, setTeachers] = useState([
        { id: 1, name: "Mr. Anderson", subject: "Math", email: "anderson@example.com" },
        { id: 2, name: "Ms. Johnson", subject: "Science", email: "johnson@example.com" },
    ]);
    const [timetable, setTimetable] = useState([
        { id: 1, day: "Monday", subject: "Math", teacher: "Mr. Anderson", time: "10:00 AM" },
        { id: 2, day: "Tuesday", subject: "Science", teacher: "Ms. Johnson", time: "11:00 AM" },
    ]);
    const [newEntry, setNewEntry] = useState({ day: "", subject: "", teacher: "", time: "" });
    const [editingEntry, setEditingEntry] = useState(null);
    const [newStudent, setNewStudent] = useState({ name: "", grade: "", email: "" });
    const [newTeacher, setNewTeacher] = useState({ name: "", subject: "", email: "" });
    const [editingTeacher, setEditingTeacher] = useState(null);
    const [editingStudent, setEditingStudent] = useState(null);
    const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
    const todaysTimetable = timetable.filter(entry => entry.day === today);
    const [attendance, setAttendance] = useState("Present");
    const [assignments, setAssignments] = useState([
        { id: 1, subject: "Math", dueDate: "2025-02-25" },
        { id: 2, subject: "Science", dueDate: "2025-02-28" }
    ]);
    const [announcements, setAnnouncements] = useState([
        "School will be closed on March 1st for maintenance.",
        "Math test scheduled for next Monday."
    ]);
    const handleAddEntry = () => {
        if (newEntry.day && newEntry.subject && newEntry.teacher && newEntry.time) {
            setTimetable([...timetable, { id: timetable.length + 1, ...newEntry }]);
            setNewEntry({ day: "", subject: "", teacher: "", time: "" });
        }
    };

    const handleDeleteEntry = (id) => {
        setTimetable(timetable.filter(entry => entry.id !== id));
    };

    const handleEditEntry = (entry) => {
        setEditingEntry(entry);
        setNewEntry(entry);
    };

    const handleUpdateEntry = () => {
        setTimetable(timetable.map(entry => (entry.id === editingEntry.id ? newEntry : entry)));
        setEditingEntry(null);
        setNewEntry({ day: "", subject: "", teacher: "", time: "" });
    };

    useEffect(() => {
        // Simulate fetching role from login data or local storage
        const userRole = localStorage.getItem("userRole") || "teacher"; // Default to student
        setRole(userRole);
    }, []);

    const handleAddStudent = () => {
        if (newStudent.name && newStudent.grade && newStudent.email) {
            setStudents([...students, { id: students.length + 1, ...newStudent }]);
            setNewStudent({ name: "", grade: "", email: "" });
        }
    };





    const handleAddTeacher = () => {
        if (newTeacher.name && newTeacher.subject && newTeacher.email) {
            setTeachers([...teachers, { id: teachers.length + 1, ...newTeacher }]);
            setNewTeacher({ name: "", subject: "", email: "" });
        }
    };





    const menuItems = {
        admin: [
            { label: "Dashboard", icon: <FiUsers />, section: "dashboard" },
            { label: "Manage Students", icon: <FiBook />, section: "students" },
            { label: "Manage Teachers", icon: <FiUsers />, section: "teachers" },
            { label: "Timetable", icon: <FiCalendar />, section: "timetable" },
        ],
        teacher: [
            { label: "Dashboard", icon: <FiUsers />, section: "dashboard" },
            { label: "My Classes", icon: <FiBook />, section: "My classes" },
            { label: "Timetable", icon: <FiCalendar />, section: "timetable" },
        ],
        student: [
            { label: "Dashboard", icon: <FiUsers />, section: "dashboard" },
            { label: "My Courses", icon: <FiBook />, section: "courses" },
            { label: "Timetable", icon: <FiCalendar />, section: "timetable" },
        ],
    };
    console.log(menuItems[role])
    const handleUpdateStudentAndTeacher = () => {
        if (activeSection === "teachers") {
            setTeachers(teachers.map(teacher => (teacher.id === editingTeacher.id ? newTeacher : teacher)));
            setEditingTeacher(null);
            setNewTeacher({ name: "", subject: "", email: "" });
        }
        if (activeSection === "students") {
            setStudents(students.map(student => (student.id === editingStudent.id ? newStudent : student)));
            setEditingStudent(null);
            setNewStudent({ name: "", grade: "", email: "" });
        }

    }

    const handleNewStudentAndTeacher = (e) => {
        const { name, value } = e.target
        if (activeSection === "students") {

            setNewStudent((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
        if (activeSection === "teachers") {
            setNewTeacher((prev) => ({
                ...prev,
                [name]: value
            }))
        }
    }
    const handleDeleteStudentOrTeacher = (id) => {
        if (activeSection === "teachers") {
            setTeachers(teachers.filter(teacher => teacher.id !== id));

        }
        if (activeSection === "students") {
            setStudents(students.filter(student => student.id !== id));
        }

    }
    const handleEditStudentOrTeacher = (role) => {
        if (activeSection === "teachers") {

            setEditingTeacher(role);
            setNewTeacher(role);
        }
        if (activeSection === "students") {

            setEditingStudent(role);
            setNewStudent(role);
        }
    }

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <Sidebar
                menuItems={menuItems}
                setActiveSection={setActiveSection}
                role={role}
            />


            {/* Main Content */}
            <main className="flex-1 p-6 bg-gray-100">
                <h2 className="text-2xl font-bold capitalize">{activeSection.replace("_", " ")}</h2>
                <div className="mt-4">
                    {role === "admin" && activeSection === "dashboard" && (
                        <div>
                            <p className="mb-4">Welcome to the Admin Dashboard! View statistics and manage school operations.</p>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="p-4 bg-white shadow-md rounded-lg">
                                    <h3 className="text-lg font-semibold">Total Students</h3>
                                    <p className="text-2xl font-bold">450</p>
                                </div>
                                <div className="p-4 bg-white shadow-md rounded-lg">
                                    <h3 className="text-lg font-semibold">Total Teachers</h3>
                                    <p className="text-2xl font-bold">35</p>
                                </div>
                                <div className="p-4 bg-white shadow-md rounded-lg">
                                    <h3 className="text-lg font-semibold">Upcoming Events</h3>
                                    <p className="text-sm">Annual Sports Day - March 15</p>
                                </div>
                            </div>
                        </div>
                    )}
                    {role === "admin" && activeSection === "students" && (

                        <div>
                            <h3 className="text-xl font-semibold mb-4">Manage Students</h3>
                            <div className="mb-4 flex space-x-2">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    value={newStudent.name}
                                    onChange={handleNewStudentAndTeacher}
                                    className="border p-2"
                                />
                                <input
                                    type="text"
                                    name="grade"
                                    placeholder="Grade"
                                    value={newStudent.grade}
                                    onChange={handleNewStudentAndTeacher}
                                    className="border p-2"
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={newStudent.email}
                                    onChange={handleNewStudentAndTeacher}
                                    className="border p-2"
                                />
                                {editingStudent ? (
                                    <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={handleUpdateStudentAndTeacher}>Update</button>
                                ) : (
                                    <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleAddStudent}>Add</button>
                                )}
                            </div>
                            <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
                                <thead className="bg-gray-200">
                                    <tr>
                                        <th className="py-2 px-4 text-start">ID</th>
                                        <th className="py-2 px-4 text-start">Name</th>
                                        <th className="py-2 px-4 text-start">Grade</th>
                                        <th className="py-2 px-4 text-start">Email</th>
                                        <th className="py-2 px-4 text-start">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {students.map((student) => (
                                        <tr key={student.id} className="border-t">
                                            <td className="py-2 px-4">{student.id}</td>
                                            <td className="py-2 px-4">{student.name}</td>
                                            <td className="py-2 px-4">{student.grade}</td>
                                            <td className="py-2 px-4">{student.email}</td>
                                            <td className="py-2 px-4 flex space-x-2">
                                                <button className="text-blue-500" onClick={() => handleEditStudentOrTeacher(student)}><FiEdit /></button>
                                                <button className="text-red-500" onClick={() => handleDeleteStudentOrTeacher(student.id)}><FiTrash /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                    {role === "admin" && activeSection === "teachers" && (

                        <div>

                            <h3 className="text-xl font-semibold mb-4">Manage Teachers</h3>
                            <div className="mb-4 flex space-x-2">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    value={newTeacher.name}
                                    onChange={handleNewStudentAndTeacher}
                                    className="border p-2"
                                />
                                <input
                                    type="text"
                                    name="subject"
                                    placeholder="Subject"
                                    value={newTeacher.subject}
                                    onChange={handleNewStudentAndTeacher}
                                    className="border p-2"
                                />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    name="email"
                                    value={newTeacher.email}
                                    onChange={handleNewStudentAndTeacher}
                                    className="border p-2"
                                />
                                {editingTeacher ? (
                                    <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={handleUpdateStudentAndTeacher}>Update</button>
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
                                                <button className="text-blue-500" onClick={() => handleEditStudentOrTeacher(teacher)}><FiEdit /></button>
                                                <button className="text-red-500" onClick={() => handleDeleteStudentOrTeacher(teacher.id)}><FiTrash /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                    {role === "admin" && activeSection === "timetable" && (
                        <div>
                            <h3 className="text-xl font-semibold mb-4">Manage Timetable</h3>
                            <div className="mb-4 flex space-x-2">
                                <input type="text" placeholder="Day" value={newEntry.day} onChange={(e) => setNewEntry({ ...newEntry, day: e.target.value })} className="border p-2" />
                                <input type="text" placeholder="Subject" value={newEntry.subject} onChange={(e) => setNewEntry({ ...newEntry, subject: e.target.value })} className="border p-2" />
                                <input type="text" placeholder="Teacher" value={newEntry.teacher} onChange={(e) => setNewEntry({ ...newEntry, teacher: e.target.value })} className="border p-2" />
                                <input type="text" placeholder="Time" value={newEntry.time} onChange={(e) => setNewEntry({ ...newEntry, time: e.target.value })} className="border p-2" />
                                {editingEntry ? (
                                    <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={handleUpdateEntry}>Update</button>
                                ) : (
                                    <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleAddEntry}>Add</button>
                                )}
                            </div>
                            <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
                                <thead className="bg-gray-200">
                                    <tr>
                                        <th className="py-2 px-4">ID</th>
                                        <th className="py-2 px-4">Day</th>
                                        <th className="py-2 px-4">Subject</th>
                                        <th className="py-2 px-4">Teacher</th>
                                        <th className="py-2 px-4">Time</th>
                                        <th className="py-2 px-4">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {timetable.map((entry) => (
                                        <tr key={entry.id} className="border-t">
                                            <td className="py-2 px-4">{entry.id}</td>
                                            <td className="py-2 px-4">{entry.day}</td>
                                            <td className="py-2 px-4">{entry.subject}</td>
                                            <td className="py-2 px-4">{entry.teacher}</td>
                                            <td className="py-2 px-4">{entry.time}</td>
                                            <td className="py-2 px-4 flex space-x-2">
                                                <button className="text-blue-500" onClick={() => handleEditEntry(entry)}><FiEdit /></button>
                                                <button className="text-red-500" onClick={() => handleDeleteEntry(entry.id)}><FiTrash /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                    {activeSection === "reports" && <p>Generate and view school reports.</p>}
                </div>
                <div className="mt-4" >
                    {role === "student" && activeSection === "dashboard" && (
                        <StudentDashboard />

                    )}
                    {role === "student" && activeSection === "courses" && (
                        <StudentCourses />

                    )}

                </div>
                <div className="mt-4">
                    {role === "teacher" && activeSection === "dashboard" && (
                        <TeacherDashboard />

                    )}
                    {role === "teacher" && activeSection === "My classes" && (
                        <TeacherClasses />


                    )}

                </div>
            </main >
        </div >
    );
};

export default Dashboard;
