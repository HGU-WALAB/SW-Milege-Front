import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { ErrorMessage, Field } from 'formik';
import { useSelector } from 'react-redux';
import { CATEGORYID, SEMESTER, TYPE } from 'src/assets/data/fields';

export default function TypeSelect() {
  const TYPES = [
    {
      id: 0,
      text: 'A타입',
      value: 'A',
    },
    {
      id: 1,
      text: 'B타입',
      value: 'B',
    },
    {
      id: 2,
      text: 'C타입',
      value: 'C',
    },
    {
      id: 3,
      text: 'D타입',
      value: 'D',
    },
    {
      id: 4,
      text: 'E타입',
      value: 'E',
    },
  ];

  const MySelect = ({ field, form, ...props }) => (
    <Select {...field} {...props}>
      {TYPES.map((type, index) => (
        <MenuItem key={type.id} value={type.value}>
          {type.text}
        </MenuItem>
      ))}
    </Select>
  );

  return (
    <FormControl sx={{ width: '100%' }}>
      <InputLabel id="demo-simple-select-label">타입</InputLabel>
      <Field as={MySelect} name={TYPE} variant="outlined" />
      <ErrorMessage name={TYPE} />
    </FormControl>
  );
}
