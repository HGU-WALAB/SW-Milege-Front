import { Autocomplete, TextField, styled } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory, setItem } from 'src/redux/slices/filter';

const StyledAutocomplete = styled(Autocomplete)({
  minWidth: '230px',
});

export default function ItemAutoComplete() {
  const top100Films = [
    '전체',
    ...useSelector((state) => state.filterList.itemList).map((item) => item.name),
  ];
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
      renderInput={(params) => <TextField {...params} label="항목명" />}
      onChange={(e, newValue) => handleChange(e, newValue)}
    />
  );
}
