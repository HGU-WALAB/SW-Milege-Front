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
import { useSelector } from 'react-redux';
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function HomePage() {
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
