import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import axiosInstance from 'src/utils/axios';
import { useRouter } from 'next/router';

interface IProps {
  type: string;
  label: string;
}

const Excels = [
  {
    name: '학기별 항목 엑셀 업로드',
    endPoint: '/api/excel/upload/semesterIn',
    pathname: ['/mileage/item/semester'],
  },
  {
    name: '마일리지 기록 업로드',
    endPoint: '/api/excel/upload/mileageRecord',
    pathname: ['/mileage/register'],
  },
  {
    name: '선정 결과 업로드',
    endPoint: '/api/excel/upload/mileageScholarShip',
    pathname: ['/mileage/result'],
  },
];

const apiEndPoint = (nowPathname) => {
  switch (nowPathname) {
    case '/mileage/item/semester':
      return '/api/excel/upload/semesterIn';
    case '/mileage/register':
      return '/api/excel/upload/mileageRecord';
    case '/mileage/result':
      return '/api/excel/upload/mileageScholarShip';
    default:
      return '';
  }
};

export default function ExcelImport() {
  const { pathname } = useRouter();

  const inputRef = useRef(null); // useRef 추가

  const handleExcelImport = async (selectedFile) => {
    const formData = new FormData();

    formData.append('file', selectedFile);

    console.log(selectedFile);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    // excelType
    // 1) semesterIn
    // 2) mileageRecord
    axiosInstance.post(`${apiEndPoint(pathname)}`, formData, config).then(
      (response) => {
        alert('엑셀 업로드에 성공했습니다.');
        console.log(response);
      },
      (error) => {
        alert('엑셀 업로드에 실패했습니다.');
        console.log(error);
      }
    );
  };

  const handleChange = async (e) => {
    handleExcelImport(e.target.files[0]);
  };

  const handleButtonClick = () => {
    inputRef.current.click(); // input 태그의 click 이벤트를 트리거
  };

  return (
    <>
      <input type="file" style={{ display: 'none' }} onChange={handleChange} ref={inputRef} />{' '}
      {/* input 태그를 숨김 */}
      {Excels.filter((AllExcel) => AllExcel.pathname.includes(pathname)).map((Excel, index) => (
        <Button variant="contained" onClick={handleButtonClick}>
          {Excel.name}
        </Button>
      ))}
    </>
  );
}
