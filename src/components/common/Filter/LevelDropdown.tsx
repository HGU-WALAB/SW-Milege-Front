import { Box, FormControl, InputLabel, MenuItem, Select, styled } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLevel, setlevel } from 'src/redux/slices/filter';

const LEVELS = ['0', '1', '2', '3'];

export default function LevelDropdown() {
  const level = useSelector((state) => state.filter.level);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(level);
  }, [level]);

  const handleChange = (event: SelectChangeEvent) => {
    dispatch(setLevel(event.target.value));
    console.log(event.target.value);
  };

  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">권한</InputLabel>
        <Select
          size="small"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={level}
          label="학기"
          onChange={handleChange}
        >
          {LEVELS.map((level, index) => (
            <MenuItem value={level}>{level}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
