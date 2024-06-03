import React, { useState, useEffect } from 'react';
import axiosInstance from 'src/utils/axios';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
import { ID } from 'src/assets/data/fields';
import { Form, Formik } from 'formik';

export default function TypeSpecificCategoryModal({ handleClose }) {
  const beforeData = useSelector((state) => state.modal.beforeData);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const typeID = beforeData?.[ID];
      if (typeID) {
        try {
          const response = await axiosInstance.get(`/api/mileage/items/types/${typeID}`);
          const { list } = response.data;
          setCategories(list);
        } catch (error) {
          console.error('하위 마일리지 항목 가져오기 실패했습니다.', error);
        }
      }
    };

    fetchCategories();
  }, [beforeData]);

  return (
    <Formik>
      <Form
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          padding: '20px',
          gap: '20px',
        }}
      >
        <ul>
          {categories.map((item, index) => (
            <li key={index}>
              {item.category.name} - {item.name}
            </li>
          ))}
        </ul>
        <Button
          onClick={handleClose}
        >
          닫기
        </Button>
      </Form>
    </Formik>
  );
}
