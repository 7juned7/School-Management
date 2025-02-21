import React, { useState } from 'react'

const StudentCourses = () => {
    const [courses, setCourses] = useState([
        { id: 1, name: "Mathematics", progress: "75%", instructor: "Mr. Anderson", resources: ["Algebra Notes", "Practice Tests"] },
        { id: 2, name: "Science", progress: "50%", instructor: "Ms. Johnson", resources: ["Physics Slides", "Lab Manual"] }
    ]);
    return (
        <>
            <h3 className="text-xl font-semibold mt-6">My Courses</h3>
            <ul>
                {courses.map((course) => (
                    <li key={course.id} className="mb-2">
                        <strong>{course.name}</strong> - Progress: {course.progress}
                        <br />Instructor: {course.instructor}
                        <br />Resources: {course.resources.join(", ")}
                    </li>
                ))}
            </ul>
        </>
    )
}

export default StudentCourses