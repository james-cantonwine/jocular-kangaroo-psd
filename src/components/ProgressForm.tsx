import React, { useState } from 'react';
import { Assignment } from '../types';

interface ProgressFormProps {
  assignments: Assignment[];
  onAddProgress: (progress: { assignmentId: string; date: string; score: number }) => void;
}

const ProgressForm: React.FC<ProgressFormProps> = ({ assignments, onAddProgress }) => {
  const [assignmentId, setAssignmentId] = useState('');
  const [date, setDate] = useState('');
  const [score, setScore] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (assignmentId && date && score) {
      onAddProgress({ assignmentId, date, score: Number(score) });
      setAssignmentId('');
      setDate('');
      setScore('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <select
        value={assignmentId}
        onChange={(e) => setAssignmentId(e.target.value)}
        className="border p-2 mr-2"
      >
        <option value="">Select Assignment</option>
        {assignments.map((assignment) => (
          <option key={assignment.id} value={assignment.id}>
            {`Student ${assignment.studentId} - Intervention ${assignment.interventionId}`}
          </option>
        ))}
      </select>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border p-2 mr-2"
      />
      <input
        type="number"
        value={score}
        onChange={(e) => setScore(e.target.value)}
        placeholder="Score"
        className="border p-2 mr-2"
      />
      <button type="submit" className="bg-purple-500 text-white px-4 py-2 rounded">
        Add Progress
      </button>
    </form>
  );
};

export default ProgressForm;