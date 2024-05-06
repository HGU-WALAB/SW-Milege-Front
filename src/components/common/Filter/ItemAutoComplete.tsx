import { Autocomplete, TextField, styled } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setItem } from 'src/redux/slices/filter';
import { removeDuplicates } from './Filtering';

export default function ItemAutoComplete() {
  const top100Films = removeDuplicates([
    '전체',
    ...useSelector((state) => state.filterList.itemList).map((item) => item.name),
  ]);
  const item = useSelector((state) => state.filter.item);
  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    dispatch(setItem(newValue));
  };

  return (
    <StyledAutocomplete
      size="small"
      value={item}
      disablePortal
      id="combo-box-demo"
      options={top100Films}
      renderInput={(params) => <TextField {...params} label="세부항목" />}
      onChange={(e, newValue) => handleChange(e, newValue)}
    />
  );
}

const StyledAutocomplete = styled(Autocomplete)({
  minWidth: '230px',
});
