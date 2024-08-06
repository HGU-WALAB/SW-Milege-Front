import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setSemester } from 'src/redux/slices/filter';
import { RootState } from 'src/redux/store';
import { createSelector } from 'reselect';

const selectSemesterList = (state: RootState) => state.filterList.semesterList;

const selectSemesterOptions = createSelector([selectSemesterList], (semesterList) => [
  '전체',
  ...semesterList,
]);

export default function SemesterDropdown() {
  const semesterList = useSelector(selectSemesterOptions);
  const semester = useSelector((state: RootState) => state.filter.semester || '전체');

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
          {semesterList.map((semester, index) => (
            <MenuItem key={index} value={semester}>
              {semester}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
