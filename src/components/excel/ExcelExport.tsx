import { Box, Button } from '@mui/material';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { setComponentNum } from 'src/redux/slices/component';
import { setSelectedId } from 'src/redux/slices/data';
import axiosInstance from 'src/utils/axios';
import ExcelImport from './ExcelImport';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { PATH_API, PATH_PAGES } from 'src/routes/paths';
import { get } from 'lodash';

export default function ExcelExport() {
  const semester = useSelector((state) => state.filter.semester);

  const dispatch = useDispatch();
  const setMenuButton = (data) => dispatch(setComponentNum(data));
  const { pathname } = useRouter();

  const Excels = [
    {
      name: '카테고리 엑셀 다운로드',
      endPoint: PATH_API.excel.download.category,
      allowPaths: [PATH_PAGES.mileage.category],
    },
    {
      name: '학기별 항목 엑셀 다운로드',
      endPoint: PATH_API.excel.download.semesterItem(semester),
      allowPaths: [PATH_PAGES.mileage.semesterItem],
    },
    {
      name: '글로벌 항목 & 카테고리 엑셀 다운로드',
      endPoint: PATH_API.excel.download.globalItem,
      allowPaths: [PATH_PAGES.mileage.globalItem],
    },
    {
      name: '장학금 신청자 목록 다운로드',
      endPoint: PATH_API.excel.download.register(semester),
      allowPaths: [PATH_PAGES.manage.register],
    },
    {
      name: '학기별 항목 업로드 양식 다운로드',
      endPoint: PATH_API.excel.download.format.semesterItem,
      allowPaths: [PATH_PAGES.mileage.semesterItem],
    },
    {
      name: '선정 결과 업로드 양식 다운로드',
      endPoint: PATH_API.excel.download.format.result,
      allowPaths: [PATH_PAGES.mileage.result],
    },
    {
      name: '활동기록 업로드 양식 다운로드',
      endPoint: PATH_API.excel.download.format.record,
      allowPaths: [PATH_PAGES.mileage.record, PATH_PAGES.mileage.view],
    },
  ];

  const handleExcelExport = async (e, endPoint, name) => {
    try {
      // 파일 데이터 요청
      const response = await axiosInstance.get(endPoint, {
        responseType: 'blob',
      });

      // Blob에서 URL 생성
      const url = window.URL.createObjectURL(new Blob([response.data]));

      // 가상의 a 태그를 생성하여 다운로드
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${name}.xls`); // 파일 이름 설정
      document.body.appendChild(link);
      link.click();

      // 가상의 a 태그 제거
      document.body.removeChild(link);
    } catch (error) {
      console.error('다운로드 중 에러 발생', error);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '10px', mt: '30px' }}>
      {Excels.filter((AllExcel) =>
        AllExcel.allowPaths.some((path) => path?.includes(pathname))
      )?.map((Excel, index) => (
        <Button
          type="button"
          variant="contained"
          id={Excel.name}
          onClick={(e) => handleExcelExport(e, Excel.endPoint, Excel.name)}
        >
          {Excel.name}
        </Button>
      ))}
      <ExcelImport />
    </Box>
  );
}
