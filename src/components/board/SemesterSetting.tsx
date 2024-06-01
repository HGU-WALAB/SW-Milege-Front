import { Box, Button, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import dayjs from 'dayjs';
import { useSelector, useDispatch } from 'react-redux';
import axiosInstance from 'src/utils/axios';
import ApplicationDateSetting from './ApplicationDateSetting';
import SemesterDropdownField from 'src/pages/manage/setting/SemesterDropdownField';
import { setCurrentSemester } from 'src/redux/slices/data';

const SemesterSetting = () => {
  const dispatch = useDispatch();
  const currentSemester = useSelector((state) => state.filter.currentSemester);
  const semester = useSelector((state) => state.filter.semester);

  const handleSubmit = async (values) => {
    const startDate = dayjs(values.startDate).format('YYYY-MM-DDTHH:mm:ss');
    const endDate = dayjs(values.endDate).format('YYYY-MM-DDTHH:mm:ss');

    await dispatch(setCurrentSemester(values.semester));
    try {
      await axiosInstance.put('/api/mileage/semesters', {
        semester: values.semester,
        startDate,
        endDate,
      });
    } catch (error) {
      alert('에러가 발생했습니다.');
    }
  };

  return (
    <Formik
      initialValues={{
        semester: semester,
        startDate: null,
        endDate: null,
      }}
      onSubmit={handleSubmit}
    >
      <Form>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            현재 학기
          </Typography>
          <Box sx={{ display: 'flex', pb: 4 }}>
            <SemesterDropdownField />
          </Box>
          <Typography variant="h5" sx={{ mb: 2 }}>
            마일리지 장학금 신청 기간
          </Typography>
          <Box sx={{ display: 'flex' }}>
            <ApplicationDateSetting />
          </Box>
          <Box sx={{ display: 'flex' }}>
            <Button type="submit" variant="contained" color="primary">
              저장
            </Button>
          </Box>
        </Box>
      </Form>
    </Formik>
  );
};
export default SemesterSetting;
