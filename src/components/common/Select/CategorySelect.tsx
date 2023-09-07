import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Field } from 'formik';
import { useSelector } from 'react-redux';
import { CATEGORYID } from 'src/assets/data/fields';

export default function CategorySelect() {
  const categories = useSelector((state) => state.filterList.categoryList);

  const MySelect = ({ field, form, ...props }) => (
    <Select {...field} {...props}>
      {categories.map((category) => (
        <MenuItem key={category.id} value={category.id}>
          {category.name}
        </MenuItem>
      ))}
    </Select>
  );

  return (
    <FormControl sx={{ width: '100%' }}>
      <InputLabel id="demo-simple-select-label">카테고리</InputLabel>
      <Field as={MySelect} name={CATEGORYID} />
    </FormControl>
  );
}
