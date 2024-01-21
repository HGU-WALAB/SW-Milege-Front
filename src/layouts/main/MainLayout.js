import PropTypes from 'prop-types';
// next
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import MiniDrawer from 'src/components/common/Drawer/Drawer';
import Header from 'src/components/common/Header';
// @mui
import { Box, Stack } from '@mui/material';
import ExcelExport from 'src/components/excel/ExcelExport';
import { useSelector } from 'react-redux';
import { DOMAIN } from '../../sections/auth/AuthLoginForm';
import { END_ROUTE_LOGIN } from '../../routes/paths';
import MileageHeader from 'src/components/common/Appbar/MileageHeader';

// const Header = dynamic(() => import('./Header'), { ssr: false });
const Footer = dynamic(() => import('./Footer'), { ssr: false });
const handleDrawerOpen = () => {};
// ----------------------------------------------------------------------

MainLayout.propTypes = {
  children: PropTypes.node,
};

export default function MainLayout({ children }) {
  const { pathname } = useRouter();
  return (
    <Stack>
      <Box sx={{ display: 'flex', width: '100%' }}>
        {!pathname.includes(END_ROUTE_LOGIN) ? (
          <MiniDrawer />
        ) : (
          <MileageHeader handleDrawerOpen={handleDrawerOpen} />
        )}

        <Box
          component="main"
          sx={{
            py: '100px',
            px: '50px',

            width: '100%',
          }}
        >
          {children}

          <ExcelExport />
        </Box>
      </Box>
    </Stack>
  );
}
