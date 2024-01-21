import { Box, FormControl, InputLabel, MenuItem, Select, styled } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setGrade } from 'src/redux/slices/filter';

const GRADES = [
  {
    id: 0,
    text: '전체',
    value: '전체',
  },
  {
    id: 1,
    text: '1학년',
    value: '1',
  },
  {
    id: 2,
    text: '2학년',
    value: '2',
  },
  {
    id: 3,
    text: '3학년',
    value: '3',
  },
  {
    id: 4,
    text: '4학년',
    value: '4',
  },
  {
    id: 5,
    text: '5학년',
    value: '5',
  },
];

export default function GradeDropdown() {
  const grade = useSelector((state) => state.filter.grade);
  const dispatch = useDispatch();

  const handleChange = (event: SelectChangeEvent) => {
    dispatch(setGrade(event.target.value));
  };

  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">학년</InputLabel>
        <Select
          size="small"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={grade}
          label="학년"
          onChange={handleChange}
        >
          {GRADES.map((grade, index) => (
            <MenuItem key={grade.id} value={grade.value}>
              {grade.text}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
