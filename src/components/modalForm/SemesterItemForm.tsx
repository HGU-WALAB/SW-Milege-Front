import { useRouter } from 'next/router';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import {
  IS_MULTI,
  POINT,
  ITEM_MAX_POINTS,
  MILEAGE,
  SEMESTER,
  SEMESTERITEMID,
  SPECIFIC_ITEM_NAME,
} from 'src/assets/data/fields';
import * as Yup from 'yup';
import { ADDITEM, EDITITEM } from 'src/assets/data/modal/modals';
import { Box, Chip, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useSelector } from 'react-redux';
import axiosInstance from 'src/utils/axios';
import CancelButton from '../common/modal/CancelButton';
import SubmitButton from '../common/modal/SubmitButton';
import { ButtonFlexBox, engToKor } from '../common/modal/SWModal';
import SemesterSelect from '../common/Select/SemesterSelect';
import GlobalItemSelect from '../common/Select/GlobalItemSelect';
import React, { useEffect, useState, useRef } from 'react';
import { be } from 'date-fns/locale';

export default function SemesterItemForm({ handleClose }) {
  const beforeData = useSelector((state) => state.modal.beforeData);
  const modalType = useSelector((state) => state.modal.modalType);
  const selectedItemList = useSelector((state) => state.filterList.selectedItemList);
  const router = useRouter();
  const formikRef = useRef();
  const [isInitialMount, setIsInitialMount] = useState(true);

  const SemesterItemSchema = Yup.object().shape({
    [SEMESTER]: Yup.string().required('필수입니다.'),
    itemId: Yup.number().integer().required('필수입니다.'),
    [MILEAGE]: Yup.number().integer(),
    [ITEM_MAX_POINTS]: Yup.number().integer(),
    [IS_MULTI]: Yup.boolean(),
  });

  const handleSubmit = (values: object) => {
    // 카테고리 추가
    // 1) newData 생성
    // 2) axios post
    // 3) alert
    // 4) reload
    const newData = {
      itemId: values.itemId,
      points: values[MILEAGE],
      name: values[SPECIFIC_ITEM_NAME],
      itemMaxPoints: +values[ITEM_MAX_POINTS],
    };

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
      default:
    }
  };

  useEffect(() => {
    if (isInitialMount && modalType !== EDITITEM) {
      setIsInitialMount(false);
    } else if (formikRef.current) {
      formikRef.current.setFieldValue(MILEAGE, selectedItemList?.mileage || 0);
      formikRef.current.setFieldValue(ITEM_MAX_POINTS, selectedItemList?.itemMaxPoints || 0);
      formikRef.current.setFieldValue(IS_MULTI, selectedItemList?.isDuplicable || false);
    }
  }, [selectedItemList]);

  return (
    <Formik
      innerRef={formikRef}
      initialValues={{
        /**
         * semester (쿼리 스트링)
         * itemId
         * points
         * maxPoints
         */
        [SEMESTER]: modalType === EDITITEM ? beforeData?.[SEMESTER] : '',
        itemId: modalType === EDITITEM ? beforeData?.itemId : '',
        [SPECIFIC_ITEM_NAME]: modalType === EDITITEM ? beforeData?.[SPECIFIC_ITEM_NAME] : '',
        [MILEAGE]: modalType === EDITITEM ? beforeData?.[MILEAGE] : 0,
        [ITEM_MAX_POINTS]: modalType === EDITITEM ? beforeData?.[ITEM_MAX_POINTS] : 0,
        [IS_MULTI]: modalType === EDITITEM ? beforeData?.[IS_MULTI] : false,
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
          <GlobalItemSelect itemId={beforeData?.itemId} />
          {[SPECIFIC_ITEM_NAME, MILEAGE, ITEM_MAX_POINTS].map((name, idx) => (
            <Field
              key={idx}
              label={engToKor(name)}
              name={name}
              as={TextField}
              variant="outlined"
              error={errors[name] && touched[name] ? true : false}
              helperText={<ErrorMessage name={name} />}
              
            />
          ))}

          {[IS_MULTI].map((inputName: string, index: number) => (
            <Box
              key={index}
              sx={{ display: 'flex', gap: 2, width: '100%', justifyContent: 'space-between' }}
            >
              <Chip
                color="primary"
                sx={{ px: 1, borderRadius: '10px', height: '40px' }}
                label={engToKor(inputName)}
                variant="outlined"
              />

              <Field name={inputName}>
                {({ field, form }) => (
                  <ToggleButtonGroup
                    sx={{ height: '40px', width: '100%' }}
                    color="primary"
                    value={field.value}
                    exclusive
                    onChange={(e, newValue) => form.setFieldValue(inputName, newValue)}
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
                )}
              </Field>
            </Box>
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
