import { Box, FormControl, InputLabel, MenuItem, Select, styled } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setSemester } from 'src/redux/slices/filter';

export default function SemesterDropdown() {
  const SEMESTERS = useSelector((state) => state.filterList.semesterList);
  const semester = useSelector((state) => state.filter.semester);
  const dispatch = useDispatch();


  const handleChange = (event: SelectChangeEvent) => {
    dispatch(setSemester(event.target.value));
  };

  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">학기</InputLabel>
        <Select
          size="small"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={semester}
          label="학기"
          onChange={handleChange}
        >
          {SEMESTERS.map((semester, index) => (
            <MenuItem key={index} value={semester}>
              {semester}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
