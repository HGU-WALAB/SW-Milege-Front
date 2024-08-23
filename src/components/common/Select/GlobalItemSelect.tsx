import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useSelector } from 'react-redux';
import axiosInstance from 'src/utils/axios';
import { useFormikContext, FormikValues } from 'formik';
import { EDITITEM } from 'src/assets/data/modal/modals';
import {
  MILEAGE,
  ITEM_MAX_POINTS,
  IS_MULTI,
} from 'src/assets/data/fields';
import { RootState } from 'src/redux/rootReducer';



const GlobalItemSelect = ({ itemId }) => {
  const globalItemList = useSelector((state: RootState) => state.filterList.itemList);
  const modalType = useSelector((state: RootState) => state.modal.modalType);
  const { setFieldValue, values } = useFormikContext<FormikValues>();

  const handleChange = async (event: SelectChangeEvent) => {
    const selectedItemId = event.target.value;
    try {
      const response = await axiosInstance.get(`/api/mileage/items/${selectedItemId}`);
      const itemData = response.data;

      setFieldValue('itemId', itemData.id);
      setFieldValue(MILEAGE, itemData.mileage);
      setFieldValue(ITEM_MAX_POINTS, itemData.itemMaxPoints);
      setFieldValue(IS_MULTI, itemData.isDuplicable);
    } catch (error) {
      console.error('Failed to fetch item details:', error);
    }
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="item-select-label">마일리지 항목</InputLabel>
      <Select
        labelId="item-select-label"
        name={itemId}
        value={values.itemId}
        onChange={handleChange}
        disabled={modalType === EDITITEM ? true : false}
        label="마일리지 항목"
      >
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
