import React, { useState, ReactNode } from 'react';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Box, Chip, Tab, Tabs, TextField, Typography, Stack } from '@mui/material';
import { RootState } from 'src/redux/store';
import axiosInstance from 'src/utils/axios';
import ExcelDataModal from 'src/components/excel/ExcelDataModal';
import CancelButton from '../common/modal/CancelButton';
import SubmitButton from '../common/modal/SubmitButton';
import { DESCRIPTION, EXTRAPOINTS, SEMESTER_ITEM_ID, SID, STUDENT_NAME } from '../../assets/data/fields';
import { ButtonFlexBox, engToKor } from '../common/modal/SWModal';

interface MileageRegisterFormProps {
  handleClose: () => void;
}

interface MileageRegisterFormValues {
  [SEMESTER_ITEM_ID]: string;
  [STUDENT_NAME]: string;
  [SID]: string;
  [EXTRAPOINTS]?: number;
  [DESCRIPTION]?: string;
}

const MileageRegisterSchema = Yup.object().shape({
  [STUDENT_NAME]: Yup.string().required('필수입니다.'),
  [SID]: Yup.string().length(8, '반드시 8자리 여야 합니다.').required('필수입니다.'),
  [EXTRAPOINTS]: Yup.number().integer(),
  [DESCRIPTION]: Yup.string(),
});

const MileageRegisterForm = ({ handleClose }: MileageRegisterFormProps) => {
  const beforeData = useSelector((state: RootState) => state.modal.beforeData);
  const modalType = useSelector((state: RootState) => state.modal.modalType);
  const router = useRouter();

  const handleSubmit = async (
    values: MileageRegisterFormValues,
    { setSubmitting, resetForm }: FormikHelpers<MileageRegisterFormValues>
  ) => {
    const newData = {
      [SEMESTER_ITEM_ID]: beforeData[SEMESTER_ITEM_ID],
      [SID]: values[SID],
      [STUDENT_NAME]: values[STUDENT_NAME],
      [EXTRAPOINTS]: values[EXTRAPOINTS],
      [DESCRIPTION]: values[DESCRIPTION],
    };

    try {
      console.log(newData);
      await axiosInstance.post('/api/mileage/records', newData);
      alert('마일리지 적립 리스트에 추가되었습니다.');
      router.reload();
    } catch {
      alert('마일리지 적립 리스트 추가에 실패했습니다.');
    } finally {
      setSubmitting(false);
      resetForm();
    }
  };

  const [tabIndex, setTabIndex] = useState<number>(0);

  const CustomTabPanel = ({ children, value, index }: { children?: ReactNode; index: number; value: number }) => (
    <div hidden={value !== index} role="tabpanel" id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );

  return (
    <Formik
      initialValues={{
        [SEMESTER_ITEM_ID]: '',
        [STUDENT_NAME]: '',
        [SID]: '',
        [EXTRAPOINTS]: 0,
        [DESCRIPTION]: '',
      }}
      validationSchema={MileageRegisterSchema}
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
          <Stack direction="row" gap={1}>
            <Chip label={`${beforeData?.semester}`} color="primary" variant="outlined" />
            <Chip label={`${beforeData?.categoryName}`} color="primary" variant="outlined" />
            <Chip label={`${beforeData?.itemName}`} color="primary" variant="outlined" />
          </Stack>

          <Tabs value={tabIndex} onChange={(e, index: number) => setTabIndex(index)}>
            <Tab label="건별 등록" />
            <Tab label="엑셀 업로드" />
          </Tabs>

          <CustomTabPanel value={tabIndex} index={0}>
            {[STUDENT_NAME, SID, EXTRAPOINTS, DESCRIPTION].map((field) => (
              <Field
                key={field}
                style={{ minWidth: '300px', paddingBottom: '20px' }}
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
          </CustomTabPanel>
          <CustomTabPanel value={tabIndex} index={1}>
            <ExcelDataModal handleClose={handleClose} />
          </CustomTabPanel>
        </Form>
      )}
    </Formik>
  );
};

export default MileageRegisterForm;
