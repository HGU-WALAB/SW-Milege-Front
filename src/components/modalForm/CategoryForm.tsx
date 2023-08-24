import { ErrorMessage, Field, Form, Formik } from 'formik';
import { ButtonFlexBox } from '../common/modal/SWModal';
import { CATEGORY, DESCRIPTION, MAX_MILEAGE } from 'src/assets/data/fields';
import * as Yup from 'yup';
import Button from '@mui/material/Button';
import { EDITCATEGORY } from 'src/assets/data/modal/modals';
import { TextField, styled } from '@mui/material';
import { useSelector } from 'react-redux';

export default function CategoryForm({ beforeData }) {
  const modalType = useSelector((state) => state.modal.modalType);
  const CategorySchema = Yup.object().shape({
    [CATEGORY]: Yup.string().required('필수입니다.'),
    [DESCRIPTION]: Yup.string(),
    [MAX_MILEAGE]: Yup.number().integer().required('필수입니다.'),
  });

  console.log('전달', beforeData, modalType);

  return (
    <Formik
      initialValues={{
        [CATEGORY]: modalType === EDITCATEGORY ? beforeData?.[CATEGORY] : '',
        [DESCRIPTION]: modalType === EDITCATEGORY ? beforeData?.[DESCRIPTION] : '',
        [MAX_MILEAGE]: modalType === EDITCATEGORY ? beforeData?.[MAX_MILEAGE] : 0,
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
            style={{ minWidth: '300px' }}
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
  );
}
