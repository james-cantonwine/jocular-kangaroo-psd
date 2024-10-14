export interface Student {
  id: string;
  name: string;
}

export interface Intervention {
  id: string;
  name: string;
}

export interface Assignment {
  id: string;
  studentId: string;
  interventionId: string;
  startDate: string;
  endDate: string;
  frequency: string;
  goal: string;
  baseline: number;
}

export interface ProgressData {
  id: string;
  assignmentId: string;
  date: string;
  score: number;
}