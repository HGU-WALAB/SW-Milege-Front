import { Box } from '@mui/material';
import ChartExample from 'src/components/common/chart/ChartExample';
import ReportTabs from 'src/components/common/report/ReportTabs';

export default function index() {
  return (
    <Box>
      <ReportTabs />
      <ChartExample />
    </Box>
  );
}
