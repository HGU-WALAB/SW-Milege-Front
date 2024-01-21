import { Box, FormControl, InputLabel, MenuItem, Select, styled } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDepartment, department } from 'src/redux/slices/filter';

const StyledSelect = styled(Select)({
  width: '200px',
});

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

export default function DepartmentDropdown() {
  const department = useSelector((state) => state.filter.department);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    dispatch(setDepartment(event.target.value));
  };

  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">학부</InputLabel>
        <Select
          size="small"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={department}
          label="학부"
          onChange={handleChange}
        >
          {DEPARTMENTS.map((dept, index) => (
            <MenuItem key={index} value={dept}>
              {dept}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
