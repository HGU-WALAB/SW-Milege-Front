import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setGrade } from 'src/redux/slices/filter';

export default function GradeDropdown() {
  const grade = useSelector((state) => state.filter.grade);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(grade);
  }, [grade]);

  const handleChange = (event: SelectChangeEvent) => {
    dispatch(setGrade(event.target.value));
    console.log(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">학년</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={grade}
          label="학년"
          onChange={handleChange}
        >
          <MenuItem value={'전체'}>전체</MenuItem>
          <MenuItem value={'1'}>1학년</MenuItem>
          <MenuItem value={'2'}>2학년</MenuItem>
          <MenuItem value={'3'}>3학년</MenuItem>
          <MenuItem value={'4'}>4학년</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
