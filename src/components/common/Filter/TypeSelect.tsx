import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Field } from 'formik';
import { TYPE } from 'src/assets/data/fields';
import { useSelector } from 'react-redux';

export default function TypeSelect() {
  const types = useSelector((state) => state.filterList.typeList);

  const MySelect = ({ field, form, ...props }) => (
    <Select {...field} {...props}>
      {types.map((type) => (
        <MenuItem key={type.id} value={type.id}>
          {type.name}
        </MenuItem>
      ))}
    </Select>
  );

  return (
    <FormControl sx={{ width: '100%' }}>
      <InputLabel id="demo-simple-select-label">타입</InputLabel>
      <Field as={MySelect} name={TYPE} variant="outlined" required />
    </FormControl>
  );
}
