import { Box, Typography, styled } from '@mui/material';
import { GetServerSideProps } from 'next';
import { InferGetServerSidePropsType } from 'next';
import { setServerSideCookie } from 'src/auth/jwtCookie';
import { handleServerAuth403Error } from 'src/auth/utils';
import SemesterSetting from 'src/components/board/SemesterSetting';
import SemesterTable from 'src/components/common/Table/SemesterTable';
import axiosInstance from 'src/utils/axios';
import { withTryCatchForSSR } from 'src/utils/withTryCatchForSSR';
import SemesterAdder from 'src/components/board/SemesterAdder';

interface IGetAllSemesterWithStatus {
  count: number;
  list: ISemesterWithStatus[];
}

interface ISemesterWithStatus {
  id: number;
  name: string;
  status: string;
}

const getServerSidePropsFunction: GetServerSideProps<{
  fetchData: IGetAllSemesterWithStatus;
  requireLogin?: boolean;
  error?: string;
}> = async (context) => {
  setServerSideCookie(context);

  const res = await axiosInstance.get(`/api/mileage/semesters/admin/status`);
  const fetchData: IGetAllSemesterWithStatus = res.data;
  console.log('fetchData', fetchData);
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
    return null;
  }

  return (
    <>
      <Title variant="h5">신청 기간 및 학기 설정</Title>
      <Spacer />
      <SemesterAdder />
      <SemesterSetting />
    
      <SemesterTable data={fetchData} />
    </>
  );
}

const Title = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(2),
}));

const Spacer = styled(Box)({
  height: '50px',
});
