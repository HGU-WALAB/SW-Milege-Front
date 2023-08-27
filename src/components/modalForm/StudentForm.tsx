import { ErrorMessage, Field, Form, Formik } from 'formik';

import {
  Box,
  Button,
  Chip,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  styled,
} from '@mui/material';
import { ButtonFlexBox, engToKor } from '../common/modal/SWModal';
import {
  DESCRIPTION,
  CATEGORY,
  MAX_MILEAGE,
  SEMESTER,
  ITEM,
  MILEAGE,
  DESCRIPTION1,
  DESCRIPTION2,
  FILE_DESCRIPTION,
  ISVISIBLE,
  ISVISIBLE_STUDENT,
  ISINPUT_STUDENT,
  ISDUPLICATE_RECORD,
  ISEVALUATE_CSEE,
  ISEVALUATE_PORTFOLIO,
  ISEVALUATE_FUSION,
  MAX_MAILEAGE,
  NUM,
  NAME,
  MOBILE,
  EMAIL,
  ISAPPROVED,
  DEPARTMENT,
  MAJOR1,
  MAJOR2,
  YEAR,
  SEMESTERCOUNT,
} from 'src/assets/data/fields';
import { useSelector } from 'react-redux';
import {
  ADDGLOBALITEM,
  ADDSTUDENT,
  EDITGLOBALITEM,
  EDITITEM,
  EDITSTUDENT,
} from 'src/assets/data/modal/modals';
import CancelButton from '../common/modal/CancelButton';
import SubmitButton from '../common/modal/SubmitButton';
import axiosInstance from 'src/utils/axios';
import { useRouter } from 'next/router';
import { SID } from '../../assets/data/fields';

const StyleFieldBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: ' center',
  margin: '30px 0px',

  padding: '0px 20px',
  width: '100%',
  gap: '15px',
});

const StyleFieldForm = styled(Form)({
  '@media (max-width: 600px)': {
    scale: '0.8',
    margin: '0px',
  },
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: '30px 0px',

  padding: '0px 20px',
  width: '100%',
  gap: '20px',
});

