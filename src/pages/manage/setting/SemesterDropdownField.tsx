import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useFormikContext } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentSemester } from 'src/redux/slices/filter';
import { RootState } from 'src/redux/store';
import { FormValues } from 'src/components/board/SemesterSetting';

export default function SemesterDropdownField() {
  const SEMESTERS = useSelector((state: RootState) => state.filterList.semesterList);
  const { values, setFieldValue } = useFormikContext<FormValues>();

  const dispatch = useDispatch();

  const handleChange = (event: SelectChangeEvent) => {
    dispatch(setCurrentSemester(event.target.value));
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
          {SEMESTERS.map((semester: string, index: number) => (
            <MenuItem key={index} value={semester}>
              {semester}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
