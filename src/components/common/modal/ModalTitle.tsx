import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { ADDCATEGORY, DELETECATEGORY, EDITCATEGORY } from 'src/assets/data/modal/modals';

export default function ModalTitle() {
  const modalType = useSelector((state) => state.modal.modalType);

  const titleConverter = (type) => {
    switch (type) {
      case ADDCATEGORY:
        return '마일리지 카테고리 추가';
      case EDITCATEGORY:
        return '마일리지 카테고리 수정';
      case DELETECATEGORY:
        return '마일리지 카테고리 삭제';
    }
  };

  return (
    <Typography color="primary" id="modal-modal-title" variant="h6" component="h2">
      {titleConverter(modalType)}
    </Typography>
  );
}
