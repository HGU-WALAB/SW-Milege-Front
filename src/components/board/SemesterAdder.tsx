import React from 'react';
import { FormControl, InputLabel, MenuItem, Select, Button, Typography } from '@mui/material';
import { Formik, Form } from 'formik';
import axiosInstance from 'src/utils/axios';
import styled from 'styled-components';

interface FormValues {
  year: string;
  semester: string;
}

const AddSemesterForm = () => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i);

  const handleSubmit = async (values: FormValues) => {
    const yearSemester = `${values.year}-${values.semester}`;
    const confirmMessage = `${yearSemester} 학기를 추가하시겠습니까?`;

    if (window.confirm(confirmMessage)) {
      try {
        await axiosInstance.post('/api/mileage/semesters', {
          name: yearSemester,
        });
        alert('성공적으로 등록되었습니다.');
      } catch (error) {
        alert('에러가 발생했습니다.');
      }
    }
  };

  return (
    <Formik
      initialValues={{ year: currentYear.toString(), semester: '01' }}
      onSubmit={handleSubmit}
    >
      {({ values, handleChange }) => (
        <Form>
          <Container>
            <Typography variant="h5">학기 추가</Typography>
          </Container>

          <FormRow>
            <StyledFormControl>
              <InputLabel id="year-select-label">년도</InputLabel>
              <Select
                size="small"
                labelId="year-select-label"
                id="year-select"
                name="year"
                value={values.year}
                onChange={handleChange}
                label="년도"
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 200,
                    },
                  },
                }}
              >
                {years.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
            </StyledFormControl>

            <StyledFormControl>
              <InputLabel id="semester-select-label">학기</InputLabel>
              <Select
                size="small"
                labelId="semester-select-label"
                id="semester-select"
                name="semester"
                value={values.semester}
                onChange={handleChange}
                label="학기"
              >
                <MenuItem value="01">01</MenuItem>
                <MenuItem value="02">02</MenuItem>
              </Select>
            </StyledFormControl>

            <StyledButton type="submit" variant="contained" color="primary">
              추가
            </StyledButton>
          </FormRow>
        </Form>
      )}
    </Formik>
  );
};

export default AddSemesterForm;

const Container = styled.div`
  margin-bottom: 6px;
`;

const FormRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
`;

const StyledFormControl = styled(FormControl)`
  width: fit-content;
  margin: 8px 0;
`;

const StyledButton = styled(Button)`
  height: fit-content;
  align-self: center;
`;
