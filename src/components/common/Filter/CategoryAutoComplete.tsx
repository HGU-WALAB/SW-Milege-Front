import { Autocomplete, TextField } from '@mui/material';
import { styled } from '@mui/system';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory } from 'src/redux/slices/filter';

const StyledAutocomplete = styled(Autocomplete)({
  minWidth: '200px',
});

export default function CategoryAutoComplete() {
  const top100Films = [
    '전체',
    ...useSelector((state) => state.filter.categoryList.map((category) => category.name)),
  ];

  const value = useSelector((state) => state.filter.category);
  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    dispatch(setCategory(newValue));
  };

  return (
    <StyledAutocomplete
      size="small"
      value={value}
      disablePortal
      id="combo-box-demo"
      options={top100Films}
      renderInput={(params) => <TextField {...params} label="카테고리" />}
      onChange={(e, newValue) => handleChange(e, newValue)}
    />
  );
}
