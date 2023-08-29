import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setIsVisible, setSemester } from 'src/redux/slices/filter';

const ISVISIBLES = [
  {
    text: '전체',
    value: '전체',
  },
  {
    text: 'Y',
    value: true,
  },
  {
    text: 'N',
    value: false,
  },
];

export default function IsVisibleDropdown() {
  const isVisible = useSelector((state) => state.filter.isVisible);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(isVisible);
  }, [isVisible]);

  const handleChange = (event: SelectChangeEvent) => {
    dispatch(setIsVisible(event.target.value));
    console.log(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">보이기</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={isVisible}
          label="학기"
          onChange={handleChange}
        >
          {ISVISIBLES.map((isVisible, index) => (
            <MenuItem value={isVisible.value}>{isVisible.text}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
