import React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

const MarksLineChart = ({ subject, studentMarks, classAverage }) => {
  const assessmentComponents = ['Quiz-1', 'Quiz-2', 'Mid Term', 'End Term'];

  // Map the string names to numerical indices for internal use
  const xAxisLabels = assessmentComponents.reduce((acc, curr, index) => {
    acc[index] = curr;
    return acc;
  }, {});

  const cumulative = (arr) => {
    let ans = [];
    ans[0] = arr[0];
    for (let a = 1; a < arr.length; a++) {
      ans[a] = ans[a - 1] + arr[a];
    }
    return ans;
  };


  const cumulativeMarksPersonal = cumulative(studentMarks);
  const cumulativeMarksAverage = cumulative(classAverage);

  const chartData = {
    xAxis: [{ data: Object.keys(xAxisLabels).map(Number) }],
    series: [
      { curve: "linear", data: studentMarks, label: 'Your Marks' },
      { curve: "linear", data: classAverage, label: 'Class Average' },
    ],
    width: 600,
    height: 400,
  };
//   console.log(studentMarks);
  console.log(classAverage);
//   console.log(cumulativeMarksPersonal);

  const chartData2 = {
    xAxis: [{ data: Object.keys(xAxisLabels).map(Number) }],
    series: [
      { data: cumulativeMarksPersonal, label: 'Your Cumulative Marks' },
      { data: cumulativeMarksAverage, label: 'Class Average Cumulative Marks' },
    ],
    width: 600,
    height: 400,
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">{subject}</h2>
      <div className='flex'>
        <LineChart grid={{ vertical: true, horizontal: true }} {...chartData} />
        <LineChart grid={{ vertical: true, horizontal: true }} {...chartData2} />
      </div>
    </div>
  );
};

export default MarksLineChart;
