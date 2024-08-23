import { IconButton, Button } from '@mui/material';
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

  const IconConverter = (type: string) => {
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
      default:
        return null;
    }
  };

  const renderButton = () => {
    const slicedType = type?.slice(0, 3);
    let buttonText = '';

    if (type !== ADDMILEAGEREGISTER) {
      if (slicedType === 'add') {
        buttonText = '추가';
      } else if (slicedType === 'del') {
        buttonText = '삭제';
      } else if (slicedType === 'mag') {
        buttonText = '마법사';
      }
    }

    if (buttonText) {
      return (
        <Button
          onClick={handleOpen}
          startIcon={IconConverter(type)}
        >
          {buttonText}
        </Button>
      );
    } else {
      return (
        <IconButton onClick={handleOpen}>
          {IconConverter(type)}
        </IconButton>
      );
    }
  };

  return renderButton();
}
