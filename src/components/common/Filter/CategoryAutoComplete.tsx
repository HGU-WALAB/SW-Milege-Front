import { Autocomplete, TextField } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory } from 'src/redux/slices/filter';

export default function CategoryAutoComplete() {
  const top100Films = [
    '전체',
    '전공 마일리지',
    '비교과 - 연구활동',
    '비교과 - 특강참여',
    '비교과 - 학회활동',
    '비교과 - 행사참여',
  ];

  const value = useSelector((state) => state.filter.category);
  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    dispatch(setCategory(newValue));
  };

  return (
    <Autocomplete
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
