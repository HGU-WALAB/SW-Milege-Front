import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Field } from 'formik';
import { useSelector } from 'react-redux';
import { SEMESTER } from 'src/assets/data/fields';

export default function SemesterSelect() {
  const semesters = useSelector((state) => state.filterList.semesterList);
  const modalType = useSelector((state) => state.modal.modalType);

  const MySelect = ({ field, form, ...props }) => (
    <Select {...field} {...props} disabled={modalType === 'EDITITEM' ? 1 : 0}>
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
