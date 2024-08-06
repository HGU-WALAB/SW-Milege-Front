import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { ErrorMessage, Field } from 'formik';
import { useSelector } from 'react-redux';
import { CATEGORYID, SEMESTER } from 'src/assets/data/fields';
import { generateSemesters, currentYear } from 'src/utils/semesterAutoGenerate';
import { RootState } from 'src/redux/store';

export default function SemesterMagicianSelect({ semester, setSemester }) {
  const semesters = useSelector((state: RootState) => state.filterList.semesterList);

  return (
    <Select
      sx={{ width: '100%', mb: '10px' }}
      value={semester}
      onChange={(e) => {
        setSemester(e.target.value);
      }}
    >
      {semesters.map((semester, index) => (
        <MenuItem key={index} value={semester}>
          {semester}
        </MenuItem>
      ))}
    </Select>
  );
}
