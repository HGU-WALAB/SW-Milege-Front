/*
  - 수정모드와 추가모드를 구분해야한다.
  - 수정모드일 때는 수정 전 데이터를 불러와서 Form에 뿌려주어야한다.
  - 수정모드 일때는 세부항목 이름과 마일리지, 적립가능 최대마일리지만 수정이 가능해야한다.
  - 추가모드와 동일하게 수정모드에서도 중복 적립 가능여부가 false일 때 적립 가능 최대 마일리지는 수정이 불가능해야한다.
  - SemesterItemForm 컴포넌트와 GlobalItemSelect 컴포넌트는 다른 파일에 작성되어있다. 
  - 학기를 선택하면 선택한 학기가 나와야한다. 
  - 세부 항목을 선택하면 GlobalItemSelect에서 선택한 항목과 그 선택으로 인해 GlobalItemSelect 컴포넌트에서 해당 항목의 마일리지와 최대마일리지, 중복적립가능여부를
    리덕스에 저장해서 그 정보를 SemesterItemForm 컴포넌트에서 사용한다. 
    selectedItemList에 저장된 세부 항목의 마일리지와 적립 가능 최대 마일리지 정보, 중복 적립가능여부가 나와야한다.
  - 마일리지는 중복적립가능여부와 상관없이 수정이 가능해야한다.
  - 적립 가능 최대 마일리지는 중복적립가능여부가 false이면 사용자가 수정이 불가능해야한다.
    - 중복적립가능여부가 false이면 적립 가능 최대 마일리지는 항상 마일리지와 같아야한다.
    - 중복적립가능여부가 false이면 마일리지 수정 시 적립 가능 최대 마일리지도 마일리지 값으로 변해야한다.
  - 중복적립가능여부는 항상 수정이 불가능해야한다.
  - 모달창이 열릴 때마다 초기값은 모든 항목이 비워져있는 아무것도 선택되지 않은 상태여야한다. 이전의 데이터가 남아있으면 안된다. 
  - map을 사용하지 말고 각각의 항목을 직접 적어주어야한다.
  */
import { useRouter } from 'next/router';
import { ErrorMessage, Field, Form, useFormik, Formik, useFormikContext } from 'formik';
import {
  Box,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import axiosInstance from 'src/utils/axios';
import { setSelectedItemList } from 'src/redux/slices/filterList';
import { ADDITEM, EDITITEM } from 'src/assets/data/modal/modals';
import {
  SPECIFIC_ITEM_NAME,
  MILEAGE,
  ITEM_MAX_POINTS,
  IS_MULTI,
  SEMESTER,
  SEMESTERITEMID,
} from 'src/assets/data/fields';
import CancelButton from '../common/modal/CancelButton';
import SubmitButton from '../common/modal/SubmitButton';
import SemesterSelect from '../common/Select/SemesterSelect';
import GlobalItemSelect from '../common/Select/GlobalItemSelect';

const SemesterItemSchema = Yup.object().shape({
  [SEMESTER]: Yup.string().required('필수입니다.'),
  itemId: Yup.number().integer().required('필수입니다.'),
  [MILEAGE]: Yup.number().integer(),
  [ITEM_MAX_POINTS]: Yup.number().integer(),
  [IS_MULTI]: Yup.boolean(),
});

const SemesterItemForm = ({ handleClose }) => {
  const modalType = useSelector((state) => state.modal.modalType);
  const beforeData = useSelector((state) => state.modal.beforeData);

  const router = useRouter();

  const handleSubmit = async (values) => {
    const { semester, itemId, mileage, itemMaxPoints } = values;
    const newData = { itemId, points: mileage, itemMaxPoints };

    try {
      const endpoint = `/api/mileage/semesters/${semester}/items`;
      const response =
        modalType === ADDITEM
          ? await axiosInstance.post(endpoint, newData)
          : await axiosInstance.patch(`${endpoint}/${beforeData[SEMESTERITEMID]}`, newData);
      alert('Operation successful!');
      router.reload();
    } catch (error) {
      alert(`Operation failed: ${error.message}`);
    }
  };

  const initialValues =
    modalType === EDITITEM
      ? {
          [SEMESTER]: beforeData.semester,
          itemId: beforeData.itemId,
          [SPECIFIC_ITEM_NAME]: beforeData.name,
          [MILEAGE]: beforeData.mileage,
          [ITEM_MAX_POINTS]: beforeData.itemMaxPoints,
          [IS_MULTI]: beforeData.isMulti,
        }
      : {
          [SEMESTER]: '',
          itemId: '',
          [SPECIFIC_ITEM_NAME]: '',
          [MILEAGE]: '',
          [ITEM_MAX_POINTS]: '',
          [IS_MULTI]: null,
        };

  const formik = useFormik({});

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SemesterItemSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ setFieldValue, values }) => (
        <Form>
          <SemesterSelect />
          <GlobalItemSelect />
          <Field name={SPECIFIC_ITEM_NAME} component={TextField} label="세부항목 이름" />
          <Field
            name={MILEAGE}
            onChange={(e) => {
              setFieldValue(MILEAGE, e.target.value);
              if (!values[IS_MULTI]) {
                setFieldValue(ITEM_MAX_POINTS, e.target.value);
              }
            }}
            value={values[MILEAGE]}
            component={TextField}
            label="마일리지"
            type="number"
          />
          <Field
            name={ITEM_MAX_POINTS}
            onChange={(e) => {
              setFieldValue(ITEM_MAX_POINTS, e.target.value);
            }}
            value={values[ITEM_MAX_POINTS]}
            component={TextField}
            label="적립 가능 최대 마일리지"
            type="number"
            disabled={!values[IS_MULTI]}
          />

          <ToggleButtonGroup
            name={IS_MULTI}
            exclusive
            value={values[IS_MULTI]}
            onChange={(_, newValue) => setFieldValue(IS_MULTI, newValue)}
            disabled
          >
            <ToggleButton value={true}>O</ToggleButton>
            <ToggleButton value={false}>X</ToggleButton>
          </ToggleButtonGroup>

          <Box sx={{ display: 'flex', gap: 2, flexDirection: 'row-reverse' }}>
            <SubmitButton />
            <CancelButton handleClose={handleClose} />
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default SemesterItemForm;
