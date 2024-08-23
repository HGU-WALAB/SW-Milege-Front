import React, { useState, useEffect } from 'react';
import axiosInstance from 'src/utils/axios';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
import { ID } from 'src/assets/data/fields';
import { Form, Formik, FormikHelpers, FormikValues } from 'formik';
import { RootState } from 'src/redux/store';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface Category {
  category: {
    name: string;
  };
  name: string;
}

export default function TypeSpecificCategoryModal({ handleClose }) {
  const beforeData = useSelector((state: RootState) => state.modal.beforeData);
  const [categories, setCategories] = useState<Category[]>([]);

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

  const initialValues: FormikValues = {};

  const handleSubmit = (values: FormikValues, { setSubmitting }: FormikHelpers<FormikValues>) => {
    setSubmitting(false);
    handleClose();
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <ul style={{ listStyle: 'inside', padding: 30 }}>
          {categories.map((item, index) => (
            <li style={{ paddingBottom: 8 }} key={index}>
              <Typography variant="button">
                {item.category.name} - {item.name}
              </Typography>
            </li>
          ))}
        </ul>
        <Button variant="contained" color="primary" onClick={handleClose}>
          닫기
        </Button>
      </Form>
    </Formik>
  );
}
