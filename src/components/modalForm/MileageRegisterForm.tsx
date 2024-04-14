import { ErrorMessage, Field, Form, Formik } from 'formik';
import { ButtonFlexBox, engToKor } from '../common/modal/SWModal';

import * as Yup from 'yup';
import Button from '@mui/material/Button';

import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  styled,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { dispatch } from 'src/redux/store';
import { closeModal } from 'src/redux/slices/modal';
import CancelButton from '../common/modal/CancelButton';
import SubmitButton from '../common/modal/SubmitButton';
import axiosInstance from 'src/utils/axios';
import { useRouter } from 'next/router';
import {
  COUNTS,
  DESCRIPTION1,
  EXTRAPOINTS,
  ID,
  NAME,
  POINTS,
  SEMESTERITEMID,
  SEMESTER_ITEM_ID,
  SID,
  STUDENT_NAME,
} from '../../assets/data/fields';
import { STUDENT_ID } from 'src/assets/data/fields';
import { ADDMILEAGEREGISTER, EDITMILEAGEREGISTER } from 'src/assets/data/modal/modals';
import { RECORD_NAME } from '../../assets/data/fields';
import { Stack } from '@mui/system';
import GlobalItemSelect from '../common/Select/GlobalItemSelect';
import { currentYear, generateSemesters } from 'src/utils/semesterAutoGenerate';
import React, { useEffect } from 'react';
import SemesterItemSelect from '../common/Select/SemesterIdSelect';

export default function MileageRegisterForm({ handleClose }) {
  const [semesterItemList, setSemesterItemList] = React.useState([]);
  const [semester, setSemester] = React.useState(null);
  const semesters = useSelector((state) => state.filterList.semesterList);

  const SemesterSelect = () => (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">학기</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        value={semester}
        onChange={(e) => setSemester(e.target.value)}
        placeholder="학기"
        defaultValue={'학기'}
        label="학기"
        sx={{ minWidth: '100%', color: 'black' }}
      >
        {semesters
          .filter((semester) => semester !== '전체')
          .map((semester, index) => (
            <MenuItem key={index} value={semester}>
              {semester}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );

  useEffect(() => {
    if (!semester) return;
    axiosInstance
      .get(`/api/mileage/semesters/${semester}/items`)
      .then((res) => setSemesterItemList(res.data.list));
  }, [semester]);

  const beforeData = useSelector((state) => state.modal.beforeData);

  const modalType = useSelector((state) => state.modal.modalType);

  const router = useRouter();

  const MileageRegisterSchema = Yup.object().shape({
    // [SEMESTERITEMID]: Yup.string().required('필수입니다.'),
    // [STUDENT_ID]: Yup.number().integer().required('필수입니다.'),
    [NAME]: Yup.string().required('필수입니다.'),
    [SID]: Yup.string().length(8, '반드시 8자리 여야 합니다.').required('필수입니다.'),
    [COUNTS]: Yup.number().integer().required('필수입니다.'),
    // [POINTS]: Yup.number().integer().required('필수입니다.'),
    [EXTRAPOINTS]: Yup.number().integer(),
    [DESCRIPTION1]: Yup.string(),
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    const newData = {
      [SEMESTERITEMID]: beforeData ? beforeData[SEMESTER_ITEM_ID] : values[SEMESTER_ITEM_ID],
      [SID]: values[SID],
      [STUDENT_NAME]: values[NAME],
      // [STUDENT_ID]: values[STUDENT_ID],
      [COUNTS]: values[COUNTS],
      // [POINTS]: values[POINTS],
      [EXTRAPOINTS]: values[EXTRAPOINTS],
      [DESCRIPTION1]: values[DESCRIPTION1],
    };

    switch (modalType) {
      case ADDMILEAGEREGISTER:
        axiosInstance
          .post(`/api/mileage/records`, newData)
          .then((res) => {
            alert('마일리지 적립 리스트에 추가되었습니다.');
            router.reload();
          })
          .catch((err) => alert('마일리지 적립 리스트 추가에 실패했습니다.'));
        break;

      case EDITMILEAGEREGISTER:
        axiosInstance
          .patch(`/api/mileage/records/${beforeData[ID]}`, newData)
          .then((res) => {
            alert('마일리지 적립 리스트가 수정되었습니다.');
            router.reload();
          })
          .catch((err) => alert('마일리지 적립 리스트 수정이 실패했습니다.'));
        break;
    }
  };

  return (
    <Formik
      initialValues={{
        /**
         * semesterItemId (쿼리 스트링)
         * semesterItemId
         * studentId
         * counts
         * points
         * extraPoints
         * description1
         */

        [SEMESTERITEMID]: modalType === EDITMILEAGEREGISTER ? beforeData?.[SEMESTERITEMID] : '',
        // [STUDENT_ID]: modalType === EDITMILEAGEREGISTER ? beforeData?.[STUDENT_ID] : '',
        [NAME]: modalType === EDITMILEAGEREGISTER ? beforeData?.[NAME] : '',
        [SID]: modalType === EDITMILEAGEREGISTER ? beforeData?.[SID] : '',
        [COUNTS]: modalType === EDITMILEAGEREGISTER ? beforeData?.[COUNTS] : 1,
        // [POINTS]: modalType === EDITMILEAGEREGISTER ? beforeData?.[POINTS] : 0,
        [EXTRAPOINTS]: modalType === EDITMILEAGEREGISTER ? beforeData?.[EXTRAPOINTS] : 0,
        [DESCRIPTION1]: modalType === EDITMILEAGEREGISTER ? beforeData?.[DESCRIPTION1] : '',
      }}
      validationSchema={MileageRegisterSchema}
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
          {beforeData ? (
            <Stack direction="row" gap={1}>
              <Chip label={` ${beforeData?.categoryName}`} color="primary" variant="outlined" />
              <Chip label={`${beforeData?.itemName}`} color="primary" variant="outlined" />
              <Chip label={` ${beforeData?.semester}`} color="primary" variant="outlined" />
            </Stack>
          ) : (
            <>
              <SemesterSelect />
              <SemesterItemSelect semesterItemList={semesterItemList} />
            </>
          )}

          {[NAME, SID, COUNTS, EXTRAPOINTS, DESCRIPTION1].map((field) => (
            <>
              <Field
                style={{ minWidth: '300px' }}
                name={field}
                as={TextField}
                type="text"
                label={engToKor(field)}
                variant="outlined"
                error={errors[field] && touched[field] ? true : false}
                helperText={<ErrorMessage name={field} />}
              />
            </>
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
