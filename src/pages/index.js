import Head from 'next/head';
// @mui
import { Box } from '@mui/material';
// layouts
import MainLayout from '../layouts/main';
// components
import ScrollProgress from '../components/scroll-progress';
// sections
import {
  HomeHero,
  HomeMinimal,
  HomeDarkMode,
  HomeLookingFor,
  HomeForDesigner,
  HomeColorPresets,
  HomePricingPlans,
  HomeAdvertisement,
  HomeCleanInterfaces,
  HomeHugePackElements,
} from '../sections/home';
import { withTryCatchForSSR } from 'src/utils/withTryCatchForSSR';

import { ComponentReturn } from 'src/components/common/Table/TableComponents';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from 'src/utils/axios';

import {
  setCategoryList,
  setItemList,
  setStudentList,
  setStudentNameList,
} from 'src/redux/slices/filterList';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { set } from 'lodash';
import { setServerSideCookie } from 'src/auth/jwtCookie';
import { DOMAIN } from '../sections/auth/AuthLoginForm';
import { handleServerAuth403Error } from '../auth/utils';
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

const getServerSidePropsFunction = async (context) => {
  setServerSideCookie(context);

  const resCategory = await axiosInstance.get('/api/mileage/categories');
  const categoryData = await resCategory.data;

  const resGlobalItem = await axiosInstance.get('/api/mileage/items');
  const globalItemData = await resGlobalItem.data;

  const resStudents = await axiosInstance.get(`/api/mileage/students`);
  const studentData = await resStudents.data;

  return { props: { categoryData, globalItemData, studentData } };
};

export const getServerSideProps = withTryCatchForSSR(getServerSidePropsFunction);

export default function HomePage({
  categoryData,
  globalItemData,
  studentData,
  error,
  requireLogin,
}) {
  const { push } = useRouter();
  if (requireLogin) {
    push(`${DOMAIN}/auth/login`);
    return;
  }

  const dispatch = useDispatch();
  const router = useRouter();
  console.log(categoryData);

  useEffect(() => {
    const filteringInit = async () => {
      await dispatch(
        setCategoryList(
          categoryData.list?.map((category) => ({ id: category.id, name: category.name }))
        )
      );
      await dispatch(
        setItemList(globalItemData.list?.map((item) => ({ id: item.id, name: item.name })))
      );

      await dispatch(
        setStudentList(
          studentData.list?.map((student) => ({
            id: student.id,
            name: student.name,
            sid: student.sid,
          }))
        )
      );
      router.push(`${DOMAIN}/mileage/category`);
    };
    filteringInit();
  }, []);

  const componentNum = useSelector((state) => state.component.componentNum);
  return (
    <>
      <Head>
        <title>SW 마일리지 관리자</title>
      </Head>

      {ComponentReturn(componentNum)}
    </>
  );
}
