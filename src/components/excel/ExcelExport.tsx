import { Box, Button } from '@mui/material';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { setComponentNum } from 'src/redux/slices/component';
import { setSelectedId } from 'src/redux/slices/data';
import axiosInstance from 'src/utils/axios';

export default function ExcelExport() {
  const semester = useSelector((state) => state.data.semester);
  const dispatch = useDispatch();
  const setMenuButton = (data) => dispatch(setComponentNum(data));
  const Excels = [
    {
      name: '카테고리 엑셀 다운로드',
      endPoint: '/api/excel/download/category',
    },
    {
      name: '글로벌 항목 엑셀 다운로드',
      endPoint: '/api/excel/download/item',
    },
    {
      name: '전체 학기별 엑셀 다운로드',
      endPoint: '/api/excel/download/semester',
    },
    {
      name: '글로벌 카테고리와 글로벌 항목 엑셀 다운로드',
      endPoint: '/api/excel/download/global',
    },
    {
      name: '학기별 항목 엑셀 다운로드',
      endPoint: `/api/excel/download/semesterIn?semester=${semester}`,
    },
  ];

  const handleExcelExport = (e, endPoint) => {
    console.log(e.target.id, endPoint);
    setMenuButton(0);
    // axiosInstance.get(endPoint).then((res) => {
    //   console.log(res);
    //   alert(`${e.target.id} 다운로드가 완료되었습니다.`);
    // });
  };

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '10px', mt: '30px' }}>
      {Excels.map((Excel, index) => (
        /**
         * @brief 엑셀 다운로드 버튼
         * @description Link Masking (서버의 링크를 숨긴다.)
         */
        <Link as="/" href={'http://walab.handong.edu:8080/sw_mileage' + Excel.endPoint}>
          <Button
            variant="contained"
            key={index}
            id={Excel.name}
            onClick={(e) => handleExcelExport(e, Excel.endPoint)}
          >
            {Excel.name}
          </Button>
        </Link>
      ))}
    </Box>
  );
}
