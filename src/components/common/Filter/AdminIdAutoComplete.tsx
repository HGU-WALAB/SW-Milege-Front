import { Autocomplete, TextField, styled } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAid, setCategory, setStudentName } from 'src/redux/slices/filter';

function removeDuplicates(arr) {
  return [...new Set(arr)];
}

const StyledAutocomplete = styled(Autocomplete)({
  minWidth: '200px',
});

export default function AdminIdAutoComplete() {
  const top100Films = removeDuplicates([
    '전체',
    ...useSelector((state) => state.filterList.adminList).map((admin) => admin.aid),
  ]);

  const adminId = useSelector((state) => state.filter.aid);
  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    dispatch(setAid(newValue));
  };
  return (
    <StyledAutocomplete
      size="small"
      value={adminId}
      disablePortal
      id="combo-box-demo"
      options={top100Films}
      renderInput={(params) => <TextField {...params} label="직번" />}
      onChange={(e, newValue) => handleChange(e, newValue)}
    />
  );
}
