import { useRouter } from 'next/router';
import { ErrorMessage, Field, Form, Formik, useFormikContext } from 'formik';
import {
  IS_MULTI,
  ITEM_MAX_POINTS,
  MILEAGE,
  SEMESTER,
  SEMESTERITEMID,
  SPECIFIC_ITEM_NAME,
} from 'src/assets/data/fields';
import * as Yup from 'yup';
import { ADDITEM, EDITITEM } from 'src/assets/data/modal/modals';
import { Box, Chip, TextField, ToggleButton, ToggleButtonGroup, styled } from '@mui/material';
import { useSelector } from 'react-redux';
import axiosInstance from 'src/utils/axios';
import CancelButton from '../common/modal/CancelButton';
import SubmitButton from '../common/modal/SubmitButton';
import { ButtonFlexBox, engToKor } from '../common/modal/SWModal';
import SemesterSelect from '../common/Select/SemesterSelect';
import GlobalItemSelect from '../common/Select/GlobalItemSelect';
import React from 'react';

export default function SemesterItemForm({ handleClose }) {
  const beforeData = useSelector((state) => state.modal.beforeData);
  const modalType = useSelector((state) => state.modal.modalType);

  const router = useRouter();

  const SemesterItemSchema = Yup.object().shape({
    [SEMESTER]: Yup.string().required('필수입니다.'),
    itemId: Yup.number().integer().required('필수입니다.'),
    [MILEAGE]: Yup.number().integer(),
    [ITEM_MAX_POINTS]: Yup.number().integer(),
    [IS_MULTI]: Yup.boolean(),
  });

  const handleSubmit = (values) => {
    const newData = {
      itemId: values.itemId,
      points: values[MILEAGE],
      name: values[SPECIFIC_ITEM_NAME],
      itemMaxPoints: +values[ITEM_MAX_POINTS],
    };

    const actionUrl =
      modalType === ADDITEM
        ? `/api/mileage/semesters/${values[SEMESTER]}/items`
        : `/api/mileage/semesters/${beforeData[SEMESTERITEMID]}`;
    const axiosMethod = modalType === ADDITEM ? axiosInstance.post : axiosInstance.patch;

    axiosMethod(actionUrl, newData)
      .then(() => {
        alert(`학기별 항목이 ${modalType === ADDITEM ? '추가' : '수정'}되었습니다.`);
        router.reload();
      })
      .catch(() => alert(`학기별 항목 ${modalType === ADDITEM ? '추가' : '수정'}에 실패했습니다.`));
  };

  return (
    <Formik
      initialValues={{ [SPECIFIC_ITEM_NAME]: '', [MILEAGE]: '', [ITEM_MAX_POINTS]: '' }}
      validationSchema={SemesterItemSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, errors, touched }) => (
        <StyleFieldForm>
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
            <SemesterSelect />
            <GlobalItemSelect itemId={beforeData?.itemId} />

            <Field
              as={TextField}
              name={SPECIFIC_ITEM_NAME}
              label={engToKor(SPECIFIC_ITEM_NAME)}
              variant="outlined"
              fullWidth
              required
              error={errors[SPECIFIC_ITEM_NAME] && touched[SPECIFIC_ITEM_NAME]}
              helperText={
                errors[SPECIFIC_ITEM_NAME] && touched[SPECIFIC_ITEM_NAME]
                  ? errors[SPECIFIC_ITEM_NAME]
                  : ''
              }
            />
            <Field
              as={TextField}
              name={MILEAGE}
              label={engToKor(MILEAGE)}
              variant="outlined"
              fullWidth
              error={errors[MILEAGE] && touched[MILEAGE]}
              helperText={errors[MILEAGE] && touched[MILEAGE] ? errors[MILEAGE] : ''}
            />
            <Field
              as={TextField}
              name={ITEM_MAX_POINTS}
              label={engToKor(ITEM_MAX_POINTS)}
              variant="outlined"
              fullWidth
              error={errors[ITEM_MAX_POINTS] && touched[ITEM_MAX_POINTS]}
              helperText={
                errors[ITEM_MAX_POINTS] && touched[ITEM_MAX_POINTS] ? errors[ITEM_MAX_POINTS] : ''
              }
            />

<Field
              
                name={IS_MULTI}
                label={engToKor(IS_MULTI)}
                variant="outlined"
                fullWidth
                error={errors[IS_MULTI] && touched[IS_MULTI]}
                helperText={errors[IS_MULTI] && touched[IS_MULTI] ? errors[IS_MULTI] : ''}
                // disabled={modalType === EDITITEM}
>
            <StyleFieldBox>

            <ToggleButtonGroup
                    sx={{ height: '40px', width: '100%' }}
                    color="primary"
                   value={}
                    exclusive
                    aria-label="toggle value"
                    disabled={true}
                  >
                    <ToggleButton
                      value={true}
                      aria-label="true"
                      sx={{
                        width: '100%',
                      }}
                    >
                      O
                    </ToggleButton>
                    <ToggleButton
                      value={false}
                      aria-label="false"
                      sx={{
                        width: '100%',
                      }}
                    >
                      X
                    </ToggleButton>
                  </ToggleButtonGroup>
            </StyleFieldBox>
            </Field>
            <ButtonFlexBox>
              <CancelButton modalType={modalType} handleClose={handleClose} />
              <SubmitButton />
            </ButtonFlexBox>
          </Form>
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
