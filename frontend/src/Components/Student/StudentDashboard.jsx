import React, { useState } from 'react'

const StudentDashboard = () => {
    const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
    const [timetable, setTimetable] = useState([
        { id: 1, day: "Monday", subject: "Math", teacher: "Mr. Anderson", time: "10:00 AM" },
        { id: 2, day: "Tuesday", subject: "Science", teacher: "Ms. Johnson", time: "11:00 AM" },
    ]);
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
    return (
        <div>
            <h3 className="text-xl font-semibold mb-4">Today's Timetable</h3>
            {todaysTimetable.length > 0 ? (
                <ul>
                    {todaysTimetable.map((entry) => (
                        <li key={entry.id}>{entry.subject} - {entry.teacher} at {entry.time}</li>
                    ))}
                </ul>
            ) : (<p>No classes today!</p>)}

            <h3 className="text-xl font-semibold mt-6">Attendance</h3>
            <p>Status: {attendance}</p>

            <h3 className="text-xl font-semibold mt-6">Upcoming Assignments</h3>
            <ul>
                {assignments.map((assignment) => (
                    <li key={assignment.id}>{assignment.subject} - Due: {assignment.dueDate}</li>
                ))}
            </ul>

            <h3 className="text-xl font-semibold mt-6">Announcements</h3>
            <ul>
                {announcements.map((announcement, index) => (
                    <li key={index}>{announcement}</li>
                ))}
            </ul>
        </div>
    )
}

export default StudentDashboard