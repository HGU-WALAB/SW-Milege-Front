import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';

import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box, Button } from '@mui/material';
import DrawerListItem from './DrawerListItem';
import { Board, BoardList } from 'src/assets/data/board/board';
import MileageHeader from '../Appbar/MileageHeader';
import { IconReturn } from './DrawerIcons';
import { ComponentReturn } from '../Table/TableComponents';
import Link from 'next/link';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  })
);

export default function MiniDrawer() {
  const [component, setComponent] = React.useState(0);
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {/* 메뉴 아이콘과 제목을 가지고 있는 헤더 */}
      <MileageHeader open={open} handleDrawerOpen={handleDrawerOpen} />
      {/* 사이드바 */}
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        {/*  사이드바 리스트 아이템 */}
        <List>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((boardNum, index) => (
            <Box key={index}>
              <Link href={`/board/${boardNum}`}>
                <DrawerListItem
                  boardNum={boardNum}
                  setComponent={setComponent}
                  component={component}
                  open={open}
                />
              </Link>
              {(boardNum === 4 || boardNum === 7) && <Divider />}
            </Box>
          ))}
        </List>
      </Drawer>
      {/* 사이드바에 따른 게시판 본문 컴포넌트 */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/* <DrawerHeader /> */}
        {ComponentReturn(component)}
      </Box>
    </Box>
  );
}
