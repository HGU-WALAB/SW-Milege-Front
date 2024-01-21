import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { ErrorMessage, Field } from 'formik';
import { useSelector } from 'react-redux';
import { CATEGORYID, SEMESTER } from 'src/assets/data/fields';
import { generateSemesters, currentYear } from 'src/utils/semesterAutoGenerate';
export default function SemesterMagicianSelect({ semester, setSemester }) {
  // const semesters = [
  //   '2020-01',
  //   '2020-02',
  //   '2021-01',
  //   '2021-02',
  //   '2022-01',
  //   '2022-02',
  //   '2023-01',
  //   '2023-02',
  //   '2024-01',
  //   '2024-02',
  //   '2025-01',
  //   '2025-02',
  //   '2026-01',
  //   '2026-02',
  //   '2027-01',
  //   '2027-02',
  // ];
  const semesters = useSelector((state) => state.filterList.semesterList);

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
