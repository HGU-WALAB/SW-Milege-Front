import { Autocomplete, TextField, styled } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory, setSid, setStudentName } from 'src/redux/slices/filter';

function removeDuplicates(arr) {
  return [...new Set(arr)];
}

const StyledAutocomplete = styled(Autocomplete)({
  minWidth: '200px',
});

export default function StudentIdAutoComplete() {
  const top100Films = removeDuplicates([
    '전체',
    ...useSelector((state) => state.filterList.studentList).map((student) => student.sid),
  ]);

  const studentId = useSelector((state) => state.filter.sid);
  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    dispatch(setSid(newValue));
  };
  return (
    <StyledAutocomplete
      size="small"
      value={studentId}
      disablePortal
      id="combo-box-demo"
      options={top100Films}
      renderInput={(params) => <TextField {...params} label="학번" />}
      onChange={(e, newValue) => handleChange(e, newValue)}
    />
  );
}
