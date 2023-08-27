import { ErrorMessage, Field, Form, Formik } from 'formik';
import { ButtonFlexBox } from '../common/modal/SWModal';
import {
  TITLE,
  CATEGORY,
  DESCRIPTION,
  MAX_MILEAGE,
  MAX_POINTS,
  NUM,
  POINT,
  SEMESTER,
  MILEAGE,
} from 'src/assets/data/fields';
import * as Yup from 'yup';
import Button from '@mui/material/Button';
import { ADDCATEGORY, ADDITEM, EDITCATEGORY, EDITITEM } from 'src/assets/data/modal/modals';
import { TextField, styled } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { dispatch } from 'src/redux/store';
import { closeModal } from 'src/redux/slices/modal';
import CancelButton from '../common/modal/CancelButton';
import SubmitButton from '../common/modal/SubmitButton';
import axiosInstance from 'src/utils/axios';
import { useRouter } from 'next/router';

export default function SemesterItemForm({ beforeData }) {
  const modalType = useSelector((state) => state.modal.modalType);
  const router = useRouter();

  const SemesterItemSchema = Yup.object().shape({
    [SEMESTER]: Yup.string().required('필수입니다.'),
    [NUM]: Yup.number().integer().required('필수입니다.'),
    [MILEAGE]: Yup.number().integer().required('필수입니다.'),
    [MAX_MILEAGE]: Yup.number().integer().required('필수입니다.'),
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    // 카테고리 추가
    // 1) newData 생성
    // 2) axios post
    // 3) alert
    // 4) reload

    const newData = {
      itemId: values[NUM],
      points: values[MILEAGE],
      [MAX_POINTS]: values[MAX_MILEAGE],
    };

    switch (modalType) {
      case ADDITEM:
        axiosInstance
          .post(`/api/mileage/semesters/${values[SEMESTER]}/items`, newData)
          .then((res) => {
            alert('학기별 항목이 추가되었습니다.');
            router.reload();
          })
          .catch((err) => alert('학기별 항목 추가에 실패했습니다.'));
        break;

      case EDITITEM:
        axiosInstance
          .patch(`/api/mileage/semesters/${values[SEMESTER]}/items`, newData)
          .then((res) => {
            alert('학기별 항목이 수정되었습니다.');
            router.reload();
          })
          .catch((err) => alert('학기별 항목 수정에 실패했습니다.'));
        break;
    }
  };

  return (
    <Formik
      initialValues={{
        /**
         * semester (쿼리 스트링)
         * itemId
         * points
         * maxPoints
         */
        [SEMESTER]: modalType === EDITITEM ? beforeData?.[SEMESTER] : '',
        [NUM]: modalType === EDITITEM ? beforeData?.[NUM] : 0,
        [MILEAGE]: modalType === EDITITEM ? beforeData?.[MILEAGE] : '',
        [MAX_MILEAGE]: modalType === EDITITEM ? beforeData?.[MAX_MILEAGE] : 0,
      }}
      validationSchema={SemesterItemSchema}
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
            name={SEMESTER}
            as={TextField}
            type="text"
            label="학기"
            variant="standard"
          />
          <ErrorMessage name={SEMESTER} />
          <Field label="글로벌 항목 번호" name={NUM} as={TextField} variant="standard" />
          <ErrorMessage name={NUM} />
          <Field label="마일리지" name={MILEAGE} as={TextField} variant="standard" />
          <ErrorMessage name={MILEAGE} disabled={isSubmitting} />
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
