import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
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

import PersonIcon from '@mui/icons-material/Person';
import { ADDMILEAGEREGISTER, REGISTEREDSTUDENTS } from 'src/assets/data/modal/modals';
export default function ModalIconButton({ setOpen, type, beforeData }) {
  const dispatch = useDispatch();
  const handleOpen = () => {
    // dispatch(openModal(type));
    console.log(type);
    dispatch(setModalType(type));
    setOpen(true);
    dispatch(setBeforeData(beforeData));
    type === REGISTEREDSTUDENTS && dispatch(setClickedItemId(beforeData?.id));
    // type === ADDMILEAGEREGISTER && dispatch(setClickedRecordId(beforeData?.id));
    console.log('ddd', beforeData?.id);
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
