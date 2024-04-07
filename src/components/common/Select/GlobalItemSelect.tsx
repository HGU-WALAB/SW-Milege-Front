import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { ErrorMessage, Field, useFormikContext, useField } from 'formik';
import { useSelector } from 'react-redux';
import { CATEGORYID, NUM } from 'src/assets/data/fields';
import { EDITITEM } from 'src/assets/data/modal/modals';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';
import { setSelectedItemList } from 'src/redux/slices/filterList';
import axiosInstance from 'src/utils/axios';

export default function GlobalItemSelect({ itemId }: { itemId?: number }) {
  const globalItemList = useSelector((state) => state.filterList.itemList);
  const modalType = useSelector((state) => state.modal.modalType);
  const dispatch = useDispatch();

  const { setFieldValue } = useFormikContext();

  const handleChange = async (event) => {
    const newSelectedItemId = event.target.value;

    setFieldValue('itemId', newSelectedItemId);

    try {
      const response = await axiosInstance.get(`/api/mileage/items/${newSelectedItemId}`);
      dispatch(setSelectedItemList(response.data));
    } catch (error) {
      console.error('해당 학기별 마일리지 세부 항목 정보 가져오기 실패:', error);
    }
  };

  const [field, meta] = useField('itemId');

  const MySelect = (props) => (
    <Select
      {...field}
      {...props}
      value={field.value || ''}
      onChange={handleChange}
      disabled={modalType === EDITITEM}
    >
      {globalItemList.map((globalItem) => (
        <MenuItem key={globalItem.id} value={globalItem.id}>
          {globalItem.name}
        </MenuItem>
      ))}
    </Select>
  );

  return (
    <FormControl sx={{ width: '100%' }} error={meta.touched && Boolean(meta.error)}>
      <InputLabel id="demo-simple-select-label">세부 항목</InputLabel>
      <Field as={MySelect} name="itemId" variant="outlined" required />
      {meta.touched && meta.error ? (
        <div style={{ color: 'red', marginTop: '0.5rem' }}>{meta.error}</div>
      ) : null}
    </FormControl>
  );
}
