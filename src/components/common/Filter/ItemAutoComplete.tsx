import { Autocomplete, TextField } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory, setItem } from 'src/redux/slices/filter';

export default function ItemAutoComplete() {
  const top100Films = [
    '전체',
    '웹 서비스 캠프',
    'pps 캠프',
    'c언어 캠프',
    '대경권 프로그래밍 대회',
    '와랩 스터디',
  ];

  const item = useSelector((state) => state.filter.item);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(item);
  }, [item]);

  return (
    <Autocomplete
      sx={{ minWidth: '200px' }}
      value={item}
      disablePortal
      id="combo-box-demo"
      options={top100Films}
      renderInput={(params) => <TextField {...params} label="항목명" />}
      onChange={(e, newValue) => dispatch(setItem(newValue))}
    />
  );
}
