import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { ErrorMessage, Field } from 'formik';
import { useSelector } from 'react-redux';
import { CATEGORYID, NUM, SEMESTER_ITEM_ID } from 'src/assets/data/fields';
import { setSemester } from 'src/redux/slices/filter';

export default function SemesterItemSelect({ semesterItemList }: any) {
  const MySelect = ({ field, form, ...props }) => (
    <Select {...field} {...props}>
      {semesterItemList?.map((semesterItem) => (
        <MenuItem key={semesterItem?.id} value={semesterItem?.id}>
          {semesterItem?.item.name}
        </MenuItem>
      ))}
    </Select>
  );

  return (
    <FormControl sx={{ width: '100%' }}>
      <InputLabel id="demo-simple-select-label">학기별 항목</InputLabel>
      <Field as={MySelect} name={SEMESTER_ITEM_ID} variant="outlined" required />
    </FormControl>
  );
}
