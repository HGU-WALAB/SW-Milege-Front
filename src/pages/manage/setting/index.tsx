import axios from 'axios';
import { InferGetServerSidePropsType } from 'next';
import { setServerSideCookie } from 'src/auth/jwtCookie';
import SemesterTable from 'src/components/common/Table/SemesterTable';
import axiosInstance from 'src/utils/axios';

interface IGetAllSemesterWithStatus {
  count: number;
  list: ISemesterWithStatus[];
}

interface IISemesterWithStatus {
  id: number;
  name: string;
  status: string;
}

export const getServerSideProps: GetServerSideProps<{
  fetchData: IGetAllSemesterWithStatus;
}> = async (context) => {
  await setServerSideCookie(context);

  const res = await axiosInstance.get(`/api/mileage/semesters/admin/status`);
  console.log();
  //   const res = await axios.get('http://localhost:8080/api/mileage/semesters/admin/status');
  const fetchData = res.data;
  console.log(fetchData);

  return { props: { fetchData } };
};

export default function SettingPage({
  fetchData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <SemesterTable data={fetchData} />
    </>
  );
}
