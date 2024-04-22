import React, { useRef, useState } from 'react';
import { Box, Button } from '@mui/material';
import axiosInstance from 'src/utils/axios';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { AxiosRequestConfig } from 'axios';

interface ExcelImportProps {
  readonly endpoint: string;
  readonly buttonText?: string;
}

export default function ExcelImport({ endpoint, buttonText = '엑셀 업로드' }: ExcelImportProps) {
  const semester = useSelector((state) => state.filter.semester);
  const beforeData = useSelector((state) => state.modal.beforeData);
  const [apiEndPoint, setApiEndPoint] = useState('');
  const { pathname, reload } = useRouter();
  const inputRef = useRef(null);

  const handleExcelImport = async (selectedFile: File) => {
    const formData = new FormData();

    formData.append('file', selectedFile);

    if (semester) {
      formData.append('semester', semester);
    }

    if (beforeData?.semesterItemId) {
      formData.append('semesterItemId', beforeData.semesterItemId);
    }

    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    axiosInstance.post(apiEndPoint, formData, config).then(
      (response) => {
        alert('엑셀 업로드에 성공했습니다.');
        console.log(response);
        reload();
      },
      (error) => {
        alert('엑셀 업로드에 실패했습니다.');
        console.log(error);
      },
    );
  };

  const handleChange = async (e) => {
    handleExcelImport(e.target.files[0]);
  };

  const handleButtonClick = async (endPoint) => {
    await setApiEndPoint(endPoint);
    inputRef.current.click();
  };

  return <Box>
    <input type="file" style={{ display: 'none' }} onChange={handleChange} ref={inputRef} />
    <Button variant="contained" onClick={() => handleButtonClick(endpoint)}>
      {buttonText}
    </Button>
  </Box>;
}
