import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { ErrorMessage, Field } from 'formik';
import { useSelector } from 'react-redux';
import { CATEGORYID, NUM } from 'src/assets/data/fields';
import { EDITITEM } from 'src/assets/data/modal/modals';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios'; 
import { setSelectedItemList } from 'src/redux/slices/filterList';
import axiosInstance from 'src/utils/axios';
import { useFormikContext } from 'formik';

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
      console.log('response.data:', response.data);
    } catch (error) {
      console.error('해당 학기별 마일리지 세부 항목 정보 가져오기 실패:', error);
    }
  };
  


  const MySelect = ({ field, ...props }) => (
    <Select
      {...field}
      {...props}
      defaultValue={field.value} 
      onChange={(event) => {
        handleChange(event); 
        field.onChange(event); 
      }}
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
    <FormControl sx={{ width: '100%' }}>
      <InputLabel id="demo-simple-select-label">세부 항목</InputLabel>
      <Field component={MySelect} name="itemId" required />
    </FormControl>
  );
}
