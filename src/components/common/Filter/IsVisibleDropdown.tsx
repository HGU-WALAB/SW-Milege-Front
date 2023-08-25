import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setIsVisible, setSemester } from 'src/redux/slices/filter';

export default function isVisibleDropdown() {
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
          <MenuItem value={null}>전체</MenuItem>
          <MenuItem value={true}>Yes</MenuItem>
          <MenuItem value={false}>No</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
