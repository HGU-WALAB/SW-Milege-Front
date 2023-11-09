import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import {
  ADDCATEGORY,
  ADDGLOBALITEM,
  ADDITEM,
  ADDMILEAGEREGISTER,
  ADDSTUDENT,
  DELETECATEGORY,
  DELETEITEM,
  EDITCATEGORY,
  EDITGLOBALITEM,
  EDITITEM,
  EDITMILEAGEREGISTER,
  EDITSTUDENT,
} from 'src/assets/data/modal/modals';

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
      case ADDITEM:
        return '마일리지 학기별 항목 추가';
      case EDITITEM:
        return '마일리지 학기별 항목 수정';
      case DELETEITEM:
        return '마일리지 학기별 항목 삭제';
      case ADDGLOBALITEM:
        return '마일리지 글로벌 항목 추가';
      case EDITGLOBALITEM:
        return '마일리지 글로벌 항목 수정';
      case ADDSTUDENT:
        return '학생 추가';
      case EDITSTUDENT:
        return '학생 수정';
      case ADDMILEAGEREGISTER:
        return '마일리지 등록';
      case EDITMILEAGEREGISTER:
        return '마일리지 수정';
    }
  };

  return (
    <Typography color="primary" id="modal-modal-title" variant="h5">
      {titleConverter(modalType)}
    </Typography>
  );
}
