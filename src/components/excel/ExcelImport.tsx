import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import axiosInstance from 'src/utils/axios';

interface IProps {
  type: string;
  label: string;
}

export default function ExcelImport({ type, label }: IProps) {
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
    axiosInstance.post(`/api/excel/upload/${type}`, formData, config).then(
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
      <Button variant="contained" onClick={handleButtonClick}>
        {label}
      </Button>
    </>
  );
}
