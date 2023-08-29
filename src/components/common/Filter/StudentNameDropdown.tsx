import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setName } from 'src/redux/slices/filter';

export default function StudentNameDropdown() {
  const name = useSelector((state) => state.filter.name);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(name);
  }, [name]);

  const handleChange = (event: SelectChangeEvent) => {
    dispatch(setName(event.target.value));
    console.log(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">학생명</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={name}
          label="학생명"
          onChange={handleChange}
        >
          <MenuItem value={'전체'}>전체</MenuItem>
          <MenuItem value={'오인혁'}>오인혁</MenuItem>
          <MenuItem value={'오인혁2'}>오인혁2</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
