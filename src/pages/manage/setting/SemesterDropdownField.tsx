import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useFormikContext } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { setSemester } from 'src/redux/slices/filter';

export default function SemesterDropdownField() {
  const SEMESTERS = useSelector((state) => state.filterList.semesterList);
  const { values, setFieldValue } = useFormikContext();

  const dispatch = useDispatch();

  const handleChange = (event: SelectChangeEvent) => {
    dispatch(setSemester(event.target.value));
    setFieldValue('semester', event.target.value);
  };

  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">학기</InputLabel>
        <Select
          size="small"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="학기"
          name="semester"
          value={values.semester}
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
