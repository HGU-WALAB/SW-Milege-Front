import { Autocomplete, TextField } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory, setStudentName } from 'src/redux/slices/filter';

export default function StudentNameAutoComplete() {
  const top100Films = ['오인혁', '오인혁2', '한시온', '김민수', '장유진'];

  const studentName = useSelector((state) => state.filter.studentName);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(studentName);
  }, [studentName]);

  return (
    <Autocomplete
      sx={{ minWidth: '200px' }}
      value={studentName}
      disablePortal
      id="combo-box-demo"
      options={top100Films}
      renderInput={(params) => <TextField {...params} label="학생명" />}
      onChange={(e, newValue) => dispatch(setStudentName(newValue))}
    />
  );
}
