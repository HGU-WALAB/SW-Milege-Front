import { ErrorMessage, Field, Form, Formik } from 'formik';
import { ButtonFlexBox } from '../common/modal/SWModal';
import { TITLE, CATEGORY, DESCRIPTION, MAX_MILEAGE, MAX_POINTS, NUM } from 'src/assets/data/fields';
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
    [DESCRIPTION]: Yup.string(),
    [MAX_MILEAGE]: Yup.number().integer().required('필수입니다.'),
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    // 카테고리 추가
    // 1) newData 생성
    // 2) axios post
    // 3) alert
    // 4) reload

    const newData = {
      [TITLE]: values[CATEGORY],
      [DESCRIPTION]: values[DESCRIPTION],
      [MAX_POINTS]: values[MAX_MILEAGE],
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
          .patch(`/api/mileage/categories/${beforeData[NUM]}`, newData)
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
        [DESCRIPTION]: modalType === EDITCATEGORY ? beforeData?.[DESCRIPTION] : '',
        [MAX_MILEAGE]: modalType === EDITCATEGORY ? beforeData?.[MAX_MILEAGE] : 0,
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
          <Field label="설명" name={DESCRIPTION} as={TextField} variant="standard" />
          <ErrorMessage name={DESCRIPTION} />

          <Field label="최대 마일리지" name={MAX_MILEAGE} as={TextField} variant="standard" />
          <ErrorMessage name={MAX_MILEAGE} disabled={isSubmitting} />
          <ButtonFlexBox>
            <CancelButton modalType={modalType} />
            <SubmitButton />
          </ButtonFlexBox>
        </Form>
      )}
    </Formik>
  );
}
