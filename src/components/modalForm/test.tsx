// import { useRouter } from 'next/router';
// import { ErrorMessage, Field, Form, Formik } from 'formik';
// import {
//   IS_MULTI,
//   POINT,
//   ITEM_MAX_POINTS,
//   MILEAGE,
//   SEMESTER,
//   SEMESTERITEMID,
//   SPECIFIC_ITEM_NAME,
// } from 'src/assets/data/fields';
// import * as Yup from 'yup';
// import { ADDITEM, EDITITEM } from 'src/assets/data/modal/modals';
// import { Box, Chip, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';
// import { useSelector } from 'react-redux';
// import axiosInstance from 'src/utils/axios';
// import CancelButton from '../common/modal/CancelButton';
// import SubmitButton from '../common/modal/SubmitButton';
// import { ButtonFlexBox, engToKor } from '../common/modal/SWModal';
// import SemesterSelect from '../common/Select/SemesterSelect';
// import GlobalItemSelect from '../common/Select/GlobalItemSelect';
// import React, { useEffect, useState, useRef } from 'react';
// import { be, tr } from 'date-fns/locale';
// import { set } from 'lodash';

// export default function SemesterItemForm({ handleClose }) {
//   const beforeData = useSelector((state) => state.modal.beforeData);
//   const modalType = useSelector((state) => state.modal.modalType);
//   const selectedItemList = useSelector((state) => state.filterList.selectedItemList);
//   const semester = useSelector((state) => state.filter.semester);
  
  
//   const router = useRouter();

//   const SemesterItemSchema = Yup.object().shape({
//     [SEMESTER]: Yup.string().required('필수입니다.'),
//     itemId: Yup.number().integer().required('필수입니다.'),
//     [MILEAGE]: Yup.number().integer(),
//     [ITEM_MAX_POINTS]: Yup.number().integer(),
//     [IS_MULTI]: Yup.boolean(),
//   });

//   const handleSubmit = (values: object) => {
//     // 카테고리 추가
//     // 1) newData 생성
//     // 2) axios post
//     // 3) alert
//     // 4) reload
//     const newData = {
//       itemId: values.itemId,
//       points: values[MILEAGE],
//       name: values[SPECIFIC_ITEM_NAME],
//       itemMaxPoints: +values[ITEM_MAX_POINTS],
//     };

//     switch (modalType) {
//       case ADDITEM:
//         axiosInstance
//           .post(`/api/mileage/semesters/${values[SEMESTER]}/items`, newData)
//           .then((res) => {
//             alert('학기별 항목이 추가되었습니다.');
//             router.reload();
//           })
//           .catch((err) => alert('학기별 항목 추가에 실패했습니다.'));
//         break;

//       case EDITITEM:
//         axiosInstance
//           .patch(`/api/mileage/semesters/${beforeData[SEMESTERITEMID]}`, newData)
//           .then((res) => {
//             alert('학기별 항목이 수정되었습니다.');
//             router.reload();
//           })
//           .catch((err) => alert('학기별 항목 수정에 실패했습니다.'));
//         break;
//       default:
//     }
//   };

//   const [initialFormValues, setInitialFormValues] = useState({
//     [SEMESTER]: modalType === EDITITEM ? beforeData?.[SEMESTER] : semester,
//     itemId: modalType === EDITITEM ? beforeData?.itemId : '',
//     [SPECIFIC_ITEM_NAME]: modalType === EDITITEM ? beforeData?.[SPECIFIC_ITEM_NAME] : '',
//     [MILEAGE]: modalType === EDITITEM ? beforeData?.[MILEAGE] : selectedItemList.mileage,
//     [ITEM_MAX_POINTS]:
//       modalType === EDITITEM ? beforeData?.[ITEM_MAX_POINTS] : selectedItemList.itemMaxPoints,
//     [IS_MULTI]: modalType === EDITITEM ? beforeData?.[IS_MULTI] : '',
//   });

