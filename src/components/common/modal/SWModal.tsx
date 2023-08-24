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

const ButtonFlexBox = styled(Box)({
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

export default function SWModal({ type, beforeData }) {
  console.log(beforeData);
  const CategorySchema = Yup.object().shape({
    [CATEGORY]: Yup.string().required('필수입니다.'),
    [DESCRIPTION]: Yup.string(),
    [MAX_MILEAGE]: Yup.number().integer().required('필수입니다.'),
  });

  const dispatch = useDispatch();
  const open = useSelector((state) => state.modal.isOpen);
  const modalType = useSelector((state) => state.modal.modalType);

  const handleOpen = () => dispatch(openModal(type));
  const handleClose = () => dispatch(closeModal(type));

  return (
    <div>
      <IconButton
        onClick={() => {
          handleOpen();
        }}
      >
        {IconConverter(type)}
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography color="primary" id="modal-modal-title" variant="h6" component="h2">
            {titleConverter(modalType)}
          </Typography>

          {/* use Formik 
          https://formik.org/docs/api/errormessage
          https://velog.io/@silverbeen/Formik%EC%97%90-%EB%8C%80%ED%95%98%EC%97%AC-%EC%95%8C%EC%95%84%EB%B3%B4%EC%9E%90-feat.-Yup
          https://jeonghwan-kim.github.io/dev/2022/03/29/react-form-and-formik.html#getfieldprops-%EC%9C%A0%ED%8B%B8-%ED%95%A8%EC%88%98-%EC%A0%9C%EA%B3%B5
          */}

          <Formik
            initialValues={{
              [CATEGORY]: beforeData ? beforeData.category : '',
              [DESCRIPTION]: beforeData ? beforeData.description : '',
              [MAX_MILEAGE]: beforeData ? beforeData.maxMileage : 0,
            }}
            validationSchema={CategorySchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              console.log(values);
              resetForm();
            }}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: ' center',
                  margin: '30px 0px',

                  padding: '0px 20px',
                  width: '100%',
                  gap: '30px',
                }}
              >
                <Field
                  name={CATEGORY}
                  as={TextField}
                  type="text"
                  label="카테고리"
                  variant="standard"
                />
                <ErrorMessage name={CATEGORY} />
                <Field label="설명" name={DESCRIPTION} as={TextField} variant="standard" />
                <ErrorMessage name={DESCRIPTION} />

                <Field label="최대 마일리지" name={MAX_MILEAGE} as={TextField} variant="standard" />
                <ErrorMessage name={MAX_MILEAGE} disabled={isSubmitting} />
                <ButtonFlexBox>
                  <Button type="submit" variant="outlined" color="primary">
                    취소
                  </Button>
                  <Button type="submit" variant="contained" color="primary">
                    제출
                  </Button>
                </ButtonFlexBox>
              </Form>
            )}
          </Formik>

          <Typography id="modal-modal-description" sx={{ mt: 2 }}></Typography>
        </Box>
      </Modal>
    </div>
  );
}
