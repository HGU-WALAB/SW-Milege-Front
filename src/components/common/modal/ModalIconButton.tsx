import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ListIcon from '@mui/icons-material/List';
import PersonIcon from '@mui/icons-material/Person';
import AutoFixNormalIcon from '@mui/icons-material/AutoFixNormal';
import {
  closeModal,
  openModal,
  setBeforeData,
  setClickedItemId,
  setModalType,
  setStudentList,
} from 'src/redux/slices/modal';
import { useDispatch } from 'react-redux';
import { ADDMILEAGEREGISTER, REGISTEREDSTUDENTS } from 'src/assets/data/modal/modals';
export default function ModalIconButton({ setOpen, type, beforeData }) {
  const dispatch = useDispatch();

  const handleOpen = () => {
    dispatch(setModalType(type));
    setOpen(true);
    dispatch(setBeforeData(beforeData));
    type === REGISTEREDSTUDENTS && dispatch(setClickedItemId(beforeData?.id));
  };

  const IconConverter = (type) => {
    const slicedType = type?.slice(0, 3);
    switch (slicedType) {
      case 'add':
        return <AddIcon />;
      case 'edi':
        return <EditIcon />;
      case 'sho':
        return <ListIcon />;
     case 'man':
        return <PersonIcon />;
      case 'del':
        return <DeleteIcon />;
      case 'reg':
        return <PersonIcon />;
      case 'mag':
        return <AutoFixNormalIcon />;
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
