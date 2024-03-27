import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { ADDTYPE, EDITMANAGER, EDITTYPE } from 'src/assets/data/modal/modals';
import {
  ADDCATEGORY,
  ADDGLOBALITEM,
  ADDITEM,
  ADDMANAGER,
  ADDMILEAGEREGISTER,
  ADDSTUDENT,
  DELETECATEGORY,
  DELETEITEM,
  EDITCATEGORY,
  EDITGLOBALITEM,
  EDITITEM,
  EDITMILEAGEREGISTER,
  EDITSTUDENT,
  MAGICIANSEMESTERITEM,
} from 'src/assets/data/modal/modals';

export default function ModalTitle() {
  const modalType = useSelector((state) => state.modal.modalType);

  const titleConverter = (type) => {
    switch (type) {
      case ADDTYPE:
        return '마일리지 타입 추가';
      case EDITTYPE:
        return '마일리지 타입 수정';
      case ADDCATEGORY:
        return '마일리지 카테고리 추가';
      case EDITCATEGORY:
        return '마일리지 카테고리 수정';
      case DELETECATEGORY:
        return '마일리지 카테고리 삭제';
      case ADDITEM:
        return '학기별 마일리지 세부 항목 추가';
      case EDITITEM:
        return '학기별 마일리지 세부 항목 수정';
      case DELETEITEM:
        return '학기별 마일리지 세부 항목 삭제';
      case ADDGLOBALITEM:
        return '마일리지 세부 항복 추가';
      case EDITGLOBALITEM:
        return '마일리지 세부 항복 수정';
      case ADDSTUDENT:
        return '학생 추가';
      case EDITSTUDENT:
        return '학생 수정';
      case ADDMILEAGEREGISTER:
        return '마일리지 적립';
      case EDITMILEAGEREGISTER:
        return '마일리지 수정';
      case MAGICIANSEMESTERITEM:
        return '학기별 마일리지 세부 항목 마법사';
      case EDITMANAGER:
        return '관리자 수정';
      case ADDMANAGER:
        return '관리자 추가';
    }
  };

  return (
    <Typography color="primary" id="modal-modal-title" variant="h5">
      {titleConverter(modalType)}
    </Typography>
  );
}
