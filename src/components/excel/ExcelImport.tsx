import React, { useRef, useState } from 'react';
import { Button } from '@mui/material';
import axiosInstance from 'src/utils/axios';
import { useRouter } from 'next/router';
import { PATH_API, PATH_PAGES } from 'src/routes/paths';
import { useSelector } from 'react-redux';

export default function ExcelImport() {
  const semester = useSelector((state) => state.filter.semester);
  const selected: Array<number> = useSelector((state) => state.table.selectedId);
  const [apiEndPoint, setApiEndPoint] = useState('');
  const { pathname } = useRouter();
  const inputRef = useRef(null);

  const Excels = [
    {
      name: '마일리지 세부 항목 업로드',
      endPoint: PATH_API.excel.upload.item,
      pathname: [PATH_PAGES.mileage.globalItem],
    },
    {
      name: '마일리지 기록 업로드',
      endPoint: PATH_API.excel.upload.record(selected),
      pathname: [PATH_PAGES.mileage.register],
    },
    {
      name: '마일리지 장학금 선정 결과 업로드',
      endPoint: PATH_API.excel.upload.result,
      pathname: [PATH_PAGES.mileage.result],
    },
  ];

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
