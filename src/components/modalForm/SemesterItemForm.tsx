import { useRouter } from 'next/router';
import { ErrorMessage, Field, Form, Formik, useFormikContext, FormikValues } from 'formik';
import {
  Box,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Chip,
} from '@mui/material';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import axiosInstance from 'src/utils/axios';
import { ADDITEM, EDITITEM } from 'src/assets/data/modal/modals';
import { ButtonFlexBox, engToKor } from '../common/modal/SWModal';
import {
  ITEM_NAME,
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
import { RootState } from 'src/redux/store';

const SemesterItemSchema = Yup.object().shape({
  [SEMESTER]: Yup.string().required('필수입니다.'),
  itemId: Yup.number().integer().required('필수입니다.'),
  [MILEAGE]: Yup.number().integer(),
  [ITEM_MAX_POINTS]: Yup.number().integer(),
  [IS_MULTI]: Yup.boolean(),
});

const SemesterItemForm = ({ handleClose }) => {
  const modalType = useSelector((state: RootState) => state.modal.modalType);
  const beforeData = useSelector((state: RootState) => state.modal.beforeData);
  const router = useRouter();

  const handleSubmit = (values: FormikValues) => {
    const newData = {
      itemId: values.itemId,
      semesterName: values[SEMESTER],
      points: values[MILEAGE],
      name: values[SPECIFIC_ITEM_NAME],
      itemMaxPoints: +values[ITEM_MAX_POINTS],
    };

    console.log(newData);

    switch (modalType) {
      case ADDITEM:
        axiosInstance
          .post(`/api/mileage/semesters/${values[SEMESTER]}/items`, newData)
          .then(() => {
            alert('학기별 항목이 추가되었습니다.');
            router.reload();
          })
          .catch((err) => {
            err.response.status === 403 && alert('이미 존재하는 항목입니다.');
            err.response.status === 400 && alert('학기별 항목 추가에 실패했습니다.');
            alert('학기별 항목 추가에 실패했습니다.');});
        break;

      case EDITITEM:
        axiosInstance
          .patch(`/api/mileage/semesters/${beforeData.id}`, newData)
          .then(() => {
            alert('학기별 항목이 수정되었습니다.');
            router.reload();
          })
          .catch((err) => 
          { 
            err.response.status === 403 && alert('이미 존재하는 항목입니다.');
            err.response.status === 400 && alert('학기별 항목 수정에 실패했습니다.');
            alert('학기별 항목 수정에 실패했습니다.');}
           );
        break;
      default:
    }
  };

  const initialValues =
    modalType === EDITITEM
      ? {
          itemId: beforeData.item.id,
          [SEMESTER]: beforeData.semesterName,
          [SPECIFIC_ITEM_NAME]: beforeData.name,
          [MILEAGE]: beforeData.points,
          [ITEM_MAX_POINTS]: beforeData.itemMaxPoints,
          [IS_MULTI]: beforeData.item.isDuplicable,
        }
      : {
          [SEMESTER]: '',
          itemId: '',
          [SPECIFIC_ITEM_NAME]: '',
          [MILEAGE]: '',
          [ITEM_MAX_POINTS]: '',
          [IS_MULTI]: false,
        };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SemesterItemSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ setFieldValue, values, errors, touched, isSubmitting }) => (
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
          <GlobalItemSelect itemId={beforeData?.item.id} />
          <Field
            name={SPECIFIC_ITEM_NAME}
            component={TextField}
            label="학기별 마일리지 항목 이름"
            value={values[SPECIFIC_ITEM_NAME]}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setFieldValue(SPECIFIC_ITEM_NAME, e.target.value);
            }
            }
          />
          <Field
            name={MILEAGE}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setFieldValue(MILEAGE, e.target.value);
              if (!values[IS_MULTI]) {
                setFieldValue(ITEM_MAX_POINTS, e.target.value);
              }
            }}
            value={values[MILEAGE]}
            component={TextField}
            label="마일리지"
            type="number"
            error={!!(errors[MILEAGE] && touched[MILEAGE])}
            helperText={<ErrorMessage name={MILEAGE} />}
          />
          <Field
            name={ITEM_MAX_POINTS}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setFieldValue(ITEM_MAX_POINTS, e.target.value);
            }}
            value={values[ITEM_MAX_POINTS]}
            component={TextField}
            label="적립 가능 최대 마일리지"
            type="number"
            disabled={!values[IS_MULTI]}
          />

          <Box sx={{ display: 'flex', gap: 2, width: '100%', justifyContent: 'space-between' }}>
            <Chip
              color="primary"
              sx={{ px: 1, borderRadius: '10px', height: '40px' }}
              label={engToKor(IS_MULTI)}
              variant="outlined"
            />
            <Field name={IS_MULTI}>
              {({ field, form }) => (
                <ToggleButtonGroup
                  sx={{ height: '40px', width: '100%' }}
                  color="primary"
                  key={field.name}
                  exclusive
                  value={values[IS_MULTI]}
                  onChange={(_, newValue) => setFieldValue(IS_MULTI, newValue)}
                  disabled
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
          <ButtonFlexBox>
            <SubmitButton />
            <CancelButton modalType={modalType} handleClose={handleClose} />
          </ButtonFlexBox>
        </Form>
      )}
    </Formik>
  );
};

export default SemesterItemForm;
