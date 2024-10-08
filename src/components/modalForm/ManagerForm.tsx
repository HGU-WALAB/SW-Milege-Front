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
import * as Yup from 'yup';
import { ButtonFlexBox, engToKor } from '../common/modal/SWModal';
import {
  CATEGORY,
  MAX_MILEAGE,
  SEMESTER,
  ITEM,
  MILEAGE,
  DESCRIPTION,
  FILE_DESCRIPTION,
  ISVISIBLE,
  ISVISIBLE_STUDENT,
  IS_STUDENT_INPUT,
  ISDUPLICATE_RECORD,
  ISEVALUATE_CSEE_GENERAL,
  ISEVALUATE_CSEE_SPECIAL,
  ISEVALUATE_ICT_CONVERGENCE,
  MAX_MAILEAGE,
  NUM,
  NAME,
  MOBILE,
  ISAPPROVED,
  MAJOR1,
  MAJOR2,
  YEAR,
  SEMESTERCOUNT,
  ID,
  LEVEL,
} from 'src/assets/data/fields';
import { useSelector } from 'react-redux';
import {
  ADDGLOBALITEM,
  ADDMANAGER,
  ADDSTUDENT,
  EDITGLOBALITEM,
  EDITITEM,
  EDITMANAGER,
  EDITSTUDENT,
} from 'src/assets/data/modal/modals';
import CancelButton from '../common/modal/CancelButton';
import SubmitButton from '../common/modal/SubmitButton';
import axiosInstance from 'src/utils/axios';
import { useRouter } from 'next/router';
import { AID } from '../../assets/data/fields';
import LevelSelect from '../common/Filter/LevelSelect';

export default function ManagerForm({ handleClose }) {
  const beforeData = useSelector((state) => state.modal.beforeData);
  const modalType = useSelector((state) => state.modal.modalType);
  const level = useSelector((state) => state.filter.level);

  const router = useRouter();

  const StudentSchema = Yup.object().shape({
    [NAME]: Yup.string().required('필수입니다.'),
    [AID]: Yup.string().required('필수입니다.'),
    [LEVEL]: Yup.number().required('필수입니다.'),
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    // 학생 항목 추가
    // 1) newData 생성
    // 2) axios post
    // 3) alert
    // 4) reload

    const newData = {
      [NAME]: values[NAME],
      [AID]: values[AID],
      [LEVEL]: values[LEVEL],
    };

    switch (modalType) {
      case ADDMANAGER:
        axiosInstance
          .post('/api/mileage/admins', newData)
          .then((res) => {
            alert('관리자가 추가되었습니다.');
            router.reload();
          })
          .catch((err) => {
            alert('관리자 추가에 실패했습니다.');
          });
        break;

      case EDITMANAGER:
        axiosInstance
          .patch(`/api/mileage/admins/${beforeData[ID]}`, newData)
          .then((res) => {
            alert(`관리자 ${beforeData[NAME]}가 수정되었습니다.`);
            router.reload();
          })
          .catch((err) => alert('관리자 수정에 실패했습니다.'));
        break;
    }
  };
  return (
    <Formik
      initialValues={{
        [NAME]: modalType === EDITMANAGER ? beforeData?.[NAME] : '',
        [AID]: modalType === EDITMANAGER ? beforeData?.[AID] : '',
        [LEVEL]: modalType === EDITMANAGER ? beforeData?.[LEVEL] : '',
      }}
      validationSchema={StudentSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, errors, touched }) => (
        <StyleFieldForm>
          <Box sx={{ display: 'flex', width: '100%', gap: '30px' }}>
            <StyleFieldBox>
              {[NAME, AID].map((field: string, index: number) => (
                <Box key={index} sx={{ width: '100%' }}>
                  <Field
                    disabled={modalType === EDITMANAGER ? true : false}
                    name={field}
                    as={TextField}
                    type="text"
                    label={engToKor(field)}
                    variant="outlined"
                    error={errors[field] && touched[field] ? true : false}
                    helperText={<ErrorMessage name={field} />}
                  />
                </Box>
              ))}
              <LevelSelect />
            </StyleFieldBox>
          </Box>

          <ButtonFlexBox>
            <CancelButton modalType={modalType} handleClose={handleClose} />
            <SubmitButton />
          </ButtonFlexBox>
        </StyleFieldForm>
      )}
    </Formik>
  );
}

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
