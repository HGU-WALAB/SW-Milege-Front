import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Field } from 'formik';
import { useSelector } from 'react-redux';
import { SEMESTER } from 'src/assets/data/fields';
import { EDITITEM } from 'src/assets/data/modal/modals';
import { RootState } from 'src/redux/store';

export default function SemesterSelect() {
  const semesters = useSelector((state: RootState) => state.filterList.semesterList);
  const modalType = useSelector((state: RootState) => state.modal.modalType);

  const MySelect = ({ field, form, ...props }) => (
    <Select {...field} {...props} disabled={modalType === EDITITEM ? 1 : 0}>
      {semesters.map((semester: string, index: number) => (
        <MenuItem key={index} value={semester}>
          {semester}
        </MenuItem>
      ))}
    </Select>
  );

  return (
    <FormControl sx={{ width: '100%' }}>
      <InputLabel id="semester-select-label">학기</InputLabel>
      <Field as={MySelect} name={SEMESTER} label="학기" required />
    </FormControl>
  );
}
