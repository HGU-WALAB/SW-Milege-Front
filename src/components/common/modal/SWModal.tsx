import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {
  Chip,
  FilledInput,
  IconButton,
  OutlinedInput,
  Switch,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import {
  closeCategoryModal,
  closeModal,
  openCategoryModal,
  openModal,
} from 'src/redux/slices/modal';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  ADDCATEGORY,
  ADDGLOBALITEM,
  ADDITEM,
  ADDMANAGER,
  ADDMILEAGEREGISTER,
  ADDSTUDENT,
  ADDTYPE,
  DELETECATEGORY,
  EDITCATEGORY,
  EDITGLOBALITEM,
  EDITITEM,
  EDITMANAGER,
  EDITMILEAGEREGISTER,
  EDITSTUDENT,
  EDITTYPE,
  MAGICIANSEMESTERITEM,
  REGISTEREDSTUDENTS,
} from 'src/assets/data/modal/modals';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import {
  DESCRIPTION,
  CATEGORY,
  MAX_MILEAGE,
  SEMESTER,
  ITEM,
  MILEAGE,
  DESCRIPTION1,
  DESCRIPTION2,
  FILE_DESCRIPTION,
  ISVISIBLE,
  ISVISIBLE_STUDENT,
  IS_STUDENT_INPUT,
  ISDUPLICATE_RECORD,
  ISEVALUATE_CSEE,
  ISEVALUATE_PORTFOLIO,
  ISEVALUATE_FUSION,
  MAX_MAILEAGE,
  NAME,
  SID,
  YEAR,
  SEMESTERCOUNT,
  EMAIL,
  DEPARTMENT,
  MOBILE,
  MAJOR1,
  MAJOR2,
  SEMESTERITEMID,
  COUNTS,
  POINTS,
  EXTRAPOINTS,
  TITLE,
  ORDER_IDX,
  ITEM_MAX_POINTS,
  AID,
  IS_MULTI,
  CATEGORY_MAX_POINTS,
} from '../../../assets/data/fields';
import FilledButton from 'src/components/Template/FilledButton';
import { styled } from '@mui/styles';
import CategoryForm from 'src/components/modalForm/CategoryForm';
import ModalIconButton from './ModalIconButton';
import ModalTitle from './ModalTitle';
import { before, values } from 'lodash';
import ItemForm from 'src/components/modalForm/GlobalItemForm';
import GlobalItemForm from 'src/components/modalForm/GlobalItemForm';
import SemesterItemForm from 'src/components/modalForm/SemesterItemForm';
import StudentForm from 'src/components/modalForm/StudentForm';
import MileageRegisterForm from 'src/components/modalForm/MileageRegisterForm';
import { STUDENT_ID } from 'src/assets/data/fields';
import StudentsModal from 'src/components/modalForm/StudentsModal';
import ManagerForm from 'src/components/modalForm/ManagerForm';
import SemesterMagicianForm from 'src/components/modalForm/SemesterMagicianForm';
import TypeForm from 'src/components/modalForm/TypeForm';

export const ButtonFlexBox = styled(Box)({
  display: 'flex',
  gap: '10px',
  justifyContent: 'end',
  width: '100%',
});

const modalForm = (modalType, handleClose) => {
  switch (modalType) {
    case ADDTYPE:
      return <TypeForm handleClose={handleClose} />;
    case EDITTYPE:
      return <TypeForm handleClose={handleClose} />;
    case ADDCATEGORY:
      return <CategoryForm handleClose={handleClose} />;
    case EDITCATEGORY:
      return <CategoryForm handleClose={handleClose} />;
    case ADDITEM:
      return <SemesterItemForm handleClose={handleClose} />;
    case EDITITEM:
      return <SemesterItemForm handleClose={handleClose} />;
    case ADDGLOBALITEM:
      return <GlobalItemForm handleClose={handleClose} />;
    case EDITGLOBALITEM:
      return <GlobalItemForm handleClose={handleClose} />;

    case EDITSTUDENT:
      return <StudentForm handleClose={handleClose} />;
    case ADDMILEAGEREGISTER:
      return <MileageRegisterForm handleClose={handleClose} />;
    case EDITMILEAGEREGISTER:
      return <MileageRegisterForm handleClose={handleClose} />;
    case REGISTEREDSTUDENTS:
      return <StudentsModal handleClose={handleClose} />;

    case EDITMANAGER:
      return <ManagerForm handleClose={handleClose} />;
    case MAGICIANSEMESTERITEM:
      return <SemesterMagicianForm handleClose={handleClose} />;
    default:
      return <div>default</div>;
  }
};

