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
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export const getServerSideProps = async () => {
  const resCategory = await axiosInstance.get('/api/mileage/categories');
  const categoryData = await resCategory.data;

  // console.log(categoryData);

  const resGlobalItem = await axiosInstance.get('/api/mileage/items');
  const globalItemData = await resGlobalItem.data;

  const resStudents = await axiosInstance.get(`/api/mileage/students`);
  const studentData = await resStudents.data;

  return { props: { categoryData, globalItemData, studentData } };
};

export default function HomePage({ categoryData, globalItemData, studentData }) {
  const dispatch = useDispatch();
  const router = useRouter();
  console.log(categoryData);

  useEffect(() => {
    const filteringInit = async () => {
      await dispatch(
        setCategoryList(
          categoryData.list.map((category) => ({ id: category.id, name: category.name }))
        )
      );
      await dispatch(
        setItemList(globalItemData.list.map((item) => ({ id: item.id, name: item.name })))
      );

      await dispatch(
        setStudentList(
          studentData.list.map((student) => ({
            id: student.id,
            name: student.name,
            sid: student.sid,
          }))
        )
      );
      router.push('/mileage/category');
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

      {/* <ScrollProgress /> */}

      {/* <HomeHero /> */}

      {/* <Box
        sx={{
          overflow: 'hidden',
          position: 'relative',
          bgcolor: 'background.default',
        }}
      >
        <HomeMinimal />

        <HomeHugePackElements />

        <HomeForDesigner />

        <HomeDarkMode />

        <HomeColorPresets />

        <HomeCleanInterfaces />

        <HomePricingPlans />

        <HomeLookingFor />

        <HomeAdvertisement />
      </Box> */}
    </>
  );
}
