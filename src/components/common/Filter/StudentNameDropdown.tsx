import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setStudentName } from 'src/redux/slices/filter';

export default function StudentStudentNameDropdown() {
  const studentName = useSelector((state) => state.filter.studentName);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(studentName);
  }, [studentName]);

  const handleChange = (event: SelectChangeEvent) => {
    dispatch(setStudentName(event.target.value));
    console.log(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">학생명</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={studentName}
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
