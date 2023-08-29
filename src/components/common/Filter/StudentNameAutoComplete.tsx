import { Autocomplete, TextField, styled } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory, setStudentName } from 'src/redux/slices/filter';

/**
 * @brief 중복 제거 함수
 * @param 중복 있는 어레이
 * @returns 중복 제거된 어레이
 */

function removeDuplicates(arr) {
  return [...new Set(arr)];
}

const StyledAutocomplete = styled(Autocomplete)({
  minWidth: '150px',
});

export default function StudentNameAutoComplete() {
  const top100Films = removeDuplicates([
    '전체',
    ...useSelector((state) => state.filterList.studentList).map((student) => student.name),
  ]);

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
