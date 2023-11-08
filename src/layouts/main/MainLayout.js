import PropTypes from 'prop-types';
// next
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import MiniDrawer from 'src/components/common/Drawer/Drawer';
import Header from 'src/components/common/Header';
// @mui
import { Box } from '@mui/material';
import ExcelExport from 'src/components/excel/ExcelExport';
import { useSelector } from 'react-redux';
//

// const Header = dynamic(() => import('./Header'), { ssr: false });
const Footer = dynamic(() => import('./Footer'), { ssr: false });

// ----------------------------------------------------------------------

MainLayout.propTypes = {
  children: PropTypes.node,
};

export default function MainLayout({ children }) {
  return (
    <Box>
      <Box sx={{ display: 'flex', width: '100%', py: '100px' }}>
        <MiniDrawer />

        <Box
          component="main"
          sx={{
            pr: '50px',
            width: '100%',
          }}
        >
          {children}

          <ExcelExport />
        </Box>
      </Box>

      {/* <Footer /> */}
    </Box>
  );
}
