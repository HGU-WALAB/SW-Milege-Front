import { ErrorMessage, Field, Form, Formik } from 'formik';
import { ButtonFlexBox } from '../common/modal/SWModal';
import {
  TITLE,
  CATEGORY,
  DESCRIPTION,
  MAX_MILEAGE,
  MAX_POINTS,
  NUM,
  ID,
  DESCRIPTION1,
  DESCRIPTION2,
} from 'src/assets/data/fields';
import * as Yup from 'yup';
import Button from '@mui/material/Button';
import { ADDCATEGORY, EDITCATEGORY } from 'src/assets/data/modal/modals';
import { TextField, styled } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { dispatch } from 'src/redux/store';
import { closeModal } from 'src/redux/slices/modal';
import CancelButton from '../common/modal/CancelButton';
import SubmitButton from '../common/modal/SubmitButton';
import axiosInstance from 'src/utils/axios';
import { useRouter } from 'next/router';

export default function CategoryForm({ beforeData }) {
  const modalType = useSelector((state) => state.modal.modalType);
  const router = useRouter();

  const CategorySchema = Yup.object().shape({
    [CATEGORY]: Yup.string().required('필수입니다.'),
    [DESCRIPTION1]: Yup.string(),
    [DESCRIPTION2]: Yup.string(),
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    // 카테고리 추가
    // 1) newData 생성
    // 2) axios post
    // 3) alert
    // 4) reload

    const newData = {
      [TITLE]: values[CATEGORY],
      [DESCRIPTION1]: values[DESCRIPTION1],
      [DESCRIPTION2]: values[DESCRIPTION2],
    };

    switch (modalType) {
      case ADDCATEGORY:
        axiosInstance
          .post('/api/mileage/categories', newData)
          .then((res) => {
            alert('카테고리가 추가되었습니다.');
            router.reload();
          })
          .catch((err) => alert('카테고리 추가에 실패했습니다.'));
        break;

      case EDITCATEGORY:
        axiosInstance
          .patch(`/api/mileage/categories/${beforeData[ID]}`, newData)
          .then((res) => {
            alert('카테고리가 수정되었습니다.');
            router.reload();
          })
          .catch((err) => alert('카테고리 수정에 실패했습니다.'));
        break;
    }
  };

  return (
    <Formik
      initialValues={{
        [CATEGORY]: modalType === EDITCATEGORY ? beforeData?.[CATEGORY] : '',
        [DESCRIPTION1]: modalType === EDITCATEGORY ? beforeData?.[DESCRIPTION1] : '',
        [DESCRIPTION2]: modalType === EDITCATEGORY ? beforeData?.[DESCRIPTION2] : '',
      }}
      validationSchema={CategorySchema}
      onSubmit={handleSubmit}
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

          <Field label="설명1" name={DESCRIPTION1} as={TextField} variant="standard" />
          <ErrorMessage name={DESCRIPTION1} />

          <Field label="설명2" name={DESCRIPTION2} as={TextField} variant="standard" />
          <ErrorMessage name={DESCRIPTION2} />

          <ButtonFlexBox>
            <CancelButton modalType={modalType} />
            <SubmitButton />
          </ButtonFlexBox>
        </Form>
      )}
    </Formik>
  );
}
