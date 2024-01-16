import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { BoardList } from 'src/assets/data/board/board';
import { IconReturn } from './DrawerIcons';
import { useDispatch, useSelector } from 'react-redux';
import { setComponentNum } from 'src/redux/slices/component';
import { set } from 'lodash';

export default function DrawerListItem({ boardNum, open }) {
  const componentNum = useSelector((state) => state.component.componentNum);

  const dispatch = useDispatch();
  const updateComponentNum = (newComponentNum) => dispatch(setComponentNum(newComponentNum));
  return (
    <>
      <ListItem
        key={boardNum}
        disablePadding
        sx={{
          display: 'block',
          backgroundColor: boardNum === componentNum && 'primary.main',
          opacity: boardNum === componentNum && 0.6,
        }}
      >
        <ListItemButton
          sx={{
            minHeight: 60,
            justifyContent: open ? 'initial' : 'center',
            px: 2.5,
          }}
          onClick={() => updateComponentNum(boardNum)}
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
