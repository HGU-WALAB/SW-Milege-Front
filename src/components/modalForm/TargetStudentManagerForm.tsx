import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Box, Button, styled } from '@mui/material';
import * as Yup from 'yup';
import { ButtonFlexBox } from '../common/modal/SWModal';
import { DEPARTMENT, MAJOR1, MAJOR2, GRADE, ID, NAME } from 'src/assets/data/fields';
import { useSelector } from 'react-redux';
import { ADDSTUDENT, EDITSTUDENT } from 'src/assets/data/modal/modals';
import CancelButton from '../common/modal/CancelButton';
import SubmitButton from '../common/modal/SubmitButton';
import axiosInstance from 'src/utils/axios';
import { useRouter } from 'next/router';
import DepartmentSelect from '../common/Select/DepartmentSelect';
import MajorSelect from '../common/Select/MajorSelect';
import GradeSelect from '../common/Select/GradeSelect';
import { RootState } from 'src/redux/store';

export default function TargetStudentManagerForm({ handleClose }) {
  const beforeData = useSelector((state: RootState) => state.modal.beforeData);
  const modalType = useSelector((state: RootState) => state.modal.modalType);
  const router = useRouter();

  const StudentSchema = Yup.object().shape({
    [NAME]: Yup.string().required('필수입니다.'),
    [DEPARTMENT]: Yup.string(),
    [MAJOR1]: Yup.string(),
    [MAJOR2]: Yup.string(),
    [GRADE]: Yup.number(),
  });

  const handleSubmit = (values) => {
    const newData = {
      [DEPARTMENT]: values[DEPARTMENT],
      [MAJOR1]: values[MAJOR1],
      [MAJOR2]: values[MAJOR2],
      [GRADE]: values[GRADE],
    };

    switch (modalType) {
      case ADDSTUDENT:
        axiosInstance
          .post('/api/mileage/students', newData)
          .then(() => {
            alert('0000-00 학기 대상이 설정되었습니다.');
            router.reload();
          })
          .catch((err) => {
            console.log(err);
            alert('대상 설정에 실패했습니다.');
          });
        break;

      case EDITSTUDENT:
        axiosInstance
          .patch(`/api/mileage/students/${beforeData[ID]}`, newData)
          .then(() => {
            alert(`${beforeData[NAME]} 학부생이 수정되었습니다.`);
            router.reload();
          })
          .catch(() => alert('학생 수정에 실패했습니다.'));
        break;
    }
  };

  return (
    <Formik
      initialValues={{
        [DEPARTMENT]: modalType === EDITSTUDENT ? beforeData?.[DEPARTMENT] : '',
        [MAJOR1]: modalType === EDITSTUDENT ? beforeData?.[MAJOR1] : '',
        [MAJOR2]: modalType === EDITSTUDENT ? beforeData?.[MAJOR2] : '',
        [GRADE]: modalType === EDITSTUDENT ? beforeData?.[GRADE] : '',
      }}
      validationSchema={StudentSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <StyledForm>
          <Box sx={{ display: 'flex', width: '100%', gap: '20px' }}>
            <StyledFieldBox>
              <GradeSelect />
              <DepartmentSelect />
              <MajorSelect name={MAJOR1} />
              <MajorSelect name={MAJOR2} />
            </StyledFieldBox>
          </Box>

          <ButtonFlexBox>
            <CancelButton modalType={modalType} handleClose={handleClose} />
            <SubmitButton />
          </ButtonFlexBox>
        </StyledForm>
      )}
    </Formik>
  );
}

const StyledFieldBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  margin: '20px 0px',
  padding: '0px 20px',
  width: '100%',
  gap: '20px',
});

const StyledForm = styled(Form)({
  '@media (max-width: 600px)': {
    scale: '0.9',
    margin: '0px',
  },
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: '20px 0px',
  padding: '0px 20px',
  width: '100%',
  gap: '20px',
});
