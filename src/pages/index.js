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

export default function HomePage() {
  const { push } = useRouter();
  const router = useRouter();

  useEffect(() => {
    router.push(`${DOMAIN}/mileage/type`);
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
