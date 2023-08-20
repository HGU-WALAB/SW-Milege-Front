import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

export default function DrawerListItem({ text, IconReturn, setComponent, component, open }) {
  return (
    <>
      <ListItem
        key={text}
        disablePadding
        sx={{
          display: 'block',
          backgroundColor: text === component && 'primary.main',
          opacity: text === component && 0.6,
        }}
      >
        <ListItemButton
          sx={{
            minHeight: 48,
            justifyContent: open ? 'initial' : 'center',
            px: 2.5,
          }}
          onClick={() => setComponent(text)}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : 'auto',
              justifyContent: 'center',
            }}
          >
            {IconReturn(text)}
          </ListItemIcon>
          <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>
      </ListItem>
    </>
  );
}
