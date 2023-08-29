import { Autocomplete, TextField, styled } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory, setStudentName } from 'src/redux/slices/filter';

const StyledAutocomplete = styled(Autocomplete)({
  minWidth: '150px',
});

const top100Films = ['오인혁', '오인혁2', '한시온', '김민수', '장유진'];

export default function StudentNameAutoComplete() {
  const studentName = useSelector((state) => state.filter.studentName);
  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    dispatch(setStudentName(newValue));
  };
  return (
    <StyledAutocomplete
      size="small"
      value={studentName}
      disablePortal
      id="combo-box-demo"
      options={top100Films}
      renderInput={(params) => <TextField {...params} label="학생명" />}
      onChange={(e, newValue) => handleChange(e, newValue)}
    />
  );
}
