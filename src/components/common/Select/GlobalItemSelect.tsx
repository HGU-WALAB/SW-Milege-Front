import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { ErrorMessage, Field } from 'formik';
import { useSelector } from 'react-redux';
import { CATEGORYID, NUM } from 'src/assets/data/fields';

export default function GlobalItemSelect({ itemId }: { itemId?: number }) {
  const globalItemList = useSelector((state) => state.filterList.itemList);

  const MySelect = ({ field, form, ...props }) => (
    <Select {...field} {...props} defaultValue={itemId}>
      {globalItemList.map((globalItem) => (
        <MenuItem key={globalItem.id} value={globalItem.id}>
          {globalItem.name}
        </MenuItem>
      ))}
    </Select>
  );

  return (
    <FormControl sx={{ width: '100%' }}>
      <InputLabel id="demo-simple-select-label">글로벌 항목</InputLabel>
      <Field as={MySelect} name={'itemId'} />
      <ErrorMessage name={'itemId'} />
    </FormControl>
  );
}
