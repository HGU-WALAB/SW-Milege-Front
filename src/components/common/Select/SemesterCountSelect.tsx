import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { ErrorMessage, Field } from 'formik';
import { useSelector } from 'react-redux';
import { CATEGORYID, DEPARTMENT, GRADE, SEMESTER, SEMESTERCOUNT } from 'src/assets/data/fields';
import { engToKor } from '../modal/SWModal';

export default function SemesterCountSelect() {
  const semesterCounts = [
    {
      id: 1,
      name: '1학기',
    },
    {
      id: 2,
      name: '2학기',
    },
    {
      id: 3,
      name: '3학기',
    },
    {
      id: 4,
      name: '4학기',
    },
    {
      id: 5,
      name: '5학기',
    },
    {
      id: 6,
      name: '6학기',
    },
    {
      id: 7,
      name: '7학기',
    },
    {
      id: 8,
      name: '8학기',
    },
    {
      id: 9,
      name: '9학기',
    },
    {
      id: 10,
      name: '10학기',
    },
  ];

  const MySelect = ({ field, form, ...props }) => (
    <Select {...field} {...props}>
      {semesterCounts.map((semesterCount) => (
        <MenuItem key={semesterCount.id} value={semesterCount.id}>
          {semesterCount.name}
        </MenuItem>
      ))}
    </Select>
  );

  return (
    <FormControl sx={{ width: '100%' }}>
      <InputLabel id="demo-simple-select-label">학기 수</InputLabel>
      <Field as={MySelect} name={SEMESTERCOUNT} />
      <ErrorMessage name={SEMESTERCOUNT} />
    </FormControl>
  );
}
