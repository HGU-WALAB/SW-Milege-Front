import { ErrorMessage, Field, Form, Formik } from 'formik';
import { ButtonFlexBox, engToKor } from '../common/modal/SWModal';
import {
  TITLE,
  CATEGORY,
  DESCRIPTION,
  MAX_POINTS,
  NUM,
  POINT,
  SEMESTER,
  MILEAGE,
  ITEM_MAX_POINTS,
  SEMESTERITEMID,
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
import SemesterSelect from '../common/Select/SemesterSelect';
import GlobalItemSelect from '../common/Select/GlobalItemSelect';
export default function SemesterItemForm({ handleClose }) {
  const beforeData = useSelector((state) => state.modal.beforeData);
  const modalType = useSelector((state) => state.modal.modalType);
  const router = useRouter();

  const SemesterItemSchema = Yup.object().shape({
    [SEMESTER]: Yup.string().required('필수입니다.'),
    itemId: Yup.number().integer().required('필수입니다.'),
    [MILEAGE]: Yup.number().integer(),
    [ITEM_MAX_POINTS]: Yup.number().integer(),
  });

  console.log('Dddd', beforeData);

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    // 카테고리 추가
    // 1) newData 생성
    // 2) axios post
    // 3) alert
    // 4) reload

    const newData = {
      itemId: values.itemId,
      points: values[MILEAGE],
      semesterName: values[SEMESTER],
      [ITEM_MAX_POINTS]: +values[ITEM_MAX_POINTS],
    };

    console.log('ss', newData);

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
          .patch(`/api/mileage/semesters/${beforeData[SEMESTERITEMID]}`, newData)
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
        itemId: modalType === EDITITEM ? beforeData?.itemId : 0,
        [MILEAGE]: modalType === EDITITEM ? beforeData?.[MILEAGE] : 0,
        [ITEM_MAX_POINTS]: modalType === EDITITEM ? beforeData?.[ITEM_MAX_POINTS] : 0,
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
          <SemesterSelect />
          {/* <Field
            style={{ minWidth: '300px' }}
            name={SEMESTER}
            as={TextField}
            type="text"
            label="학기"
            variant="standard"
          /> */}

          {/* <Field label="글로벌 항목 번호" name={NUM} as={TextField} variant="standard" /> */}

          <GlobalItemSelect itemId={beforeData?.itemId} />
          {[MILEAGE, ITEM_MAX_POINTS].map((field, index) => (
            <Field
              label={engToKor(field)}
              name={field}
              as={TextField}
              variant="outlined"
              error={errors[field] && touched[field] ? true : false}
              helperText={<ErrorMessage name={field} />}
            />
          ))}
          {/* <Field label="마일리지" name={MILEAGE} as={TextField} variant="standard" />
          <ErrorMessage name={MILEAGE} disabled={isSubmitting} />
          <Field label="최대 마일리지" name={ITEM_MAX_POINTS} as={TextField} variant="standard" />
          <ErrorMessage name={ITEM_MAX_POINTS} disabled={isSubmitting} /> */}
          <ButtonFlexBox>
            <CancelButton modalType={modalType} handleClose={handleClose} />
            <SubmitButton />
          </ButtonFlexBox>
        </Form>
      )}
    </Formik>
  );
}
