import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface AttendanceData {
  week: string;
  sessionsAttended: number;
}

interface AttendanceGraphProps {
  attendanceData: AttendanceData[];
}

const AttendanceGraph: React.FC<AttendanceGraphProps> = ({ attendanceData }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Session Attendance',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 5,
        ticks: {
          stepSize: 1
        }
      }
    }
  };

  const data = {
    labels: attendanceData.map(data => `Week ${data.week}`),
    datasets: [
      {
        label: 'Sessions Attended',
        data: attendanceData.map(data => data.sessionsAttended),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  return <Bar options={options} data={data} />;
};

export default AttendanceGraph;