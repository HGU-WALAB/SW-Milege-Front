import { Box, Chip } from '@mui/material';
import ReportTabs from 'src/components/common/report/ReportTabs';
import SemesterDropdown from 'src/components/common/Filter/SemesterDropdown';
import { useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
const BarChart = dynamic(() => import('@mui/x-charts/BarChart').then(({ BarChart }) => BarChart), {
  ssr: false,
});

export default function index() {
  const SemesterData = {
    전체: {
      data: [10, 30, 100, 20, 80],
    },
    '2019-01': {
      data: [10, 20, 30, 40, 50],
    },
    '2019-02': {
      data: [20, 30, 40, 50, 60],
    },

    '2020-01': {
      data: [10, 20, 50, 60, 15],
    },
    '2020-02': {
      data: [20, 30, 40, 30, 60],
    },
    '2021-01': {
      data: [90, 40, 50, 60, 70],
    },
    '2021-02': {
      data: [20, 50, 20, 30, 20],
    },
    '2022-01': {
      data: [50, 60, 100, 30, 90],
    },
    '2022-02': {
      data: [60, 70, 80, 20, 10],
    },
    '2023-01': {
      data: [20, 80, 90, 100, 110],
    },
    '2023-02': {
      data: [10, 90, 90, 20, 70],
    },
    '2024-01': {
      data: [90, 100, 110, 100, 100],
    },
    '2024-02': {
      data: [100, 110, 120, 130, 140],
    },
  };

  const semester = useSelector((state) => state.filter.semester);

  return (
    <Box>
      <ReportTabs />
      <Box sx={{ height: '100px' }}></Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: '30px' }}>
        <Chip label="학기별 maxPoints 합산 분포" color="primary" />
      </Box>
      <SemesterDropdown />

      <BarChart
        xAxis={[{ scaleType: 'band', data: ['A', 'B', 'C', 'D', 'E'] }]}
        series={[{ data: SemesterData[semester].data }]}
        width={1000}
        height={500}
      />
    </Box>
  );
}
