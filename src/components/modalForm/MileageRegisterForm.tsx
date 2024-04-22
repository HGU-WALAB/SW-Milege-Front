import { ErrorMessage, Field, Form, Formik } from 'formik';
import { ButtonFlexBox, engToKor } from '../common/modal/SWModal';

import * as Yup from 'yup';

import { Box, Chip, FormControl, InputLabel, MenuItem, Select, Tab, Tabs, TextField, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import CancelButton from '../common/modal/CancelButton';
import SubmitButton from '../common/modal/SubmitButton';
import axiosInstance from 'src/utils/axios';
import { useRouter } from 'next/router';
import {
  DESCRIPTION1,
  EXTRAPOINTS,
  ID,
  NAME,
  SEMESTER_ITEM_ID,
  SEMESTERITEMID,
  SID,
  STUDENT_NAME,
} from '../../assets/data/fields';
import { ADDMILEAGEREGISTER, EDITMILEAGEREGISTER } from 'src/assets/data/modal/modals';
import { Stack } from '@mui/system';
import React, { useEffect, useState } from 'react';
import SemesterItemSelect from '../common/Select/SemesterIdSelect';
import ExcelImport from 'src/components/excel/ExcelImport';
import { PATH_API } from 'src/routes/paths';

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
        defaultValue="학기"
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
    [STUDENT_NAME]: Yup.string().required('필수입니다.'),
    [SID]: Yup.string().length(8, '반드시 8자리 여야 합니다.').required('필수입니다.'),
    // [COUNTS]: Yup.number().integer().required('필수입니다.'),
    // [POINTS]: Yup.number().integer().required('필수입니다.'),
    [EXTRAPOINTS]: Yup.number().integer(),
    [DESCRIPTION1]: Yup.string(),
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    const newData = {
      [SEMESTERITEMID]: beforeData ? beforeData[SEMESTER_ITEM_ID] : values[SEMESTER_ITEM_ID],
      [SID]: values[SID],
      [STUDENT_NAME]: values[STUDENT_NAME],
      // [STUDENT_ID]: values[STUDENT_ID],
      // [COUNTS]: 1,
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
      default:
        break;
    }
  };
  const [tabIndex, setTabIndex] = useState(0);

  const CustomTabPanel = (props) => {
    const { children, value, index } = props;

    return (
      <div
        hidden={value !== index}
        role="tabpanel"
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
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
        [STUDENT_NAME]: modalType === EDITMILEAGEREGISTER ? beforeData?.[NAME] : '',
        [SID]: modalType === EDITMILEAGEREGISTER ? beforeData?.[SID] : '',
        // [COUNTS]: modalType === EDITMILEAGEREGISTER ? beforeData?.[COUNTS] : 1,
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
              <Chip label={`${beforeData?.semester}`} color="primary" variant="outlined" />
              <Chip label={`${beforeData?.categoryName}`} color="primary" variant="outlined" />
              <Chip label={`${beforeData?.itemName}`} color="primary" variant="outlined" />
            </Stack>
          ) : (
            <>
              <SemesterSelect />
              <SemesterItemSelect semesterItemList={semesterItemList} />
            </>
          )}

          <Tabs value={tabIndex} onChange={(e, index: number) => setTabIndex(index)}>
            <Tab label="건별 등록" />
            <Tab label="엑셀 업로드" />
          </Tabs>

          <CustomTabPanel value={tabIndex} index={0}>
            {[STUDENT_NAME, SID, EXTRAPOINTS, DESCRIPTION1].map((field) => (
              <Field
                style={{ minWidth: '300px' }}
                name={field}
                as={TextField}
                type="text"
                label={engToKor(field)}
                variant="outlined"
                error={!!(errors[field] && touched[field])}
                helperText={<ErrorMessage name={field} />}
              />
            ))}
            <ButtonFlexBox>
              <CancelButton modalType={modalType} handleClose={handleClose} />
              <SubmitButton />
            </ButtonFlexBox>
          </CustomTabPanel>
          <CustomTabPanel value={tabIndex} index={1}>
            <ExcelImport endpoint={PATH_API.excel.upload.record} />
          </CustomTabPanel>
        </Form>
      )}
    </Formik>
  );
}
