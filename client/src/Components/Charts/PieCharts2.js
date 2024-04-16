import React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

const AttendancePieChart = ({ subject, data }) => {
  return (
    <div className="inline-block m-4 border border-gray-300 p-4 rounded-md shadow-md w-96">
      <h2 className="text-xl font-bold mb-4">{subject}</h2>
      <div className="w-128 h-64">
        <PieChart
          series={[
            {
              data,
              highlightScope: { faded: 'global', highlighted: 'item' },
              faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
            },
          ]}
          height={200}
        />
      </div>
    </div>
  );
};

export default AttendancePieChart;