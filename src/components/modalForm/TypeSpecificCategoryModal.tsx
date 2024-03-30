import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import { ID } from 'src/assets/data/fields';

// 임시 하위 카테고리 더미 데이터
const dummyCategories = {
  1: ['하위카테고리 1-1', '하위카테고리 1-2', '하위카 1-3'],
  2: ['하위카테고리 2-1', '하위카테고리 2-2'],
  3: ['하위카테고리 3-1', '하위카테고리 3-2', '하위카테고리 3-3', '하위카테고리 3-4'],
  4: ['하위카테고리 4-1', '하위카테고리 4-2', '하위카테고리 4-3', '하위카테고리 4-4'],
  5: ['하위카테고리 5-1', '하위카테고리 5-2', '하위카테고리 5-3', '하위카테고리 5-4']
};

export default function TypeSpecificCategoryModal({ handleClose }) {
  const beforeData = useSelector((state) => state.modal.beforeData);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const typeID = beforeData?.[ID];
    const updatedCategories = dummyCategories[typeID] || []; 
    setCategories(updatedCategories);
  }, [beforeData]);

  return (
    <div>
      <ul>
        {categories.map((category, index) => (
          <li key={index}>{category}</li>
        ))}
      </ul>
      <Button onClick={handleClose}>닫기</Button>
    </div>
  );
}
