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
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import CategoryIcon from '@mui/icons-material/Category';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import SearchIcon from '@mui/icons-material/Search';
import InputIcon from '@mui/icons-material/Input';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import Face6Icon from '@mui/icons-material/Face6';
import PersonIcon from '@mui/icons-material/Person';
import DonutSmallIcon from '@mui/icons-material/DonutSmall';
import GavelIcon from '@mui/icons-material/Gavel';
import SettingsIcon from '@mui/icons-material/Settings';
import { Box, Button } from '@mui/material';
import EnhancedTable from '../CustomTable';
import DrawerListItem from './DrawerListItem';
import { Board, BoardList } from 'src/assets/data/board';
import MileageHeader from '../Appbar/MileageHeader';

const IconReturn = (text) => {
  switch (text) {
    case Board['마일리지 카테고리']:
      return <CategoryIcon />;
    case Board['마일리지 항목']:
      return <AllInboxIcon />;
    case Board['마일리지 조회']:
      return <SearchIcon />;
    case Board['마일리지 등록']:
      return <InputIcon />;
    case Board['신청자 관리']:
      return <AssignmentIndIcon />;
    case Board['학생 관리']:
      return <Face6Icon />;
    case Board['사용자 관리']:
      return <PersonIcon />;
    case Board['학생별 마일리지 현황']:
      return <DonutSmallIcon />;
    case Board['마일리지 선정결과']:
      return <GavelIcon />;
    case Board['설정']:
      return <SettingsIcon />;
    default:
      return <div>Not Found </div>;
  }
};

const ComponentReturn = (text) => {
  switch (text) {
    case Board['마일리지 카테고리']:
      return <EnhancedTable type="마일리지 카테고리" />;
    // return <div>d</div>;
    case Board['마일리지 항목']:
      // return <EnhancedTable type="마일리지 카테고리" />;
      return <div>dd</div>;
    case Board['마일리지 조회']:
      return <SearchIcon />;
    case Board['마일리지 등록']:
      return <InputIcon />;
    case Board['신청자 관리']:
      return <AssignmentIndIcon />;
    case Board['학생 관리']:
      return <Face6Icon />;
    case Board['사용자 관리']:
      return <PersonIcon />;
    case Board['학생별 마일리지 현황']:
      return <DonutSmallIcon />;
    case Board['마일리지 선정결과']:
      return <GavelIcon />;
    case Board['설정']:
      return <SettingsIcon />;
    default:
      return <div>Not Found </div>;
  }
};

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
      {/* 메뉴 아이콘과 제목을 가지고 있는  */}
      {/* <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            SW중심대 마일리지 시스템
          </Typography>
        </Toolbar>
        <Box sx={{ position: 'absolute', right: '30px', top: '13px' }}>
          <Button color="inherit">Login</Button>
        </Box>
      </AppBar> */}
      <MileageHeader open={open} handleDrawerOpen={handleDrawerOpen} />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        {/*  사이드바 리스트 아이템 */}
        <List>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((boardNum, index) => (
            <Box key={index}>
              <DrawerListItem
                boardNum={boardNum}
                IconReturn={IconReturn}
                setComponent={setComponent}
                component={component}
                open={open}
              />
              {(boardNum === 3 || boardNum === 6) && <Divider />}
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
