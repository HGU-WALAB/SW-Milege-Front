import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { ErrorMessage, Field } from 'formik';
import { useSelector } from 'react-redux';
import { CATEGORYID, SEMESTER, TYPE } from 'src/assets/data/fields';
import { id } from 'date-fns/locale';

export default function TypeSelect() {
  const TYPES = [
    {
      id: 0,
      text: '창의적문제해결역량',
      value: '창의적문제해결역량',
    },
    {
      id: 1,
      text: '글로벌역량',
      value: '글로벌역량',
    },
    {
      id: 2,
      text: '논리적사고와소통능력',
      value: '논리적사고와소통능력',
    },
    {
      id: 3,
      text: '다학제융합능력',
      value: '다학제융합능력',
    },
    {
      id: 4,
      text: '인성 및 영성',
      value: '인성 및 영성',
    },
    {
      id: 5,
      text: '없음',
      value: '없음',
    },
  ];

  const MySelect = ({ field, form, ...props }) => (
    <Select label="타입" {...field} {...props}>
      {TYPES.map((type, index) => (
        <MenuItem key={type.id} value={type.value}>
          {type.text}
        </MenuItem>
      ))}
    </Select>
  );

  return (
    <FormControl sx={{ width: '100%' }} variant="outlined">
      <InputLabel id="demo-simple-select-label">타입</InputLabel>
      <Field as={MySelect} name={TYPE} />
      <ErrorMessage name={TYPE} />
    </FormControl>
  );
}
