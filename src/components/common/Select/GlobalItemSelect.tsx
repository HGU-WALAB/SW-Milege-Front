import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { ErrorMessage, Field } from 'formik';
import { useSelector } from 'react-redux';
import { CATEGORYID, NUM } from 'src/assets/data/fields';
import { EDITITEM } from 'src/assets/data/modal/modals';

export default function GlobalItemSelect({ itemId }: { itemId?: number }) {
  const globalItemList = useSelector((state) => state.filterList.itemList);
  const modalType = useSelector((state) => state.modal.modalType);

  const MySelect = ({ field, form, ...props }) => (
    <Select {...field} {...props} defaultValue={itemId} disabled={modalType === EDITITEM ? 1 : 0}>
      {globalItemList.map((globalItem) => (
        <MenuItem key={globalItem.id} value={globalItem.id}>
          {globalItem.name}
        </MenuItem>
      ))}
    </Select>
  );

  return (
    <FormControl sx={{ width: '100%' }}>
      <InputLabel id="demo-simple-select-label">세부 항목</InputLabel>
      <Field as={MySelect} name={'itemId'} variant="outlined" required />
    </FormControl>
  );
}
