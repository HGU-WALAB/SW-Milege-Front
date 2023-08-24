import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FilledInput, IconButton, OutlinedInput, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import {
  closeCategoryModal,
  closeModal,
  openCategoryModal,
  openModal,
} from 'src/redux/slices/modal';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ADDCATEGORY, DELETECATEGORY, EDITCATEGORY } from 'src/assets/data/modal/modals';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { DESCRIPTION, CATEGORY, MAX_MILEAGE } from '../../../assets/data/fields';
import FilledButton from 'src/components/Template/FilledButton';
import { styled } from '@mui/styles';
import CategoryForm from 'src/components/modalForm/CategoryForm';
import ModalIconButton from './ModalIconButton';
import ModalTitle from './ModalTitle';

export const ButtonFlexBox = styled(Box)({
  display: 'flex',
  gap: '10px',
  justifyContent: 'end',
  width: '100%',
});

const style = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderRadius: '10px',
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function SWModal({ type, beforeData }) {
  console.log(beforeData);

  const dispatch = useDispatch();
  const open = useSelector((state) => state.modal.isOpen);
  const modalType = useSelector((state) => state.modal.modalType);

  const handleClose = () => dispatch(closeModal(type));

  return (
    <div>
      <ModalIconButton type={type} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ModalTitle />

          {/* use Formik 
          https://formik.org/docs/api/errormessage
          https://velog.io/@silverbeen/Formik%EC%97%90-%EB%8C%80%ED%95%98%EC%97%AC-%EC%95%8C%EC%95%84%EB%B3%B4%EC%9E%90-feat.-Yup
          https://jeonghwan-kim.github.io/dev/2022/03/29/react-form-and-formik.html#getfieldprops-%EC%9C%A0%ED%8B%B8-%ED%95%A8%EC%88%98-%EC%A0%9C%EA%B3%B5
          */}

          <CategoryForm modalType={modalType} beforeData={beforeData} />
          <Typography id="modal-modal-description" sx={{ mt: 2 }}></Typography>
        </Box>
      </Modal>
    </div>
  );
}
