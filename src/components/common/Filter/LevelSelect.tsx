import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { ErrorMessage, Field } from 'formik';
import { useSelector } from 'react-redux';
import { CATEGORYID, DEPARTMENT, GRADE, LEVEL, SEMESTER, YEAR } from 'src/assets/data/fields';
import { engToKor } from '../modal/SWModal';

export default function LevelSelect() {
  const LEVELS = [
    {
      id: 0,
      label: '관리자',
      value: '0',
    },
    {
      id: 1,

      label: '담당자',
      value: '1',
    },
    {
      id: 2,
      label: '일반',
      value: '2',
    },
    {
      id: 3,
      label: '미등록',
      value: '3',
    },
  ];

  const MySelect = ({ field, form, ...props }) => (
    <Select {...field} {...props}>
      {LEVELS.map((level) => (
        <MenuItem key={level.id} value={level.value}>
          {level.label}
        </MenuItem>
      ))}
    </Select>
  );

  return (
    <FormControl sx={{ width: '100%' }}>
      <InputLabel id="demo-simple-select-label">권한</InputLabel>
      <Field as={MySelect} name={LEVEL} variant="outlined" />
      <ErrorMessage name={LEVEL} />
    </FormControl>
  );
}
