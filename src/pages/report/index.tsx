import { Tab, Tabs } from '@mui/material';
import React from 'react';

export default function index() {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      {' '}
      <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
        <Tab label="신청 현황" />
        <Tab label="카테 고리" />
        <Tab label="세부 항목" />
        <Tab label="Ranking" />
      </Tabs>
    </div>
  );
}
