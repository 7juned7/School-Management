import React, { useState } from 'react'

const TeacherDashboard = () => {
    const [timetable, setTimetable] = useState([
        { id: 1, day: "Monday", subject: "Math", teacher: "Mr. Anderson", time: "10:00 AM" },
        { id: 2, day: "Tuesday", subject: "Science", teacher: "Ms. Johnson", time: "11:00 AM" },
    ]);
    const [teacherClasses, setTeacherClasses] = useState([
        { id: 1, subject: "Mathematics", time: "10:00 AM", day: "Monday" },
        { id: 2, subject: "Physics", time: "2:00 PM", day: "Wednesday" }
    ]);
    const [announcements, setAnnouncements] = useState([
        "School will be closed on March 1st for maintenance.",
        "Math test scheduled for next Monday."
    ]);
    const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
    const todaysTimetable = timetable.filter(entry => entry.day === today);
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
            <h3 className="text-xl font-semibold mt-6">My Classes</h3>
            <ul>
                {teacherClasses.map((cls) => (
                    <li key={cls.id}>{cls.subject} - {cls.day} at {cls.time}</li>
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

export default TeacherDashboard