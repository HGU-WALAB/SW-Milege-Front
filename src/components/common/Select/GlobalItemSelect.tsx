import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
// import { setSelectedItemList } from 'src/redux/slices/filterList';
import axiosInstance from 'src/utils/axios';
import { useFormikContext } from 'formik';
import {
  SPECIFIC_ITEM_NAME,
  MILEAGE,
  ITEM_MAX_POINTS,
  IS_MULTI,
  SEMESTER,
  SEMESTERITEMID,
} from 'src/assets/data/fields';

const GlobalItemSelect = () => {
  const dispatch = useDispatch();
  const globalItemList = useSelector((state) => state.filterList.itemList);
  const { setFieldValue, values } = useFormikContext();

  const handleChange = async (event) => {
    const selectedItemId = event.target.value;
    try {
      const response = await axiosInstance.get(`/api/mileage/items/${selectedItemId}`);
      const itemData = response.data;
      console.log('itemData:', itemData);
      setFieldValue('itemId', itemData.id);
      setFieldValue(MILEAGE, itemData.mileage);
      setFieldValue(ITEM_MAX_POINTS, itemData.itemMaxPoints);
      setFieldValue(IS_MULTI, itemData.isDuplicable);

      console.log('values:', values);
    } catch (error) {
      console.error('Failed to fetch item details:', error);
    }
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="item-select-label">세부 항목</InputLabel>
      <Select labelId="item-select-label" onChange={handleChange} defaultValue="" label="세부 항목">
        {globalItemList.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default GlobalItemSelect;
