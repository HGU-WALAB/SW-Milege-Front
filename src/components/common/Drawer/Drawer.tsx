import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import { m } from 'framer-motion';
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
import { ComponentReturn } from 'src/components/common/Table/TableComponents';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { dispatch } from 'src/redux/store';
import {
  clearCategory,
  clearDepartment,
  clearGrade,
  clearIsVisible,
  clearItem,
  clearSemester,
  clearStudentName,
} from 'src/redux/slices/filter';
import { setOpen, setPinned } from 'src/redux/slices/drawer';
import { clearSelectedId } from 'src/redux/slices/table';
import { useRouter } from 'next/router';
import { setComponentNum } from 'src/redux/slices/component';
import {
  END_ROUTE_CATEGORY,
  END_ROUTE_GLOBAL_ITEM,
  END_ROUTE_LOGIN,
  END_ROUTE_MANAGER,
  END_ROUTE_MANAGE_REGISTER,
  END_ROUTE_MILEAGE_REGISTER,
  END_ROUTE_RESULT,
  END_ROUTE_SEMESTER_ITEM,
  END_ROUTE_STUDENT,
  END_ROUTE_VIEW,
} from 'src/routes/paths';

const DOMAIN = process.env.NEXT_PUBLIC_HOST_BASE_DOMAIN;

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
  // const [component, setComponent] = React.useState(0);
  const dispatch = useDispatch();

  const clearSelected = () => {
    dispatch(clearCategory());
    dispatch(clearSemester(curSemester));
    dispatch(clearIsVisible());
    dispatch(clearItem());
    dispatch(clearStudentName());
    dispatch(clearGrade());
    dispatch(clearDepartment());
    dispatch(clearSelectedId());
  };
  const theme = useTheme();
  const curSemester = useSelector((state) => state.data.currentSemester);
  const pinned = useSelector((state) => state.drawer.pinned);
  const open = useSelector((state) => state.drawer.open);
  const drawerPinnedOff = () => dispatch(setPinned(false));
  const drawerPinnedOn = () => dispatch(setPinned(true));
  const drawerOpen = () => dispatch(setOpen(true));
  const drawerClose = () => dispatch(setOpen(false));

  const handleDrawerOpen = () => {
    drawerOpen();
  };

  const handleDrawerClose = () => {
    if (!pinned) {
      drawerClose();
    }
  };

  const handleDrawerPinOn = () => {
    drawerPinnedOn();
    handleDrawerOpen();
  };

  const handleDrawerPinOff = () => {
    drawerPinnedOff();
    drawerClose();
  };

  const linkConverter = (num) => {
    switch (num) {
      case 0:
        return `${DOMAIN}/mileage/category`;
      case 1:
        return `${DOMAIN}/mileage/item/global`;
      case 2:
        return `${DOMAIN}/mileage/item/semester`;
      case 3:
        return `${DOMAIN}/mileage/view`;
      case 4:
        return `${DOMAIN}/mileage/register`;
      case 5:
        return `${DOMAIN}/manage/register`;
      case 6:
        return `${DOMAIN}/manage/student`;
      case 7:
        return `${DOMAIN}/manage/user`;
      case 9:
        return `${DOMAIN}/mileage/result`;
      case 10:
        return `${DOMAIN}/manage/setting`;
      case 11:
        return `${DOMAIN}/report`;
      default:
        return `${DOMAIN}/`;
    }
  };

  const { pathname } = useRouter();

  const updateComponentNum = (newComponentNum) => dispatch(setComponentNum(newComponentNum));

  React.useEffect(() => {
    if (pathname.includes(END_ROUTE_CATEGORY)) updateComponentNum(0);
    else if (pathname.includes(END_ROUTE_LOGIN)) updateComponentNum(0);
    else if (pathname.includes(END_ROUTE_GLOBAL_ITEM)) updateComponentNum(1);
    else if (pathname.includes(END_ROUTE_SEMESTER_ITEM)) updateComponentNum(2);
    else if (pathname.includes(END_ROUTE_VIEW)) updateComponentNum(3);
    else if (pathname.includes(END_ROUTE_MILEAGE_REGISTER)) updateComponentNum(4);
    else if (pathname.includes(END_ROUTE_MANAGE_REGISTER)) updateComponentNum(5);
    else if (pathname.includes(END_ROUTE_STUDENT)) updateComponentNum(6);
    else if (pathname.includes(END_ROUTE_MANAGER)) updateComponentNum(7);
    else if (pathname.includes(END_ROUTE_RESULT)) updateComponentNum(9);
    else if (pathname.includes(END_ROUTE_SETTING)) updateComponentNum(10);
    else if (pathname.includes(END_ROUTE_REPORT)) updateComponentNum(11);
  }, [pathname]);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {/* 메뉴 아이콘과 제목을 가지고 있는 헤더 */}
      <MileageHeader open={open} handleDrawerOpen={handleDrawerPinOn} />
      {/* 사이드바 */}
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerPinOff}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        {/*  사이드바 리스트 아이템 */}
        <List>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((boardNum, index) => (
            <m.div
              key={index}
              onClick={clearSelected}
              onMouseEnter={handleDrawerOpen}
              onMouseLeave={handleDrawerClose}
              transition={{ delay: 0.5 }}
            >
              <Link
                href={linkConverter(boardNum)}
                style={{ color: 'inherit', textDecoration: 'none' }}
              >
                <DrawerListItem boardNum={boardNum} open={open} />
              </Link>
              {(boardNum === 4 || boardNum === 7) && <Divider />}
            </m.div>
          ))}
        </List>
      </Drawer>
      {/* 사이드바에 따른 게시판 본문 컴포넌트 */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/* <DrawerHeader /> */}
        {/* {ComponentReturn(component)} */}
      </Box>
    </Box>
  );
}
