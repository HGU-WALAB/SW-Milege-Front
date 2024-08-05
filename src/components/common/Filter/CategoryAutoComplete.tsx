import { Autocomplete, TextField } from '@mui/material';
import { styled } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory } from 'src/redux/slices/filter';
import { removeDuplicates } from './Filtering';
import { RootState } from 'src/redux/rootReducer';
import { createSelector } from 'reselect'

export default function CategoryAutoComplete() {
  const selectCategoryList = (state: RootState) => state.filterList.categoryList;

  const selectCategoryNames = createSelector([selectCategoryList], (categoryList) => [
    '전체',
    ...removeDuplicates(categoryList.map((category) => category.name)),
  ]);

  const top100Films: string[] = useSelector(selectCategoryNames);
  const value: string = useSelector((state: RootState) => state.filter.category);
  const dispatch = useDispatch();

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string | null) => {
    if (newValue !== null) {
      dispatch(setCategory(newValue));
    }
  };

  return (
    <StyledAutocomplete
      size="small"
      value={value}
      disablePortal
      id="combo-box-demo"
      options={top100Films}
      renderInput={(params) => <TextField {...params} label="카테고리" />}
      onChange={handleChange}
    />
  );
}

const StyledAutocomplete = styled(Autocomplete)({
  minWidth: '200px',
});
