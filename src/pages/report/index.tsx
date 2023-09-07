import { Box, Chip, Tab, Tabs, Typography } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReportTabs from 'src/components/common/report/ReportTabs';
import { setChartNum } from 'src/redux/slices/chart';
// import { ResponsiveLine } from '@nivo/line';
import dynamic from 'next/dynamic';
// import { LineChart } from '@mui/x-charts/LineChart';

// const Pie = dynamic(() => import('@ant-design/plots').then(({ Pie }) => Pie), { ssr: false });
const LineChart = dynamic(
  () => import('@mui/x-charts/LineChart').then(({ LineChart }) => LineChart),
  { ssr: false }
);
const sampleX = [
  new Date('2000'),
  new Date('2010'),
  new Date('2020'),
  new Date('2030'),
  new Date('2040'),
  new Date('2050'),
  new Date('2060'),
];
const sample = {
  first: [1, 10, 30, 20, 70, 10, 100],
  second: [30, 20, 40, 60, 80, 30, 110],
  third: [80, 30, 50, 70, 20, 110, 120],
  fourth: [40, 40, 60, 80, 40, 40, 50],
};

const PieChart = dynamic(() => import('@mui/x-charts/PieChart').then(({ PieChart }) => PieChart), {
  ssr: false,
});

const pieParams = { height: 200, margin: { right: 5 } };
const palette = ['red', 'blue', 'green'];
export default function index() {
  return (
    <div>
      <ReportTabs />

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 600 }}>
          <LineChart
            xAxis={[{ data: sampleX, scaleType: 'time' }]}
            yAxis={[
              { id: 'linearAxis', scaleType: 'linear' },
              { id: 'linearAxis', scaleType: 'linear' },
              { id: 'linearAxis', scaleType: 'linear' },
              { id: 'linearAxis', scaleType: 'linear' },
              { id: 'linearAxis', scaleType: 'linear' },
              // { id: 'linearAxis', scaleType: 'log' },
            ]}
            series={[
              { yAxisKey: 'linearAxis', data: sample['first'], label: '1학년' },
              { yAxisKey: 'linearAxis', data: sample['second'], label: '2학년' },
              { yAxisKey: 'linearAxis', data: sample['third'], label: '3학년' },
              { yAxisKey: 'linearAxis', data: sample['fourth'], label: '4학년' },
            ]}
            leftAxis="linearAxis"
            height={400}
          />
        </Box>
        <Box flexGrow={1}>
          <Chip label="학년 별 차트" color="primary" variant="outlined" />
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: 10, label: '1학년' },
                  { id: 1, value: 15, label: '2학년' },
                  { id: 2, value: 20, label: '3학년' },
                  { id: 3, value: 20, label: '4학년' },
                ],
              },
            ]}
            width={600}
            height={400}
          />
        </Box>
      </Box>
    </div>
  );
}
