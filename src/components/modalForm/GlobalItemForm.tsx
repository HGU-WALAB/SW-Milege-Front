import { ErrorMessage, Field, Form, Formik } from 'formik';

import {
  Box,
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
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
  ISVISIBLE,
  ISVISIBLE_STUDENT,
  IS_STUDENT_INPUT,
  ISEVALUATE_CSEE,
  ISEVALUATE_PORTFOLIO,
  ISEVALUATE_FUSION,
  MAX_MAILEAGE,
  ID,
  ITEM_MAX_POINTS,
} from 'src/assets/data/fields';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { ADDGLOBALITEM, EDITGLOBALITEM, EDITITEM } from 'src/assets/data/modal/modals';
import CancelButton from '../common/modal/CancelButton';
import SubmitButton from '../common/modal/SubmitButton';
import axiosInstance from 'src/utils/axios';
import { useRouter } from 'next/router';
import { CATEGORYID } from '../../assets/data/fields';
import CategorySelect from '../common/Select/CategorySelect';
import MultiTap from './MultiTap';

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

export default function GlobalItemForm({ handleClose }) {
  const modalType = useSelector((state) => state.modal.modalType);

  const beforeData = useSelector((state) => state.modal.beforeData);
  const router = useRouter();

  const GlobalItemSchema = Yup.object().shape({
    [CATEGORYID]: Yup.string().required('필수입니다.'),
    [ITEM]: Yup.string().required('필수입니다.'),
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    // 글로벌 세부항목 추가
    // 1) newData 생성
    // 2) axios post
    // 3) alert
    // 4) reload

    const stuTypeConverter = ({
      [ISEVALUATE_FUSION]: f,
      [ISEVALUATE_CSEE]: c,
    }: {
      [ISEVALUATE_FUSION]: boolean;
      [ISEVALUATE_CSEE]: boolean;
    }) => {
      if (f && c) {
        return 'CF';
      } else if (f) {
        return 'F';
      } else if (c) {
        return 'C';
      }
    };

    const newData = {
      [CATEGORYID]: values[CATEGORYID],
      itemName: values[ITEM],
      [DESCRIPTION1]: values[DESCRIPTION1],
      [DESCRIPTION2]: values[DESCRIPTION2],
      [ITEM_MAX_POINTS]: values[ITEM_MAX_POINTS],
      stuType: stuTypeConverter(values),
      flags: {
        [ISVISIBLE]: values[ISVISIBLE],
        isStudentVisible: values[ISVISIBLE_STUDENT],
        isStudentEditable: values[IS_STUDENT_INPUT],
        isPortfolio: values[ISEVALUATE_PORTFOLIO],
      },
    };


    switch (modalType) {
      case ADDGLOBALITEM:
        axiosInstance
          .post('/api/mileage/items', newData)
          .then((res) => {
            alert('글로벌 항목이 추가되었습니다.');
            router.reload();
          })
          .catch((err) => {
            console.log(err);
            alert('글로벌 항목 추가에 실패했습니다.');
          });
        break;

      case EDITGLOBALITEM:
        axiosInstance
          .patch(`/api/mileage/items/${beforeData[ID]}`, newData)
          .then((res) => {
            alert(`글로벌 항목 ${beforeData[ID]}번이 수정되었습니다.`);
            router.reload();
          })
          .catch((err) => alert('글로벌 항목 수정에 실패했습니다.'));
        break;
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          [CATEGORYID]: modalType === EDITGLOBALITEM ? beforeData?.[CATEGORYID] : '',
          [ITEM]: modalType === EDITGLOBALITEM ? beforeData?.[ITEM] : '',
          [DESCRIPTION1]: modalType === EDITGLOBALITEM ? beforeData?.[DESCRIPTION1] : '',
          [DESCRIPTION2]: modalType === EDITGLOBALITEM ? beforeData?.[DESCRIPTION2] : '',
          [ISVISIBLE]: modalType === EDITGLOBALITEM ? beforeData?.[ISVISIBLE] : false,
          [ISVISIBLE_STUDENT]:
            modalType === EDITGLOBALITEM ? beforeData?.[ISVISIBLE_STUDENT] : false,
          [IS_STUDENT_INPUT]: modalType === EDITGLOBALITEM ? beforeData?.[IS_STUDENT_INPUT] : false,
          [ISEVALUATE_CSEE]: modalType === EDITGLOBALITEM ? beforeData?.[ISEVALUATE_CSEE] : false,
          [ISEVALUATE_PORTFOLIO]:
            modalType === EDITGLOBALITEM ? beforeData?.[ISEVALUATE_PORTFOLIO] : false,
          [ISEVALUATE_FUSION]:
            modalType === EDITGLOBALITEM ? beforeData?.[ISEVALUATE_FUSION] : false,
          [ITEM_MAX_POINTS]: modalType === EDITGLOBALITEM ? beforeData?.[ITEM_MAX_POINTS] : 0,
        }}
        validationSchema={GlobalItemSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <StyleFieldForm>
            <Box sx={{ display: 'flex', width: '100%', gap: '30px' }}>
              <StyleFieldBox>
                <CategorySelect />
                {[ITEM, ITEM_MAX_POINTS, DESCRIPTION1, DESCRIPTION2].map(
                  (field: string, index: number) => (
                    <Box key={index} sx={{ width: '100%' }}>
                      <Field
                        sx={{}}
                        name={field}
                        as={TextField}
                        type="text"
                        label={engToKor(field)}
                        variant="outlined"
                        error={errors[field] && touched[field] ? true : false}
                        helperText={<ErrorMessage name={field} />}
                      />
                    </Box>
                  )
                )}
              </StyleFieldBox>
              <StyleFieldBox>
                {[
                  ISVISIBLE,
                  ISVISIBLE_STUDENT,
                  IS_STUDENT_INPUT,
                  ISEVALUATE_CSEE,
                  ISEVALUATE_PORTFOLIO,
                  ISEVALUATE_FUSION,
                ].map((inputName: string, index: number) => (
                  <Box
                    key={index}
                    sx={{ display: 'flex', gap: 2, width: '100%', justifyContent: 'space-between' }}
                  >
                    <Chip
                      color="primary"
                      sx={{ px: 1, borderRadius: '10px', height: '40px', width: '100%' }}
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
                <Box sx={{ height: '10px' }} />
                <ButtonFlexBox>
                  <CancelButton modalType={modalType} handleClose={handleClose} />
                  <SubmitButton />
                </ButtonFlexBox>
              </StyleFieldBox>
            </Box>
          </StyleFieldForm>
        )}
      </Formik>
    </>
  );
}
