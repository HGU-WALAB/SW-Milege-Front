import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setCategoryType } from 'src/redux/slices/filter';

export default function CategoryTypeDropDown() {
  const Types = ['전체', 'A', 'B', 'C', 'D', 'E'];

  const categoryType = useSelector((state) => state.filter.categoryType);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    dispatch(setCategoryType(event.target.value));
  };

  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">타입</InputLabel>
        <Select
          size="small"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={categoryType}
          label="타입"
          onChange={handleChange}
        >
          {Types.map((type, index) => (
            <MenuItem key={index} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
