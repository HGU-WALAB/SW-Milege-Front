import { Box, Button } from '@mui/material';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { setComponentNum } from 'src/redux/slices/component';
import { setSelectedId } from 'src/redux/slices/data';
import axiosInstance from 'src/utils/axios';
import ExcelImport from './ExcelImport';
import { useRouter } from 'next/router';

export default function ExcelExport() {
  const semester = useSelector((state) => state.data.semester);
  const dispatch = useDispatch();
  const setMenuButton = (data) => dispatch(setComponentNum(data));
  const { pathname } = useRouter();
  console.log('dd', pathname);
  const Excels = [
    {
      name: '카테고리 엑셀 다운로드',
      endPoint: '/api/excel/download/category',
      pathname: ['/mileage/category'],
    },
    {
      name: '글로벌 항목 엑셀 다운로드',
      endPoint: '/api/excel/download/item',
      pathname: ['/mileage/item/global'],
    },
    {
      name: '전체 학기별 엑셀 다운로드',
      endPoint: '/api/excel/download/semester',
      pathname: ['/mileage/item/semester'],
    },
    {
      name: '글로벌 카테고리와 글로벌 항목 엑셀 다운로드',
      endPoint: '/api/excel/download/global',
      pathname: ['/mileage/item/global', '/mileage/item/semester'],
    },
    {
      name: '학기별 항목 엑셀 다운로드',
      endPoint: `/api/excel/download/semesterIn?semester=${semester}`,
      pathname: ['/mileage/item/semester'],
    },
    {
      name: '선정 결과 양식 다운로드',
      endPoint: `api/excel/downlaod/mileageRecordFormat`,
      pathname: ['/mileage/result'],
    },
    {
      name: '신청 학생 목록 내보내기',
      endPoint: `/api/excel/download/applyIn?semeseter=2022-01`,
      pathname: ['/manage/register'],
    },
    {
      name: '신청 학생 목록 내보내기',
      endPoint: `/api/excel/download/applyIn?semeseter=2022-01`,
    },
    {
      name: '신청 학생 목록 내보내기',
      endPoint: `/api/excel/download/applyIn?semeseter=2022-01`,
    },
  ];

  const handleExcelExport = (e, endPoint) => {
    console.log(e.target.id, endPoint);
    // setMenuButton(0);
    axiosInstance.get(endPoint).then((res) => {
      console.log(res);
      alert(`${e.target.id} 다운로드가 완료되었습니다.`);
    });
  };

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '10px', mt: '30px' }}>
      {Excels.filter((AllExcel) => AllExcel.pathname?.includes(pathname)).map((Excel, index) => (
        /**
         * @brief 엑셀 다운로드 버튼
         * @description Link Masking (서버의 링크를 숨긴다.)
         */
        <Link key={index} href={'http://walab.handong.edu:8080/sw_mileage' + Excel.endPoint}>
          <Button
            type="button"
            variant="contained"
            id={Excel.name}
            onClick={(e) => handleExcelExport(e, Excel.endPoint)}
          >
            {Excel.name}
          </Button>
        </Link>
      ))}
      <ExcelImport />
      {/* 
      <ExcelImport type="semesterIn" label="학기별 항목 엑셀 업로드" />
      <ExcelImport type="mileageRecord" label="마일리지 기록 업로드" />
      <ExcelImport type="mileageScholarShip" label="선정 결과 업로드" /> */}
    </Box>
  );
}
