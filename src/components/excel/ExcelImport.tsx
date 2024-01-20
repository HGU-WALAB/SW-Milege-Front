import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import axiosInstance from 'src/utils/axios';
import { useRouter } from 'next/router';
import { PATH_API, PATH_PAGES } from 'src/routes/paths';

interface IProps {
  type: string;
  label: string;
}

const Excels = [
  {
    name: '학기별 항목 엑셀 업로드',
    endPoint: PATH_API.excel.upload.semesterItem,
    pathname: [PATH_PAGES.mileage.semesterItem],
  },
  {
    name: '마일리지 기록 업로드',
    endPoint: PATH_API.excel.upload.record,
    pathname: [PATH_PAGES.mileage.view, PATH_PAGES.mileage.register],
  },
  {
    name: '선정 결과 업로드',
    endPoint: PATH_API.excel.upload.result,
    pathname: [PATH_PAGES.mileage.result],
  },
];

export default function ExcelImport() {
  const [apiEndPoint, setApiEndPoint] = useState('');
  const { pathname } = useRouter();

  const inputRef = useRef(null);

  const handleExcelImport = async (selectedFile) => {
    const formData = new FormData();

    formData.append('file', selectedFile);

    console.log(selectedFile);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    axiosInstance.post(apiEndPoint, formData, config).then(
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

  const handleButtonClick = async (endPoint) => {
    await setApiEndPoint(endPoint);
    inputRef.current.click();
  };

  return (
    <>
      <input type="file" style={{ display: 'none' }} onChange={handleChange} ref={inputRef} />{' '}
      {/* input 태그를 숨김 */}
      {Excels.filter((AllExcel) => AllExcel.pathname.includes(pathname)).map((Excel, index) => (
        <Button variant="contained" onClick={() => handleButtonClick(Excel.endPoint)}>
          {Excel.name}
        </Button>
      ))}
    </>
  );
}
