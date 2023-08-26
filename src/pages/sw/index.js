import { Dialog } from '@mui/material';
import { useSelector } from 'react-redux';
import { Board } from 'src/assets/data/board/board';
import CustomModal1 from 'src/components/Template/CustomModal';

import MiniDrawer from 'src/components/common/Drawer/Drawer';
import Header from 'src/components/common/Header';

// import Header from 'src/layouts/dashboard/header/Header';

export default function Index() {
  return (
    <>
      <Header />
      <MiniDrawer />
    </>
  );
}
