import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import axiosInstance from 'src/utils/axios';

export default function ExcelImport() {
  const [selectedFile, setSelectedFile] = useState();
  const inputRef = useRef(null); // useRef 추가

  const handleSubmit = async (e) => {
    // e.preventDefault();

    const formData = new FormData();

    formData.append('file', selectedFile);

    console.log(selectedFile);
    // console.log(importCourses(formData));

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    // excelType
    // 1) semesterIn
    // 2) mileageRecord
    axiosInstance.post(`/api/excel/upload/semesterIn`, formData, config).then(
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

  const handleChange = (event) => {
    setSelectedFile(event.currentTarget.files[0]);
    handleSubmit(event);
  };

  const handleButtonClick = () => {
    inputRef.current.click(); // input 태그의 click 이벤트를 트리거
  };

  return (
    <>
      <input type="file" style={{ display: 'none' }} onChange={handleChange} ref={inputRef} />{' '}
      {/* input 태그를 숨김 */}
      <Button variant="contained" onClick={handleButtonClick}>
        {' '}
        {/* 버튼 클릭 핸들러 수정 */}
        엑셀 업로드
      </Button>
    </>
  );
}
