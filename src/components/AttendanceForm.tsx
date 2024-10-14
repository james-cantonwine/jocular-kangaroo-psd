import React, { useState } from 'react';
import { Student, Assignment } from '../types';

interface AttendanceFormProps {
  selectedStudent: Student | null;
  assignments: Assignment[];
  onRecordAttendance: (attendance: { studentId: string; interventionId: string; week: string; sessionsAttended: number }) => void;
}

const AttendanceForm: React.FC<AttendanceFormProps> = ({ selectedStudent, assignments, onRecordAttendance }) => {
  const [interventionId, setInterventionId] = useState('');
  const [sessionDate, setSessionDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedWeek, setSelectedWeek] = useState('');
  const [sessionsAttended, setSessionsAttended] = useState('');

  const handleRecordSingleAttendance = () => {
    if (selectedStudent && interventionId) {
      onRecordAttendance({
        studentId: selectedStudent.id,
        interventionId,
        week: sessionDate,
        sessionsAttended: 1
      });
      setSessionDate(new Date().toISOString().split('T')[0]);
    }
  };

  const handleRecordMultipleAttendances = () => {
    if (selectedStudent && interventionId && selectedWeek && sessionsAttended) {
      onRecordAttendance({
        studentId: selectedStudent.id,
        interventionId,
        week: selectedWeek,
        sessionsAttended: Number(sessionsAttended)
      });
      setSelectedWeek('');
      setSessionsAttended('');
    }
  };

  const generateWeekOptions = () => {
    if (!assignments.length) return [];
    const weeks = [];
    const sortedAssignments = assignments.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
    const earliestStart = new Date(sortedAssignments[0].startDate);
    const latestEnd = new Date(sortedAssignments[sortedAssignments.length - 1].endDate);
    let currentDate = new Date(earliestStart);
    let weekNumber = 1;

    while (currentDate <= latestEnd) {
      const weekStart = currentDate.toISOString().split('T')[0];
      currentDate.setDate(currentDate.getDate() + 6);
      const weekEnd = currentDate.toISOString().split('T')[0];
      weeks.push({ value: `${weekStart},${weekEnd}`, label: `Week ${weekNumber}: ${weekStart} to ${weekEnd}` });
      currentDate.setDate(currentDate.getDate() + 1);
      weekNumber++;
    }

    return weeks;
  };

  return (
    <div>
      <div className="mb-4">
        <select
          value={interventionId}
          onChange={(e) => setInterventionId(e.target.value)}
          className="border p-2 mr-2 bg-white text-[#25424C]"
        >
          <option value="">Select Intervention</option>
          {assignments
            .filter(assignment => assignment.studentId === selectedStudent?.id)
            .map((assignment) => (
              <option key={assignment.id} value={assignment.interventionId}>
                {assignment.interventionId}
              </option>
            ))}
        </select>
      </div>
      <div className="flex items-center mb-4">
        <input
          type="date"
          value={sessionDate}
          onChange={(e) => setSessionDate(e.target.value)}
          className="border p-2 mr-2 bg-white text-[#25424C]"
        />
        <button
          onClick={handleRecordSingleAttendance}
          className="bg-[#346780] text-white px-4 py-2 rounded hover:bg-[#7396A9] transition-colors"
        >
          Record Single Attendance
        </button>
      </div>
      <div className="flex items-center mb-2">
        <select
          value={selectedWeek}
          onChange={(e) => setSelectedWeek(e.target.value)}
          className="border p-2 mr-2 bg-white text-[#25424C]"
        >
          <option value="">Select Week</option>
          {generateWeekOptions().map((week) => (
            <option key={week.value} value={week.value}>{week.label}</option>
          ))}
        </select>
        <input
          type="number"
          min="0"
          max="5"
          value={sessionsAttended}
          onChange={(e) => setSessionsAttended(e.target.value)}
          placeholder="Sessions attended"
          className="border p-2 mr-2 w-40 bg-white text-[#25424C]"
        />
        <button
          onClick={handleRecordMultipleAttendances}
          className="bg-[#346780] text-white px-4 py-2 rounded hover:bg-[#7396A9] transition-colors"
        >
          Record Multiple Attendances
        </button>
      </div>
    </div>
  );
};

export default AttendanceForm;