import { Box, TextField, Typography } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/ko';
import { useFormikContext } from 'formik';

const ApplicationDateSetting = () => {
  const { setFieldValue, values } = useFormikContext();

  return (
    <Box sx={{ display: 'flex', pb: 4, flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
          <DateTimePicker
            label="신청 시작일"
            onChange={(date) => setFieldValue('startDate', Date.parse(date))}
            renderInput={(params) => <TextField {...params} />}
            shouldDisableDate={(day) => values.endDate && day > values.endDate}
            value={values.startDate}
          />

          <Box sx={{ px: 2 }}>
            <Typography variant="h5">-</Typography>
          </Box>
          <DateTimePicker
            label="신청 마감일"
            onChange={(date) => setFieldValue('endDate', Date.parse(date))}
            renderInput={(params) => <TextField {...params} />}
            shouldDisableDate={(day) => values.startDate && day < values.startDate}
            value={values.endDate}
          />
        </LocalizationProvider>
      </Box>
    </Box>
  );
};
export default ApplicationDateSetting;
