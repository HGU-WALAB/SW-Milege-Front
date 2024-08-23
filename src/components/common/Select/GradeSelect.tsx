import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { ErrorMessage, Field } from 'formik';
import { GRADE } from 'src/assets/data/fields';

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
    <Select {...field} {...props} label="학년">
      {grades.map((grade) => (
        <MenuItem key={grade.id} value={grade.id}>
          {grade.name}
        </MenuItem>
      ))}
    </Select>
  );

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">학년</InputLabel>
      <Field
        as={MySelect}
        name={GRADE}
        label="학년"
        labelId="grade-select-label"
        variant="outlined"
      />
      <ErrorMessage name={GRADE} />
    </FormControl>
  );
}
