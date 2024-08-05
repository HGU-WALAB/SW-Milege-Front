import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { ButtonFlexBox, engToKor } from '../common/modal/SWModal';
import { DESCRIPTION, ID, NAME } from 'src/assets/data/fields';
import * as Yup from 'yup';
import { ADDTYPE, EDITTYPE } from 'src/assets/data/modal/modals';
import { TextField, styled } from '@mui/material';
import { useSelector } from 'react-redux';
import CancelButton from '../common/modal/CancelButton';
import SubmitButton from '../common/modal/SubmitButton';
import axiosInstance from 'src/utils/axios';
import { useRouter } from 'next/router';
import { RootState } from 'src/redux/store';

interface TypeFormValues {
  [NAME]: string;
  [DESCRIPTION]: string;
}

export default function TypeForm({ handleClose }) {
  const beforeData = useSelector((state: RootState) => state.modal.beforeData);
  const modalType = useSelector((state: RootState) => state.modal.modalType);
  const router = useRouter();

  const TypeSchema = Yup.object().shape({
    [NAME]: Yup.string().required('필수입니다.'),
    [DESCRIPTION]: Yup.string(),
  });

  const handleSubmit = (
    values: TypeFormValues,
    { setSubmitting, resetForm }: FormikHelpers<TypeFormValues>
  ) => {
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
    <Formik<TypeFormValues>
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
            alignItems: 'center',
            margin: '30px 0px',
            padding: '0px 20px',
            width: '100%',
            gap: '30px',
          }}
        >
          {[NAME, DESCRIPTION].map((field, index) => (
            <div key={index}>
              <Field
                style={{ minWidth: '300px' }}
                name={field}
                as={TextField}
                type="text"
                label={engToKor(field)}
                variant="outlined"
                error={errors[field] && touched[field] ? true : false}
                helperText={<ErrorMessage name={field} />}
              />
            </div>
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
