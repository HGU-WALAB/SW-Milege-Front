import { Tab, Tabs } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setChartNum } from 'src/redux/slices/chart';

export default function ReportTabs() {
  const chartNum = useSelector((state) => state.chart.chartNum);
  const dispatch = useDispatch();

  const navigate2Page = (idx) => {
    switch (idx) {
      case 0:
        return '/report';
      case 1:
        return '/report/category';
      case 2:
        return '/report/item';
      case 3:
        return '/report/ranking';
    }
  };

  const handleChange = (e, newValue) => {
    dispatch(setChartNum(newValue));
    navigate2Page(newValue);
  };

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  return (
    <div>
      {' '}
      <Tabs value={chartNum} onChange={handleChange} aria-label="basic tabs example">
        <Tab label="신청 현황" {...a11yProps(0)} />
        <Tab label="카테 고리" {...a11yProps(1)} />
        <Tab label="세부 항목" {...a11yProps(2)} />
        <Tab label="Ranking" {...a11yProps(3)} />
      </Tabs>
    </div>
  );
}
