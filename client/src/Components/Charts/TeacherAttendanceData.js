import React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import AttendancePieChart from './PieCharts2.js'; // Assuming you have already created the AttendancePieChart component

const TeacherSubjectComponent = ({ subject ,attendedData,pieData}) => {
  // Generate sample data for line chart (number of students attending on a particular class)
  const totalClasses = 40;
  const attendedClasses = attendedData;

  // Generate sample data for line chart (number of students attending on a particular class)
  const lineChartData = {
    xAxis: [{ data: Array.from({ length: 17 }, (_, i) => i + 1) }], // Classes from 1 to 17
    series: [
      {
        data: attendedClasses,
      },
    ],
    width: 500,
    height: 350,
  };

  // Generate sample data for pie chart (average attendance of the subject)
  const pieChartData = pieData;

  return (
    <div className="p-4 border border-gray-300 rounded-md shadow-md">
      <h1 className="text-3xl font-bold mb-4">{subject}</h1>
      
      <div className='flex justify-evenly'>
        {/* Line Chart */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Attendance Trend</h3>
        <LineChart grid={{ vertical: true, horizontal: true }} {...lineChartData} />
      </div>
      
      {/* Pie Chart */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Average Attendance</h3>
        <AttendancePieChart  subject={subject} data={pieChartData} />
      </div>
      </div>
      
    </div>
  );
};

export default TeacherSubjectComponent;