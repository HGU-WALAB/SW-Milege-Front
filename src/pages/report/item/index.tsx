import { Box, Chip, Typography, useTheme } from '@mui/material';
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
      data: [10, 20, 30, 40, 50],
    },
    '2024-02': {
      data: [20, 30, 40, 50, 60],
    },
  };

  const semester = useSelector((state) => state.filter.semester);
  const theme = useTheme();
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: '30px' }}>
      <ReportTabs />
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Typography color="primary" variant="h6">
          학기별 maxPoints 합산 분포
        </Typography>
      </Box>
      <SemesterDropdown />

      <BarChart
        xAxis={[
          {
            scaleType: 'band',
            data: [
              '창의적문제해결역량',
              '글로벌역량',
              '논리적사고와소통능력',
              '다학제융합능력',
              '인성 및 영성',
            ],
          },
        ]}
        series={[{ data: SemesterData[semester]?.data }]}
        width={1000}
        height={300}
        colors={[theme.palette.primary.main]}
      />
    </Box>
  );
}
