import { ErrorMessage, Field, Form, Formik } from 'formik';
import { ButtonFlexBox, engToKor } from '../common/modal/SWModal';
import {
  TITLE,
  CATEGORY,
  DESCRIPTION,
  DESCRIPTION2,
  ORDER_IDX,
  ID,
  TYPE,
  CATEGORY_MAX_POINTS,
  NAME,
} from 'src/assets/data/fields';
import * as Yup from 'yup';
import Button from '@mui/material/Button';
import { ADDTYPE, EDITTYPE } from 'src/assets/data/modal/modals';
import { TextField, styled } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { dispatch } from 'src/redux/store';
import { closeModal } from 'src/redux/slices/modal';
import CancelButton from '../common/modal/CancelButton';
import SubmitButton from '../common/modal/SubmitButton';
import axiosInstance from 'src/utils/axios';
import { useRouter } from 'next/router';
import TypeSelect from '../common/Filter/TypeSelect';

export default function TypeForm({ handleClose }) {
  console.log('!!');
  const beforeData = useSelector((state) => state.modal.beforeData);

  const modalType = useSelector((state) => state.modal.modalType);
  const router = useRouter();

  const TypeSchema = Yup.object().shape({
    [NAME]: Yup.string().required('필수입니다.'),
    [DESCRIPTION]: Yup.string(),
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    // 타입 추가
    // 1) newData 생성
    // 2) axios post
    // 3) alert
    // 4) reload

    const newData = {
      [NAME]: values[NAME],
      [DESCRIPTION]: values[DESCRIPTION],
    };
    switch (modalType) {
      case ADDTYPE:
        axiosInstance
          .post('/api/mileage/types', newData)
          .then((res) => {
            alert('타입이 추가되었습니다.');
            router.reload();
          })
          .catch((err) => alert('타입 추가에 실패했습니다.'));
        break;

      case EDITTYPE:
        axiosInstance
          .patch(`/api/mileage/types/${beforeData[ID]}`, newData)

          .then((res) => {
            alert('타입이 수정되었습니다.');
            router.reload();
          })
          .catch((err) => alert('타입 수정에 실패했습니다.'));
        break;
    }
  };

  return (
    <Formik
      initialValues={{
        [NAME]: modalType === EDITTYPE ? beforeData?.[NAME] : '',
        [DESCRIPTION]: modalType === EDITTYPE ? beforeData?.[DESCRIPTION] : '',
      }}
      validationSchema={TypeSchema}
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
          {[NAME, DESCRIPTION].map((field, index) => (
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
