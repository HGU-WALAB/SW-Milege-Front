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
import { ADDCATEGORY, DELETECATEGORY, EDITCATEGORY, EDITITEM } from 'src/assets/data/modal/modals';
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
  ISINPUT_STUDENT,
  ISDUPLICATE_RECORD,
  ISEVALUATE_CSEE,
  ISEVALUATE_PORTFOLIO,
  ISEVALUATE_FUSION,
  MAX_MAILEAGE,
} from '../../../assets/data/fields';
import FilledButton from 'src/components/Template/FilledButton';
import { styled } from '@mui/styles';
import CategoryForm from 'src/components/modalForm/CategoryForm';
import ModalIconButton from './ModalIconButton';
import ModalTitle from './ModalTitle';
import { values } from 'lodash';

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
  maxHeight: '700px',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 2,
};

const engToKor = (eng) => {
  switch (eng) {
    case CATEGORY:
      return '카테고리';
    case SEMESTER:
      return '학기';
    case ITEM:
      return '항목';
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
    case ISINPUT_STUDENT:
      return '학생 입력';
    case ISDUPLICATE_RECORD:
      return '중복 레코드';
    case ISEVALUATE_CSEE:
      return '전전 평가항목';
    case ISEVALUATE_PORTFOLIO:
      return '포폴 평가항목';
    case ISEVALUATE_FUSION:
      return '융합 평가항목';
  }
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

          <Formik
            initialValues={{
              [CATEGORY]: modalType === EDITITEM ? beforeData?.[CATEGORY] : '',
              [SEMESTER]: modalType === EDITITEM ? beforeData?.[SEMESTER] : '',
              [ITEM]: modalType === EDITITEM ? beforeData?.[ITEM] : '',
              [MILEAGE]: modalType === EDITITEM ? beforeData?.[MILEAGE] : 0,
              [MAX_MAILEAGE]: modalType === EDITITEM ? beforeData?.[MAX_MAILEAGE] : 0,
              [DESCRIPTION1]: modalType === EDITITEM ? beforeData?.[DESCRIPTION1] : '',
              [DESCRIPTION2]: modalType === EDITITEM ? beforeData?.[DESCRIPTION2] : '',
              [FILE_DESCRIPTION]: modalType === EDITITEM ? beforeData?.[FILE_DESCRIPTION] : '',
              [ISVISIBLE]: modalType === EDITITEM ? beforeData?.[ISVISIBLE] : false,
              [ISVISIBLE_STUDENT]: modalType === EDITITEM ? beforeData?.[ISVISIBLE_STUDENT] : false,
              [ISINPUT_STUDENT]: modalType === EDITITEM ? beforeData?.[ISINPUT_STUDENT] : false,
              [ISDUPLICATE_RECORD]:
                modalType === EDITITEM ? beforeData?.[ISDUPLICATE_RECORD] : false,
              [ISEVALUATE_CSEE]: modalType === EDITITEM ? beforeData?.[ISEVALUATE_CSEE] : false,
              [ISEVALUATE_PORTFOLIO]:
                modalType === EDITITEM ? beforeData?.[ISEVALUATE_PORTFOLIO] : false,
              [ISEVALUATE_FUSION]: modalType === EDITITEM ? beforeData?.[ISEVALUATE_FUSION] : false,
            }}
            // validationSchema={CategorySchema}
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
                  gap: '20px',
                }}
              >
                <Box sx={{ display: 'flex', width: '100%', gap: '30px' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: ' center',
                      margin: '30px 0px',

                      padding: '0px 20px',
                      width: '100%',
                      gap: '15px',
                    }}
                  >
                    {[
                      CATEGORY,
                      SEMESTER,
                      ITEM,
                      MILEAGE,
                      MAX_MAILEAGE,
                      DESCRIPTION1,
                      DESCRIPTION2,
                      FILE_DESCRIPTION,
                    ].map((field: string, index: number) => (
                      <Box key={index}>
                        <Field
                          sx={{ width: '300px' }}
                          name={field}
                          as={TextField}
                          type="text"
                          label={field}
                          variant="standard"
                        />
                        <ErrorMessage name={CATEGORY} />
                      </Box>
                    ))}
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: ' center',
                      margin: '30px 0px',

                      padding: '0px 20px',
                      width: '100%',
                      gap: '20px',
                    }}
                  >
                    {[
                      ISVISIBLE,
                      ISVISIBLE_STUDENT,
                      ISINPUT_STUDENT,
                      ISDUPLICATE_RECORD,
                      ISEVALUATE_CSEE,
                      ISEVALUATE_PORTFOLIO,
                      ISEVALUATE_FUSION,
                    ].map((inputName: string, index: number) => (
                      <Box key={index} sx={{ display: 'flex', gap: 2 }}>
                        {/* <Field
                          name={field}
                          // as={TextField}
                          component={Switch}
                          type=""
                          label={field}
                          variant="standard"
                        />
                        <ErrorMessage name={CATEGORY} /> */}
                        <Chip
                          color="primary"
                          sx={{ mb: 1, px: 1 }}
                          label={inputName}
                          variant="outlined"
                        />

                        <Field name={inputName}>
                          {({ field, form }) => (
                            <ToggleButtonGroup
                              sx={{ height: '40px' }}
                              color="primary"
                              value={field.value}
                              exclusive
                              onChange={(e, newValue) => form.setFieldValue(inputName, newValue)}
                              aria-label="toggle value"
                            >
                              <ToggleButton value="true" aria-label="true">
                                O
                              </ToggleButton>
                              <ToggleButton value="false" aria-label="false">
                                X
                              </ToggleButton>
                            </ToggleButtonGroup>
                          )}
                        </Field>
                      </Box>
                    ))}
                  </Box>
                </Box>

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

          {/* <CategoryForm modalType={modalType} beforeData={beforeData} /> */}
          <Typography id="modal-modal-description" sx={{ mt: 2 }}></Typography>
        </Box>
      </Modal>
    </div>
  );
}
