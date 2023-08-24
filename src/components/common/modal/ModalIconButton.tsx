import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { dispatch } from 'src/redux/store';
import { openModal } from 'src/redux/slices/modal';

export default function ModalIconButton({ type }) {
  const handleOpen = () => dispatch(openModal(type));

  const IconConverter = (type) => {
    const slicedType = type.slice(0, 3);
    switch (slicedType) {
      case 'add':
        return <AddIcon />;
      case 'edi':
        return <EditIcon />;
      case 'del':
        return <DeleteIcon />;
    }
  };

  return (
    <IconButton
      onClick={() => {
        handleOpen();
      }}
    >
      {IconConverter(type)}
    </IconButton>
  );
}
