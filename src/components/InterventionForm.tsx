import React, { useState, useEffect } from 'react';
import { Intervention, Student } from '../types';

interface InterventionFormProps {
  selectedStudent: Student | null;
  interventions: Intervention[];
  onAssignIntervention: (assignment: { studentId: string; interventionId: string; startDate: string; endDate: string; frequency: number; goal: string; baseline: number }) => void;
}

const InterventionForm: React.FC<InterventionFormProps> = ({ selectedStudent, interventions, onAssignIntervention }) => {
  const [interventionId, setInterventionId] = useState('');
  const [customIntervention, setCustomIntervention] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [frequency, setFrequency] = useState('');
  const [goal, setGoal] = useState('');
  const [baseline, setBaseline] = useState('');

  useEffect(() => {
    if (startDate) {
      const start = new Date(startDate);
      const end = new Date(start.setDate(start.getDate() + 42)); // 6 weeks later
      setEndDate(end.toISOString().split('T')[0]);
    }
  }, [startDate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedStudent && (interventionId || customIntervention) && startDate && endDate && frequency && goal && baseline) {
      onAssignIntervention({
        studentId: selectedStudent.id,
        interventionId: interventionId === 'custom' ? customIntervention : interventionId,
        startDate,
        endDate,
        frequency: Number(frequency),
        goal,
        baseline: Number(baseline)
      });
      setInterventionId('');
      setCustomIntervention('');
      setStartDate('');
      setEndDate('');
      setFrequency('');
      setGoal('');
      setBaseline('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <select
        value={interventionId}
        onChange={(e) => setInterventionId(e.target.value)}
        className="border p-2 mr-2 mb-2 bg-white text-[#25424C]"
      >
        <option value="">Select Intervention</option>
        {interventions.map((intervention) => (
          <option key={intervention.id} value={intervention.id}>
            {intervention.name}
          </option>
        ))}
        <option value="custom">Custom Intervention</option>
      </select>
      {interventionId === 'custom' && (
        <input
          type="text"
          value={customIntervention}
          onChange={(e) => setCustomIntervention(e.target.value)}
          placeholder="Enter custom intervention"
          className="border p-2 mr-2 mb-2 bg-white text-[#25424C]"
        />
      )}
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="border p-2 mr-2 mb-2 bg-white text-[#25424C]"
      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="border p-2 mr-2 mb-2 bg-white text-[#25424C]"
      />
      <input
        type="number"
        value={frequency}
        onChange={(e) => setFrequency(e.target.value)}
        placeholder="Frequency per week"
        className="border p-2 mr-2 mb-2 bg-white text-[#25424C]"
      />
      <input
        type="text"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        placeholder="Goal"
        className="border p-2 mr-2 mb-2 bg-white text-[#25424C]"
      />
      <input
        type="number"
        value={baseline}
        onChange={(e) => setBaseline(e.target.value)}
        placeholder="Baseline"
        className="border p-2 mr-2 mb-2 bg-white text-[#25424C]"
      />
      <button type="submit" className="bg-[#346780] text-white px-4 py-2 rounded hover:bg-[#7396A9] transition-colors">
        Assign Intervention
      </button>
    </form>
  );
};

export default InterventionForm;