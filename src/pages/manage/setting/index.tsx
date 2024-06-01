import { Box, Typography } from '@mui/material';
import axios from 'axios';
import { InferGetServerSidePropsType } from 'next';
import { setServerSideCookie } from 'src/auth/jwtCookie';
import { handleServerAuth403Error } from 'src/auth/utils';
import SemesterSetting from 'src/components/board/SemesterSetting';
import SemesterSelect from 'src/components/common/Select/SemesterSelect';
import SemesterTable from 'src/components/common/Table/SemesterTable';
import axiosInstance from 'src/utils/axios';
import { withTryCatchForSSR } from 'src/utils/withTryCatchForSSR';

interface IGetAllSemesterWithStatus {
  count: number;
  list: ISemesterWithStatus[];
}

interface IISemesterWithStatus {
  id: number;
  name: string;
  status: string;
}

const getServerSidePropsFunction: GetServerSideProps<{
  fetchData: IGetAllSemesterWithStatus;
}> = async (context) => {
  await setServerSideCookie(context);

  const res = await axiosInstance.get(`/api/mileage/semesters/admin/status`);
  const fetchData = res.data;

  return { props: { fetchData } };
};
export const getServerSideProps = withTryCatchForSSR(getServerSidePropsFunction);

export default function SettingPage({
  fetchData,
  requireLogin,
  error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (requireLogin) {
    handleServerAuth403Error(error);
    return;
  }
  return (
    <>
      <Typography color="primary" variant="h5" sx={{ mb: 2 }}>
        설정
      </Typography>
      <Box sx={{ height: '50px' }} />
      <SemesterSetting />
      {/* <SemesterTable data={fetchData} /> */}
    </>
  );
}