//   useEffect(() => {
//     console.log('selectedItemList가 변경되었습니다:', selectedItemList);
//     setInitialFormValues({
//       [SEMESTER]: modalType === EDITITEM ? beforeData?.[SEMESTER] : semester,
//       itemId: modalType === EDITITEM ? beforeData?.itemId : '',
//       [SPECIFIC_ITEM_NAME]: modalType === EDITITEM ? beforeData?.[SPECIFIC_ITEM_NAME] : '',
//       [MILEAGE]: modalType === EDITITEM ? beforeData?.[MILEAGE] : selectedItemList.mileage,
//       [ITEM_MAX_POINTS]:
//         modalType === EDITITEM ? beforeData?.[ITEM_MAX_POINTS] : selectedItemList.itemMaxPoints,
//       [IS_MULTI]: modalType === EDITITEM ? beforeData?.[IS_MULTI] : '',
//     });
//   }, [selectedItemList]);

//   return (
//     <Formik
//       initialValues={initialFormValues}
//       validationSchema={SemesterItemSchema}
//       onSubmit={handleSubmit}
//      enableReinitialize={true}
//     >
//       {({ isSubmitting, errors, touched }) => (
//         <Form
//           style={{
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: ' center',
//             margin: '30px 0px',
//             padding: '0px 20px',
//             width: '100%',
//             gap: '30px',
//           }}
//         >
//           <SemesterSelect />

//           <GlobalItemSelect itemId={beforeData?.itemId} />

//           {[SPECIFIC_ITEM_NAME, MILEAGE, ITEM_MAX_POINTS].map((field: string) => (
//             <Field name={field} key={field}>
//               {({ field: { name, value }, form: { setFieldValue, values, errors, touched } }) => {
//                 let isDisabled = false;

//                 if (field === ITEM_MAX_POINTS) {
//                   isDisabled = !selectedItemList.isDuplicable;
//                 }
//                 return (
//                   <TextField
//                     validateOnMount={true}
//                     name={name}
//                     value={values[name]}
//                     onChange={(e) => setFieldValue(name, e.target.value)}
//                     disabled={isDisabled}
//                     label={engToKor(field)}
//                     variant="outlined"
//                     error={!!(errors[name] && touched[name])}
//                     helperText={errors[name] && touched[name] && <ErrorMessage name={name} />}
//                     type="text"
//                   />
//                 );
//               }}
//             </Field>
//           ))}

//           {[IS_MULTI].map((inputName: string, index: number) => (
//             <Box
//               key={index}
//               sx={{ display: 'flex', gap: 2, width: '100%', justifyContent: 'space-between' }}
//             >
//               <Chip
//                 color="primary"
//                 sx={{ px: 1, borderRadius: '10px', height: '40px' }}
//                 label={engToKor(inputName)}
//                 variant="outlined"
//               />

//               <Field name={inputName}>
//                 {({ field, form }) => (
//                   <ToggleButtonGroup
//                     sx={{ height: '40px', width: '100%' }}
//                     color="primary"
//                     value={modalType === EDITITEM ? beforeData?.[IS_MULTI] : selectedItemList.isDuplicable}
//                     exclusive
//                     aria-label="toggle value"
//                     disabled={true}
//                   >
//                     <ToggleButton
//                       value={true}
//                       aria-label="true"
//                       sx={{
//                         width: '100%',
//                       }}
//                     >
//                       O
//                     </ToggleButton>
//                     <ToggleButton
//                       value={false}
//                       aria-label="false"
//                       sx={{
//                         width: '100%',
//                       }}
//                     >
//                       X
//                     </ToggleButton>
//                   </ToggleButtonGroup>
//                 )}
//               </Field>
//             </Box>
//           ))}
//           <ButtonFlexBox>
//             <CancelButton modalType={modalType} handleClose={handleClose} />
//             <SubmitButton />
//           </ButtonFlexBox>
//         </Form>
//       )}
//     </Formik>
//   );
// }
