import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Box, Chip, styled, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { ButtonFlexBox, engToKor } from '../common/modal/SWModal';
import {
  DESCRIPTION1,
  ID,
  IS_MULTI,
  IS_STUDENT_INPUT,
  ISEVALUATE_CSEE_GENERAL,
  ISEVALUATE_CSEE_SPECIAL,
  ISEVALUATE_ICT_CONVERGENCE,
  ISVISIBLE,
  ISVISIBLE_STUDENT,
  ITEM,
  POINT,
  ITEM_MAX_POINTS,
  TYPE,
  CATEGORY_MAX_POINTS,
} from 'src/assets/data/fields';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { ADDGLOBALITEM, EDITGLOBALITEM } from 'src/assets/data/modal/modals';
import CancelButton from '../common/modal/CancelButton';
import SubmitButton from '../common/modal/SubmitButton';
import axiosInstance from 'src/utils/axios';
import { useRouter } from 'next/router';
import { CATEGORYID } from '../../assets/data/fields';
import CategorySelect from '../common/Select/CategorySelect';
import TypeSelect from 'src/components/common/Filter/TypeSelect';
import { be } from 'date-fns/locale';

const inputFields = [ITEM, POINT, ITEM_MAX_POINTS, DESCRIPTION1];
const toggleFields = [
  IS_MULTI,
  ISVISIBLE,
  ISVISIBLE_STUDENT,
  IS_STUDENT_INPUT,
  ISEVALUATE_CSEE_GENERAL,
  ISEVALUATE_CSEE_SPECIAL,
  ISEVALUATE_ICT_CONVERGENCE,
];

interface RequestPayload {
  readonly categoryId: number;
  readonly typeId: number;
  readonly itemName: string;
  readonly mileage: number;
  readonly itemMaxPoints: number;
  readonly description1: string;
  readonly flags: {
    readonly isVisible: boolean;
    readonly isStudentVisible: boolean;
    readonly isStudentEditable: boolean;
    readonly isDuplicable: boolean;
    readonly isCseeGeneral: boolean;
    readonly isCseeSpecial: boolean;
    readonly isIctConvergence: boolean;
  };
}

const GlobalItemSchema = Yup.object().shape({
  [CATEGORYID]: Yup.string().required('필수입니다.'),
  [ITEM]: Yup.string().required('필수입니다.'),
  [TYPE]: Yup.string().required('필수입니다.'),
});

