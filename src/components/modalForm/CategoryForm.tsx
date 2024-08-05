import { ErrorMessage, Field, Form, Formik } from 'formik';
import { CATEGORY_MAX_POINTS, DESCRIPTION, ID, TITLE } from 'src/assets/data/fields';
import * as Yup from 'yup';
import { ADDCATEGORY, EDITCATEGORY } from 'src/assets/data/modal/modals';
import { TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import axiosInstance from 'src/utils/axios';
import { useRouter } from 'next/router';
import { ButtonFlexBox, engToKor } from '../common/modal/SWModal';
import SubmitButton from '../common/modal/SubmitButton';
import CancelButton from '../common/modal/CancelButton';
import { IListCategory } from 'src/pages/mileage/category';
import { RootState } from 'src/redux/store';

export default function CategoryForm({ handleClose }) {
  const beforeData: IListCategory = useSelector((state: RootState) => state.modal.beforeData);
  const modalType = useSelector((state: RootState) => state.modal.modalType);
  const router = useRouter();

  const CategorySchema = Yup.object().shape({
    [TITLE]: Yup.string().required('필수입니다.'),
  });

  const handleSubmit = (values: object) => {
    // 카테고리 추가
    // 1) newData 생성
    // 2) axios post
    // 3) alert
    // 4) reload

    const newData = {
      [TITLE]: values[TITLE],
      [CATEGORY_MAX_POINTS]: values[CATEGORY_MAX_POINTS],
      [DESCRIPTION]: values[DESCRIPTION],
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
      default:
    }
  };

  return (
    <Formik
      initialValues={{
        [TITLE]: beforeData?.name,
        [CATEGORY_MAX_POINTS]: beforeData?.maxPoints,
        [DESCRIPTION]: beforeData?.description,
      }}
      validationSchema={CategorySchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
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
          {[TITLE, CATEGORY_MAX_POINTS, DESCRIPTION].map((field, index) => (
            <Field
              key={index}
              style={{ minWidth: '300px' }}
              name={field}
              as={TextField}
              type="text"
              label={engToKor(field)}
              variant="outlined"
              error={!!(errors[field] && touched[field])}
              helperText={<ErrorMessage name={field} />}
            />
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
