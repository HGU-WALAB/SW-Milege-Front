import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDepartment } from 'src/redux/slices/filter';

export default function DepartmentDropdown() {
  const DEPARTMENTS = [
    '전체',
    '경영경제학부',
    '상담심리사회복지학부',
    '생명과학부',
    '전산전자공학부',
    'ICT창업학부',
    '커뮤니케이션학부',
    '기계제어공학부',
    '국제어문학부',
    '법학부',
    '공간환경시스템공학부',
    '콘텐츠융합디자인학부',
  ];

  const department = useSelector((state) => state.filter.department);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(department);
  }, [department]);

  const handleChange = (event: SelectChangeEvent) => {
    dispatch(setDepartment(event.target.value));
    console.log(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">학부</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={department}
          label="학부"
          onChange={handleChange}
        >
          {[DEPARTMENTS].map((department, index) => (
            <MenuItem key={index} value={`${department}`}>
              {department}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
