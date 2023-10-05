import { Box, FormControl, InputLabel, MenuItem, Select, styled } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setIsVisible, setSemester } from 'src/redux/slices/filter';

const ISVISIBLES = [
  {
    id: 0,
    text: '전체',
    value: '전체',
  },
  {
    id: 1,
    text: 'Y',
    value: true,
  },
  {
    id: 2,
    text: 'N',
    value: false,
  },
];

export default function IsVisibleDropdown() {
  const isVisible = useSelector((state) => state.filter.isVisible);
  const dispatch = useDispatch();

  const handleChange = (event: SelectChangeEvent) => {
    dispatch(setIsVisible(event.target.value));
    console.log(event.target.value);
  };

  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">보이기</InputLabel>
        <Select
          size="small"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={isVisible}
          label="학기"
          onChange={handleChange}
        >
          {ISVISIBLES.map((isVisible, index) => (
            <MenuItem key={isVisible.id} value={isVisible.value}>
              {isVisible.text}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
