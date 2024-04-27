import { Box, FormControl, InputLabel, MenuItem, Select, Autocomplete, TextField } from '@mui/material';
import { styled } from '@mui/system';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setCategoryType } from 'src/redux/slices/filter';
import { removeDuplicates } from './Filtering';

const StyledAutocomplete = styled(Autocomplete)({
  minWidth: '200px',
});

export default function CategoryTypeDropDown() {

  const top100Films = removeDuplicates([
    '전체',
    ...useSelector((state) => state?.filterList?.typeList?.map((type) => type?.name)),
  ]);

  const value = useSelector((state) => state.filter.mileageType);
  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    dispatch(setCategoryType(newValue));
  };

  return (
    <StyledAutocomplete
      size="small"
      value={value}
      disablePortal
      id="combo-box-demo"
      options={top100Films}
      renderInput={(params) => <TextField {...params} label="타입" />}
      onChange={(e, newValue) => handleChange(e, newValue)}
    />
  );
}
