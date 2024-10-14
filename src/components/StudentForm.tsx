import React, { useState, useEffect } from 'react';
import { Student } from '../types';

interface StudentFormProps {
  onSelectStudent: (student: Student) => void;
  students: Student[];
}

const StudentForm: React.FC<StudentFormProps> = ({ onSelectStudent, students }) => {
  const [search, setSearch] = useState('');
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);

  useEffect(() => {
    const filtered = students.filter(
      student => 
        student.name.toLowerCase().includes(search.toLowerCase()) ||
        student.id.includes(search)
    );
    setFilteredStudents(filtered);
  }, [search, students]);

  const handleSelect = (student: Student) => {
    onSelectStudent(student);
    setSearch('');
  };

  return (
    <div className="mb-4">
      <p className="text-sm text-gray-600 mb-2">
        Note: In a full implementation, student data would be managed by an administrator or fetched from a school database.
      </p>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search student by name or ID"
        className="border p-2 w-full mb-2"
      />
      {search && (
        <ul className="border rounded-md max-h-40 overflow-y-auto">
          {filteredStudents.map((student) => (
            <li 
              key={student.id} 
              onClick={() => handleSelect(student)}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              {student.name} (ID: {student.id})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StudentForm;