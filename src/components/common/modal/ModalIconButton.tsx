import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { openModal, setBeforeData } from 'src/redux/slices/modal';
import { useDispatch } from 'react-redux';

export default function ModalIconButton({ type, beforeData }) {
  const dispatch = useDispatch();

  const handleOpen = () => {
    dispatch(openModal(type));
    dispatch(setBeforeData(beforeData));
  };

  const IconConverter = (type) => {
    const slicedType = type?.slice(0, 3);
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
