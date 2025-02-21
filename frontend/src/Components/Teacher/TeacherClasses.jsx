import React, { useState } from 'react'

const TeacherClasses = () => {
    const teacherClasses = [
        { id: 1, subject: "Mathematics", time: "10:00 AM", day: "Monday", students: [{ name: "Alice", grade: "A" }, { name: "Bob", grade: "B" }, { name: "Charlie", grade: "A-" }] },
        { id: 2, subject: "Physics", time: "2:00 PM", day: "Wednesday", students: [{ name: "David", grade: "B+" }, { name: "Eve", grade: "A" }, { name: "Frank", grade: "B" }] }
    ];

    const [selectedClass, setSelectedClass] = useState(null);
    const [attendance, setAttendance] = useState({});

    const handleAttendanceChange = (classId, studentName) => {
    setAttendance(prev => ({
      ...prev,
      [classId]: {
        ...prev[classId],
        [studentName]: !prev[classId]?.[studentName]
      }
    }));
  };
    const handleSubmitAttendance = () => {
        console.log("Submitted Attendance:", attendance);
        alert("Attendance Submitted Successfully!");
    };

    return (
        <div>

            {!selectedClass ? (
                <ul>
                    {teacherClasses.map((cls) => (
                        <li key={cls.id} className="cursor-pointer mb-2 p-2 bg-white shadow" onClick={() => setSelectedClass(cls)}>
                            {cls.subject} - {cls.day} at {cls.time}
                        </li>
                    ))}
                </ul>
            ) : (
                <div>
                    <button className="mb-4 bg-gray-300 p-2" onClick={() => setSelectedClass(null)}>Back</button>
                    <h3 className="text-xl font-semibold">{selectedClass.subject} - {selectedClass.day}</h3>
                    <ul>
                        {selectedClass.students.map((student) => (
                            <li key={student.name} className="flex justify-between items-center p-2 bg-white shadow mb-2">
                                <span>{student.name} (Grade: {student.grade})</span>
                                <input
                                    type="checkbox"
                                    checked={attendance[selectedClass.id]?.[student.name] || false}
                                    onChange={() => handleAttendanceChange(selectedClass.id, student.name)}
                                />
                            </li>
                        ))}
                        <button className="mt-4 bg-blue-500 text-white p-2" onClick={handleSubmitAttendance}>Submit Attendance</button>
                    </ul>
                </div>
            )}
        </div>
    )
}

export default TeacherClasses;