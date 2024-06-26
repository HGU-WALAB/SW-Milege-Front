import PropTypes from 'prop-types';
// next
import { useRouter } from 'next/router';
import MiniDrawer from 'src/components/common/Drawer/Drawer';
// @mui
import { Box, Stack } from '@mui/material';
import { END_ROUTE_LOGIN } from '../../routes/paths';
import MileageHeader from 'src/components/common/Appbar/MileageHeader';

const handleDrawerOpen = () => {
};

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
        </Box>
      </Box>
    </Stack>
  );
}
