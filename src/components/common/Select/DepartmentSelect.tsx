import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { ErrorMessage, Field } from 'formik';
import { useSelector } from 'react-redux';
import { CATEGORYID, DEPARTMENT, SEMESTER } from 'src/assets/data/fields';

export default function DepartmentSelect() {
  const departments = [
    '경영경제학부',
    '상당심리사회복지학부',
    '생명과학부',
    '전산전자공학부',
    'ICT창업학부',
    '커뮤니케이션학부',
    '기계제어공학부',
    '국제어문학부',
    '법학부',
    '공간환경시스템공학부',
    '콘텐츠융합디자인학부',
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
    <FormControl sx={{ width: '100%' }}>
      <InputLabel id="demo-simple-select-label">학부</InputLabel>
      <Field as={MySelect} name={DEPARTMENT} variant="outlined" />
      <ErrorMessage name={DEPARTMENT} />
    </FormControl>
  );
}
