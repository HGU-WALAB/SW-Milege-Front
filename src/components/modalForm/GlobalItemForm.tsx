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
import { IGlobalItem } from 'src/pages/mileage/item/global';

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

export default function GlobalItemForm({ handleClose }) {
  const modalType = useSelector((state) => state.modal.modalType);
  const beforeData: IGlobalItem = useSelector((state) => state.modal.beforeData);
  const router = useRouter();

  const GlobalItemSchema = Yup.object().shape({
    [CATEGORYID]: Yup.string().required('필수입니다.'),
    [ITEM]: Yup.string().required('필수입니다.'),
  });

  const handleSubmit = (values) => {
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
      initialValues={{
        [TYPE]: beforeData?.mileageType.id || '',
        [CATEGORYID]: beforeData?.category.id || '',
        [ITEM]: beforeData?.name || '',
        [POINT]: beforeData?.mileage || 0,
        [ITEM_MAX_POINTS]: beforeData?.itemMaxPoints || 0,
        [DESCRIPTION1]: beforeData?.description1 || '',
        [ISVISIBLE]: beforeData?.isVisible ?? true,
        [ISVISIBLE_STUDENT]: beforeData?.isStudentVisible ?? true,
        [IS_STUDENT_INPUT]: beforeData?.isStudentInput ?? false,
        [IS_MULTI]: beforeData?.isDuplicable ?? true,
        [ISEVALUATE_CSEE_GENERAL]: beforeData?.isCseeGeneral ?? false,
        [ISEVALUATE_CSEE_SPECIAL]: beforeData?.isCseeSpecial ?? false,
        [ISEVALUATE_ICT_CONVERGENCE]: beforeData?.isIctConvergence ?? false,
      }}
      validationSchema={GlobalItemSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <StyleFieldForm>
          <Box sx={{ display: 'flex', width: '100%', gap: '30px' }}>
            <StyleFieldBox>
              <TypeSelect />
              <CategorySelect />
              {[ITEM, POINT, ITEM_MAX_POINTS, DESCRIPTION1].map((field: string, index: number) => (
                <Box key={index} sx={{ width: '100%' }}>
                  <Field name={field}>
                    {({
                      field: { name, value },
                      form: { setFieldValue, values, errors, touched },
                    }) => {
                      if (field === ITEM_MAX_POINTS) {
                        const isDisabled = !values[IS_MULTI];

                        if (isDisabled && values[POINT] !== value) {
                          setFieldValue(name, values[POINT]);
                        }

                        return (
                          <TextField
                            name={name}
                            value={value}
                            onChange={(e) => setFieldValue(name, e.target.value)}
                            disabled={isDisabled}
                            label={engToKor(field)}
                            variant="outlined"
                            error={!!(errors[name] && touched[name])}
                            helperText={errors[name] && touched[name] && errors[name]}
                            type="text"
                          />
                        );
                      } else {
                        return (
                          <TextField
                            name={name}
                            value={value}
                            onChange={(e) => setFieldValue(name, e.target.value)}
                            label={engToKor(field)}
                            variant="outlined"
                            error={!!(errors[name] && touched[name])}
                            helperText={errors[name] && touched[name] && errors[name]}
                            type="text"
                          />
                        );
                      }
                    }}
                  </Field>
                </Box>
              ))}
            </StyleFieldBox>

            <StyleFieldBox>
              {[
                IS_MULTI,
                ISVISIBLE,
                ISVISIBLE_STUDENT,
                IS_STUDENT_INPUT,
                ISEVALUATE_CSEE_GENERAL,
                ISEVALUATE_CSEE_SPECIAL,
                ISEVALUATE_ICT_CONVERGENCE,
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
                    {({ field, form }) => {
                      if (inputName === IS_MULTI) {
                        return (
                          <ToggleButtonGroup
                            sx={{ height: '40px' }}
                            color="primary"
                            value={field.value}
                            exclusive
                            onChange={(e, newValue) => {
                              form.setFieldValue(inputName, newValue);
                              if (!newValue) {
                                form.setFieldValue(ITEM_MAX_POINTS, form.values[POINT]);
                              }
                            }}
                            aria-label="toggle value"
                          >
                            <ToggleButton value={true} aria-label="true">
                              O
                            </ToggleButton>
                            <ToggleButton value={false} aria-label="false">
                              X
                            </ToggleButton>
                          </ToggleButtonGroup>
                        );
                      } else {
                        return (
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
                        );
                      }
                    }}
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