export const engToKor = (eng) => {
  switch (eng) {
    case DESCRIPTION:
      return '설명';
    case CATEGORY_MAX_POINTS:
      return '카테고리 최대 포인트';
    case IS_MULTI:
      return '중복 여부';
    case AID:
      return '직번';
    case TITLE:
      return '이름';
    case ORDER_IDX:
      return '우선 순위';
    case CATEGORY:
      return '카테고리';
    case SEMESTER:
      return '학기';
    case ITEM:
      return '항목 이름';
    case MILEAGE:
      return '마일리지';
    case MAX_MAILEAGE:
      return '최대 마일리지';
    case DESCRIPTION1:
      return '설명1';
    case DESCRIPTION2:
      return '설명2';
    case FILE_DESCRIPTION:
      return '파일 설명';
    case ISVISIBLE:
      return '보이기 여부';
    case ISVISIBLE_STUDENT:
      return '학생 보이기';
    case IS_STUDENT_INPUT:
      return '학생 입력';
    case ISDUPLICATE_RECORD:
      return '중복 레코드';
    case ISEVALUATE_CSEE:
      return '전전 평가항목';
    case ISEVALUATE_PORTFOLIO:
      return '포폴 평가항목';
    case ISEVALUATE_FUSION:
      return '융합 평가항목';
    case NAME:
      return '이름';
    case SID:
      return '학번';
    case YEAR:
      return '학년';
    case SEMESTERCOUNT:
      return '학기 수';
    case MOBILE:
      return '휴대폰 번호';
    case EMAIL:
      return '이메일';
    case DEPARTMENT:
      return '학부';
    case MAJOR1:
      return '전공1';
    case MAJOR2:
      return '전공2';
    case SEMESTERITEMID:
      return '학기별 세부 항목 ID';
    case STUDENT_ID:
      return '학생 고유 ID';
    case COUNTS:
      return '등록횟수';
    case POINTS:
      return '계싼된 점수';
    case EXTRAPOINTS:
      return '가산점';
    case DESCRIPTION1:
      return '설명1';
    case DESCRIPTION2:
      return '설명2';
    case ITEM_MAX_POINTS:
      return '항목 최대 포인트';
  }
};

export default function SWModal({ type, beforeData }) {
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);

  const modalType = useSelector((state) => state.modal.modalType);

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const modalMinWidth = (type) => {
    switch (type) {
      case ADDGLOBALITEM:
      case EDITGLOBALITEM:
        return '700px';
      case MAGICIANSEMESTERITEM:
        return '1000px';
      case REGISTEREDSTUDENTS:
        return '1200px';
      default:
        return '500px';
    }
  };

  const style = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: '10px',
    position: 'absolute' as 'absolute',
    maxWidth: modalMinWidth(type),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxHeight: '700px',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 5,
    overflowY: 'scroll',

    width: modalType === REGISTEREDSTUDENTS ? '80%' : '80%',
  };
  return (
    <div>
      <ModalIconButton setOpen={handleOpen} beforeData={beforeData} type={type} />
      <Modal
        key={type + beforeData?.id}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ModalTitle />

          {modalForm(modalType, handleClose)}
          <Typography id="modal-modal-description" sx={{ mt: 2 }}></Typography>
        </Box>
      </Modal>
    </div>
  );
}
