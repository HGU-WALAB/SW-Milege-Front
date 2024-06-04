import { FormControl, InputLabel, MenuItem, Select, styled } from '@mui/material';
import { Field } from 'formik';
import { TYPE } from 'src/assets/data/fields';
import { useSelector } from 'react-redux';

const TypeSelect = () => {
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
    <FormControl variant="outlined" fullWidth>
      <InputLabel id="type-select-label">타입</InputLabel>
      <Field as={MySelect} name={TYPE} label="타입" required />
    </FormControl>
  );
};
export default TypeSelect;
