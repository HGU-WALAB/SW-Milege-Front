import { ErrorMessage, Field, Form, Formik } from 'formik';
import { ButtonFlexBox, engToKor } from '../common/modal/SWModal';
import {
  TITLE,
  CATEGORY,
  DESCRIPTION1,
  ORDER_IDX,
  ID,
  TYPE,
  CATEGORY_MAX_POINTS,
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
import TypeSelect from '../common/Filter/TypeSelect';

export default function CategoryForm({ handleClose }) {
  const beforeData = useSelector((state) => state.modal.beforeData);

  const modalType = useSelector((state) => state.modal.modalType);
  const router = useRouter();

  const CategorySchema = Yup.object().shape({
    [TITLE]: Yup.string().required('필수입니다.'),
    [TYPE]: Yup.string().required('필수입니다.'),
    [CATEGORY_MAX_POINTS]: Yup.number().required('필수입니다.'),
    [DESCRIPTION1]: Yup.string(),
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    // 카테고리 추가
    // 1) newData 생성
    // 2) axios post
    // 3) alert
    // 4) reload

    const newData = {
      [TITLE]: values[TITLE],
      [TYPE]: values[TYPE],
      [CATEGORY_MAX_POINTS]: values[CATEGORY_MAX_POINTS],
      [DESCRIPTION1]: values[DESCRIPTION1],
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
        [TITLE]: modalType === EDITCATEGORY ? beforeData?.[TITLE] : '',
        [TYPE]: modalType === EDITCATEGORY ? beforeData?.[TYPE] : '없음',
        [CATEGORY_MAX_POINTS]: modalType === EDITCATEGORY ? beforeData?.[CATEGORY_MAX_POINTS] : 0,
        [DESCRIPTION1]: modalType === EDITCATEGORY ? beforeData?.[DESCRIPTION1] : '',
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
          <TypeSelect />
          {[TITLE, CATEGORY_MAX_POINTS, DESCRIPTION1].map((field, index) => (
            <>
              <Field
                key={index}
                style={{ minWidth: '300px' }}
                name={field}
                as={TextField}
                type="text"
                label={engToKor(field)}
                variant="outlined"
                error={errors[field] && touched[field] ? true : false}
                helperText={<ErrorMessage name={field} />}
              />
            </>
          ))}
          <ButtonFlexBox>
            <CancelButton modalType={modalType} handleClose={handleClose} />
            <SubmitButton />
          </ButtonFlexBox>
        </Form>
      )}
    </Formik>
  );
}
