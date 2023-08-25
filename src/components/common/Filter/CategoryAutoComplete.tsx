import { Autocomplete, TextField } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory } from 'src/redux/slices/filter';

export default function CategoryAutoComplete() {
  const top100Films = [
    '전공 마일리지',
    '비교과 - 연구활동',
    '비교과 - 봉사활동',
    '비교과 - 창업활동',
  ];

  const value = useSelector((state) => state.filter.category);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(value);
  }, [value]);

  return (
    <Autocomplete
      value={value}
      disablePortal
      id="combo-box-demo"
      options={top100Films}
      renderInput={(params) => <TextField {...params} label="카테고리" />}
      onChange={(e, newValue) => dispatch(setCategory(newValue))}
    />
  );
}
