import React from 'react';
import { useFormikContext } from 'formik';
import { useSelector } from 'react-redux';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { CATEGORYID, CATEGORY_MAX_POINTS } from 'src/assets/data/fields';

const CategorySelect = () => {
  const { setFieldValue } = useFormikContext();
  const categories = useSelector((state) => state.filterList.categoryList);

  const handleChange = (event) => {
    const categoryId = event.target.value;
    const category = categories.find(c => c.id === categoryId);
    const maxPoints = category ? category.maxPoints : 0;
    console.log(categoryId, category);
    setFieldValue(CATEGORYID, categoryId);
    setFieldValue(CATEGORY_MAX_POINTS, maxPoints);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="category-select-label">카테고리</InputLabel>
      <Select
        labelId="category-select-label"
        onChange={handleChange}
        required
      >
        {categories.map((category) => (
          <MenuItem key={category.id} value={category.id}>
            {category.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CategorySelect;