export default function GlobalItemForm({ handleClose }) {
  const { modalType, beforeData, allMileageList } = useSelector((state) => ({
    modalType: state.modal.modalType,
    beforeData: state.modal.beforeData,
    allMileageList: state.filterList.allMileageList,
  }));
  const router = useRouter();

  const initialValues = {
    [CATEGORYID]: beforeData?.category?.id || '',
    [CATEGORY_MAX_POINTS]: beforeData?.category?.maxPoints || -1,
    [TYPE]: beforeData?.mileageType?.id || '',
    [ITEM]: beforeData?.name || '',
    [POINT]: beforeData?.mileage || 0,
    [ITEM_MAX_POINTS]: beforeData?.itemMaxPoints || 0,
    [DESCRIPTION1]: beforeData?.description1 || '',
    [ISVISIBLE]: beforeData?.isVisible || true,
    [ISVISIBLE_STUDENT]: beforeData?.isStudentVisible || true,
    [IS_STUDENT_INPUT]: beforeData?.isStudentInput || false,
    [IS_MULTI]: beforeData?.isDuplicable || true,
    [ISEVALUATE_CSEE_GENERAL]: beforeData?.isCseeGeneral || false,
    [ISEVALUATE_CSEE_SPECIAL]: beforeData?.isCseeSpecial || false,
    [ISEVALUATE_ICT_CONVERGENCE]: beforeData?.isIctConvergence || false,
  };

  const handleSubmit = (values: object) => {
    // 세부 항목 추가
    // 1) newData 생성
    // 2) axios post
    // 3) alert
    // 4) reload
    const newData: RequestPayload = {
      categoryId: values[CATEGORYID],
      typeId: values[TYPE],
      itemName: values[ITEM],
      mileage: values[POINT],
      itemMaxPoints: values[ITEM_MAX_POINTS],
      description1: values[DESCRIPTION1],
      flags: {
        isVisible: values[ISVISIBLE],
        isStudentVisible: values[ISVISIBLE_STUDENT],
        isStudentEditable: values[IS_STUDENT_INPUT],
        isDuplicable: values[IS_MULTI],
        isCseeGeneral: values[ISEVALUATE_CSEE_GENERAL],
        isCseeSpecial: values[ISEVALUATE_CSEE_SPECIAL],
        isIctConvergence: values[ISEVALUATE_ICT_CONVERGENCE],
      },
    };

    switch (modalType) {
      case ADDGLOBALITEM:
        axiosInstance
          .post('/api/mileage/items', newData)
          .then((res) => {
            alert('세부 항목이 추가되었습니다.');
            router.reload();
          })
          .catch((err) => {
            console.log(err);
            alert('세부 항목 추가에 실패했습니다.');
          });
        break;

      case EDITGLOBALITEM:
        axiosInstance
          .patch(`/api/mileage/items/${beforeData[ID]}`, newData)
          .then((res) => {
            alert(`세부 항목 ${beforeData[ID]}번이 수정되었습니다.`);
            router.reload();
          })
          .catch((err) => alert('세부 항목 수정에 실패했습니다.'));
        break;
      default:
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={GlobalItemSchema}
    >
      {({ values, setFieldValue, touched, errors }) => (
        <StyleFieldForm>
          <Box sx={{ display: 'flex', width: '100%', gap: '30px' }}>
            <StyledFieldBox>
              <TypeSelect />
              <CategorySelect />
              <DisplayMaxPoints points={values[CATEGORY_MAX_POINTS]} />
              {inputFields.map((field, index) => (
                <TextFieldComponent
                  key={index}
                  field={field}
                  values={values}
                  setFieldValue={setFieldValue}
                  touched={touched}
                  errors={errors}
                  allMileageList={allMileageList}
                />
              ))}
            </StyledFieldBox>
            <StyledFieldBox>
              {toggleFields.map((field, index) => (
                <ToggleButtonComponent
                  key={index}
                  field={field}
                  values={values}
                  setFieldValue={setFieldValue}
                />
              ))}
              <ButtonFlexBox>
                <CancelButton modalType={modalType} handleClose={handleClose} />
                <SubmitButton />
              </ButtonFlexBox>
            </StyledFieldBox>
          </Box>
        </StyleFieldForm>
      )}
    </Formik>
  );
}

const StyledFieldBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  width: '100%',
}));

const StyleFieldForm = styled(Form)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '30px',
  width: '100%',
}));

const DisplayMaxPoints = ({ points }) => {
  if (points === -1) return null;

  const label =
    points === null ? '카테고리 최대 마일리지: 제한없음' : `카테고리 최대 마일리지: ${points}`;

  return <Chip color="primary" label={label} variant="outlined" />;
};

const TextFieldComponent = ({ field, values, setFieldValue, touched, errors, allMileageList }) => {
  const handleChange = (e) => setFieldValue(field, e.target.value);
  const isDisabled = field === ITEM_MAX_POINTS && !values[IS_MULTI];

  const checkIfItemExists = (itemName) => {
    console.log(itemName, values[TYPE], values[CATEGORYID]);
  
    return allMileageList.some(
      (item) =>
        item.name === itemName &&
        item.mileageType.id === values[TYPE] &&
        item.category.id === values[CATEGORYID]
    );
  };

  const isError =
    field === ITEM && checkIfItemExists(values[ITEM]);
  if (field == ITEM_MAX_POINTS && isDisabled && values[POINT] !== values[ITEM_MAX_POINTS]) {
    setFieldValue(field, values[POINT]);
  }
  return (
    <TextField
      name={field}
      value={values[field]}
      onChange={handleChange}
      disabled={isDisabled}
      label={engToKor(field)}
      variant="outlined"
      error={isError || Boolean(touched[field] && errors[field])}
      helperText={isError ? '존재하는 마일리지 항목 이름입니다.' : touched[field] && errors[field]}
    />
  );
};

const ToggleButtonComponent = ({ field, values, setFieldValue }) => (
  <Box sx={{ display: 'flex', gap: 2, width: '100%', justifyContent: 'space-between' }}>
    <Chip
      color="primary"
      sx={{ px: 1, borderRadius: '10px', height: '40px', width: '100%' }}
      label={engToKor(field)}
      variant="outlined"
    />
    <ToggleButtonGroup
      sx={{ height: '40px' }}
      color="primary"
      value={values[field]}
      exclusive
      onChange={(e, newValue) => {
        setFieldValue(field, newValue);
      }}
      aria-label="toggle value"
    >
      <ToggleButton value={true}>O</ToggleButton>
      <ToggleButton value={false}>X</ToggleButton>
    </ToggleButtonGroup>
  </Box>
);
