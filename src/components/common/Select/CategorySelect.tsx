import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Field, useFormikContext } from 'formik';
import { useSelector } from 'react-redux';
import { CATEGORYID, CATEGORY_MAX_POINTS } from 'src/assets/data/fields';

export default function CategorySelect() {
  const categories = useSelector((state) => state.filterList.categoryList);
  const { setFieldValue } = useFormikContext();

  const handleCategoryChange = (event) => {
    const selectedCategoryId = event.target.value;
    const selectedCategory = categories.find(category => category.id === selectedCategoryId);
    setFieldValue(CATEGORYID, selectedCategoryId);
    if (selectedCategory) {
      setFieldValue(CATEGORY_MAX_POINTS, selectedCategory.maxPoints);
    }
  };

  const MySelect = ({ field, form, ...props }) => (
    <Select
      {...field}
      {...props}
      onChange={handleCategoryChange} 
    >
      {categories.map((category) => (
        <MenuItem key={category.id} value={category.id}>
          {category.name}
        </MenuItem>
      ))}
    </Select>
  );

  return (
    <FormControl sx={{ width: '100%' }}>
      <InputLabel id="category-select-label">카테고리</InputLabel>
      <Field as={MySelect} name={CATEGORYID} label="카테고리" required />
    </FormControl>
  );
}
