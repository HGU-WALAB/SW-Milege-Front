import { Button, IconButton, Toolbar, Typography, styled } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Box } from '@mui/system';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Link from 'next/link';
import AuthWithSocial from 'src/sections/auth/AuthWithSocial';
import { useRouter } from 'next/router';
import { logout } from 'src/auth/utils';
import { END_ROUTE_LOGIN } from 'src/routes/paths';

export const DOMAIN = process.env.NEXT_PUBLIC_HOST_BASE_DOMAIN;

const drawerWidth = 240;

interface DrawerHeaderProps {
  open: boolean;
  handleDrawerOpen: () => void;
}

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function MileageHeader({ open, handleDrawerOpen }: DrawerHeaderProps) {
  const { pathname } = useRouter();
  return (
    <AppBar position="fixed" open={open}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={() => {
            handleDrawerOpen();
          }}
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

      <Box sx={{ position: 'absolute', right: '30px', top: '13px', display: 'flex', gap: '50px' }}>
        {!pathname.includes(END_ROUTE_LOGIN) && <AuthWithSocial />}
        <Link
          href={`${DOMAIN}/auth/login`}
          style={{
            textDecoration: 'none',
            color: 'inherit',
          }}
        >
          {!pathname.includes(END_ROUTE_LOGIN) && (
            <Button onClick={logout} color="inherit">
              로그아웃
            </Button>
          )}
        </Link>
      </Box>
    </AppBar>
  );
}
