import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { ErrorMessage, Field } from 'formik';
import { useSelector } from 'react-redux';
import { CATEGORYID, DEPARTMENT, GRADE, SEMESTER, YEAR } from 'src/assets/data/fields';
import { engToKor } from '../modal/SWModal';

export default function GradeSelect() {
  const grades = [
    {
      id: 1,
      name: '1학년',
    },
    {
      id: 2,
      name: '2학년',
    },
    {
      id: 3,
      name: '3학년',
    },
    {
      id: 4,
      name: '4학년',
    },
  ];

  const MySelect = ({ field, form, ...props }) => (
    <Select {...field} {...props}>
      {grades.map((grade) => (
        <MenuItem key={grade.id} value={grade.id}>
          {grade.name}
        </MenuItem>
      ))}
    </Select>
  );

  return (
    <FormControl sx={{ width: '100%' }}>
      <InputLabel id="demo-simple-select-label">학년</InputLabel>
      <Field as={MySelect} name={YEAR} variant="outlined" />
      <ErrorMessage name={YEAR} />
    </FormControl>
  );
}