export default function StudentForm({ beforeData }) {
  const modalType = useSelector((state) => state.modal.modalType);
  console.log(modalType, beforeData);

  const router = useRouter();

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    // 학생 항목 추가
    // 1) newData 생성
    // 2) axios post
    // 3) alert
    // 4) reload

    const newData = {
      [NAME]: values[NAME],
      [SID]: values[SID],
      [MOBILE]: values[MOBILE],
      [EMAIL]: values[EMAIL],
      [ISAPPROVED]: true,
      [DEPARTMENT]: values[DEPARTMENT],
      [MAJOR1]: values[MAJOR1],
      [MAJOR2]: values[MAJOR2],
      [YEAR]: values[YEAR],
      [SEMESTERCOUNT]: values[SEMESTERCOUNT],
    };

    switch (modalType) {
      case ADDSTUDENT:
        axiosInstance
          .post('/api/mileage/students', newData)
          .then((res) => {
            alert('학생이 추가되었습니다.');
            router.reload();
          })
          .catch((err) => {
            console.log(err);
            alert('학생 추가에 실패했습니다.');
          });
        break;

      case EDITSTUDENT:
        axiosInstance
          .patch(`/api/mileage/students/${beforeData[NUM]}`, newData)
          .then((res) => {
            alert(`학생 ${beforeData[NUM]}번이 수정되었습니다.`);
            router.reload();
          })
          .catch((err) => alert('학생 수정에 실패했습니다.'));
        break;
    }
  };
  return (
    <Formik
      initialValues={{
        [CATEGORY]: modalType === EDITGLOBALITEM ? beforeData?.[CATEGORY] : '',
        [SEMESTER]: modalType === EDITGLOBALITEM ? beforeData?.[SEMESTER] : '',
        [ITEM]: modalType === EDITGLOBALITEM ? beforeData?.[ITEM] : '',
        [MILEAGE]: modalType === EDITGLOBALITEM ? beforeData?.[MILEAGE] : 0,
        [MAX_MAILEAGE]: modalType === EDITGLOBALITEM ? beforeData?.[MAX_MAILEAGE] : 0,
        [DESCRIPTION1]: modalType === EDITGLOBALITEM ? beforeData?.[DESCRIPTION1] : '',
        [DESCRIPTION2]: modalType === EDITGLOBALITEM ? beforeData?.[DESCRIPTION2] : '',
        [FILE_DESCRIPTION]: modalType === EDITGLOBALITEM ? beforeData?.[FILE_DESCRIPTION] : '',
        [ISVISIBLE]: modalType === EDITGLOBALITEM ? beforeData?.[ISVISIBLE] : false,
        [ISVISIBLE_STUDENT]: modalType === EDITGLOBALITEM ? beforeData?.[ISVISIBLE_STUDENT] : false,
        [ISINPUT_STUDENT]: modalType === EDITGLOBALITEM ? beforeData?.[ISINPUT_STUDENT] : false,
        [ISDUPLICATE_RECORD]:
          modalType === EDITGLOBALITEM ? beforeData?.[ISDUPLICATE_RECORD] : false,
        [ISEVALUATE_CSEE]: modalType === EDITGLOBALITEM ? beforeData?.[ISEVALUATE_CSEE] : false,
        [ISEVALUATE_PORTFOLIO]:
          modalType === EDITGLOBALITEM ? beforeData?.[ISEVALUATE_PORTFOLIO] : false,
        [ISEVALUATE_FUSION]: modalType === EDITGLOBALITEM ? beforeData?.[ISEVALUATE_FUSION] : false,
      }}
      // validationSchema={CategorySchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, errors, touched }) => (
        <StyleFieldForm>
          <Box sx={{ display: 'flex', width: '100%', gap: '30px' }}>
            <StyleFieldBox>
              {[
                CATEGORY,
                SEMESTER,
                ITEM,
                MILEAGE,
                MAX_MAILEAGE,
                DESCRIPTION1,
                DESCRIPTION2,
                FILE_DESCRIPTION,
              ].map((field: string, index: number) => (
                <Box key={index}>
                  <Field
                    sx={{ width: '300px' }}
                    name={field}
                    as={TextField}
                    type="text"
                    label={engToKor(field)}
                    variant="standard"
                  />
                  <ErrorMessage name={CATEGORY} />
                </Box>
              ))}
            </StyleFieldBox>
            <StyleFieldBox>
              {[
                ISVISIBLE,
                ISVISIBLE_STUDENT,
                ISINPUT_STUDENT,
                ISDUPLICATE_RECORD,
                ISEVALUATE_CSEE,
                ISEVALUATE_PORTFOLIO,
                ISEVALUATE_FUSION,
              ].map((inputName: string, index: number) => (
                <Box key={index} sx={{ display: 'flex', gap: 2 }}>
                  <Chip
                    color="primary"
                    sx={{ px: 1, borderRadius: '10px', height: '40px' }}
                    label={engToKor(inputName)}
                    variant="outlined"
                  />

                  <Field name={inputName}>
                    {({ field, form }) => (
                      <ToggleButtonGroup
                        sx={{ height: '40px' }}
                        color="primary"
                        value={field.value}
                        exclusive
                        onChange={(e, newValue) => form.setFieldValue(inputName, newValue)}
                        aria-label="toggle value"
                      >
                        <ToggleButton value={true} aria-label="true">
                          O
                        </ToggleButton>
                        <ToggleButton value={false} aria-label="false">
                          X
                        </ToggleButton>
                      </ToggleButtonGroup>
                    )}
                  </Field>
                </Box>
              ))}
            </StyleFieldBox>
          </Box>

          <ButtonFlexBox>
            <CancelButton modalType={modalType} />
            <SubmitButton />
          </ButtonFlexBox>
        </StyleFieldForm>
      )}
    </Formik>
  );
}
