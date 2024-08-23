import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { ErrorMessage, Field } from 'formik';
import { useSelector } from 'react-redux';
import { CATEGORYID, DEPARTMENT, SEMESTER } from 'src/assets/data/fields';

export default function DepartmentSelect() {
  const departments = [
    '전산전자공학부',
    '융합전공',
    '1학년',
  ];

  const MySelect = ({ field, form, ...props }) => (
    <Select {...field} {...props}>
      {departments.map((dept, index) => (
        <MenuItem key={index} value={dept}>
          {dept}
        </MenuItem>
      ))}
    </Select>
  );

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">학부</InputLabel>
      <Field
        as={MySelect}
        name={DEPARTMENT}
        label="학부"
        labelId="department-select-label"
        variant="outlined"
      />
      <ErrorMessage name={DEPARTMENT} />
    </FormControl>
  );
}
