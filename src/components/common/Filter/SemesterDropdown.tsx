import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSemester } from 'src/redux/slices/filter';

const SEMESTERS = [
  '전체',
  '2020-01',
  '2020-02',
  '2021-01',
  '2021-02',
  '2022-01',
  '2022-02',
  '2023-01',
  '2023-02',
];

export default function SemesterDropdown() {
  const semester = useSelector((state) => state.filter.semester);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(semester);
  }, [semester]);

  const handleChange = (event: SelectChangeEvent) => {
    dispatch(setSemester(event.target.value));
    console.log(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">학기</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={semester}
          label="학기"
          onChange={handleChange}
        >
          {SEMESTERS.map((semester, index) => (
            <MenuItem value={semester}>{semester}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
