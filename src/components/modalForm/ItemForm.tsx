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
} from 'src/assets/data/fields';
import { useSelector } from 'react-redux';
import { EDITITEM } from 'src/assets/data/modal/modals';
import CancelButton from '../common/modal/CancelButton';
import SubmitButton from '../common/modal/SubmitButton';

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

export default function ItemForm({ beforeData }) {
  const modalType = useSelector((state) => state.modal.modalType);
  console.log(modalType, beforeData);
  return (
    <Formik
      initialValues={{
        [CATEGORY]: modalType === EDITITEM ? beforeData?.[CATEGORY] : '',
        [SEMESTER]: modalType === EDITITEM ? beforeData?.[SEMESTER] : '',
        [ITEM]: modalType === EDITITEM ? beforeData?.[ITEM] : '',
        [MILEAGE]: modalType === EDITITEM ? beforeData?.[MILEAGE] : 0,
        [MAX_MAILEAGE]: modalType === EDITITEM ? beforeData?.[MAX_MAILEAGE] : 0,
        [DESCRIPTION1]: modalType === EDITITEM ? beforeData?.[DESCRIPTION1] : '',
        [DESCRIPTION2]: modalType === EDITITEM ? beforeData?.[DESCRIPTION2] : '',
        [FILE_DESCRIPTION]: modalType === EDITITEM ? beforeData?.[FILE_DESCRIPTION] : '',
        [ISVISIBLE]: modalType === EDITITEM ? beforeData?.[ISVISIBLE] : false,
        [ISVISIBLE_STUDENT]: modalType === EDITITEM ? beforeData?.[ISVISIBLE_STUDENT] : false,
        [ISINPUT_STUDENT]: modalType === EDITITEM ? beforeData?.[ISINPUT_STUDENT] : false,
        [ISDUPLICATE_RECORD]: modalType === EDITITEM ? beforeData?.[ISDUPLICATE_RECORD] : false,
        [ISEVALUATE_CSEE]: modalType === EDITITEM ? beforeData?.[ISEVALUATE_CSEE] : false,
        [ISEVALUATE_PORTFOLIO]: modalType === EDITITEM ? beforeData?.[ISEVALUATE_PORTFOLIO] : false,
        [ISEVALUATE_FUSION]: modalType === EDITITEM ? beforeData?.[ISEVALUATE_FUSION] : false,
      }}
      // validationSchema={CategorySchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        console.log(values);
        resetForm();
      }}
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
