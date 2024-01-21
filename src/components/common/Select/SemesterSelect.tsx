import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { ErrorMessage, Field } from 'formik';
import { useSelector } from 'react-redux';
import { CATEGORYID, SEMESTER } from 'src/assets/data/fields';
import { generateSemesters, currentYear } from 'src/utils/semesterAutoGenerate';

export default function SemesterSelect() {
  const semesters = useSelector((state) => state.filterList.semesterList);

  const MySelect = ({ field, form, ...props }) => (
    <Select {...field} {...props}>
      {semesters.map((semester, index) => (
        <MenuItem key={index} value={semester}>
          {semester}
        </MenuItem>
      ))}
    </Select>
  );

  return (
    <FormControl sx={{ width: '100%' }}>
      <InputLabel id="demo-simple-select-label">학기</InputLabel>
      <Field as={MySelect} name={SEMESTER} variant="outlined" required />
    </FormControl>
  );
}
