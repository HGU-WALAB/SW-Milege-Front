import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { ErrorMessage, Field } from 'formik';
import { useSelector } from 'react-redux';
import { CATEGORYID, DEPARTMENT, SEMESTER } from 'src/assets/data/fields';
import { engToKor } from '../modal/SWModal';

export default function MajorSelect({ name }) {
  const majors = [
    'AI·컴퓨터공학심화(60)',
    'ICT융합(33)',
    '기계공학',
    '전자공학',
  ];

  const MySelect = ({ field, form, ...props }) => (
    <Select {...field} {...props}>
      {majors.map((major, index) => (
        <MenuItem key={index} value={major}>
          {major}
        </MenuItem>
      ))}
    </Select>
  );

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">{engToKor(name)}</InputLabel>
      <Field
        as={MySelect}
        name={name}
        label={engToKor(name)}
        labelId="major-select-label"
        variant="outlined"
      />
      <ErrorMessage name={name} />
    </FormControl>
  );
}
