import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { BoardList } from 'src/assets/data/board';
import { IconReturn } from './DrawerIcons';

export default function DrawerListItem({ boardNum, setComponent, component, open }) {
  return (
    <>
      <ListItem
        key={boardNum}
        disablePadding
        sx={{
          display: 'block',
          backgroundColor: boardNum === component && 'primary.main',
          opacity: boardNum === component && 0.6,
        }}
      >
        <ListItemButton
          sx={{
            minHeight: 60,
            justifyContent: open ? 'initial' : 'center',
            px: 2.5,
          }}
          onClick={() => setComponent(boardNum)}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : 'auto',
              justifyContent: 'center',
            }}
          >
            {IconReturn(boardNum)}
          </ListItemIcon>
          <ListItemText primary={BoardList[boardNum]} sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>
      </ListItem>
    </>
  );
}
