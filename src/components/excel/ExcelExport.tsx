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
  ];

  const handleExcelExport = async (e, endPoint) => {
    console.log(e.target.id, endPoint);
    // setMenuButton(0);
    // const response = await axiosInstance.get(endPoint , {
    //   responseType: 'blob',
    // });

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
      link.setAttribute('download', '학기별 항목 엑셀.xls'); // 파일 이름 설정
      document.body.appendChild(link);
      link.click();

      // 가상의 a 태그 제거
      document.body.removeChild(link);
    } catch (error) {
      console.error('다운로드 중 에러 발생', error);
    }
    // .then((res) => {
    //   console.log(res);
    //   alert(`${e.target.id} 다운로드가 완료되었습니다.`);
    // });
  };

  //   const downloadFile = async () => {
  //     try {
  //         // 파일 데이터 요청
  //         const response = await axiosInstance.get('/your-endpoint', {
  //             responseType: 'blob', // 중요: Blob 형태로 응답 받음
  //         });

  //         // Blob에서 URL 생성
  //         const url = window.URL.createObjectURL(new Blob([response.data]));

  //         // 가상의 a 태그를 생성하여 다운로드
  //         const link = document.createElement('a');
  //         link.href = url;
  //         link.setAttribute('download', 'your_filename.xlsx'); // 파일 이름 설정
  //         document.body.appendChild(link);
  //         link.click();

  //         // 가상의 a 태그 제거
  //         document.body.removeChild(link);
  //     } catch (error) {
  //         console.error('다운로드 중 에러 발생', error);
  //     }
  // };

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '10px', mt: '30px' }}>
      {Excels.filter((AllExcel) => AllExcel.pathname?.includes(pathname)).map((Excel, index) => (
        /**
         * @brief 엑셀 다운로드 버튼
         * @description Link Masking (서버의 링크를 숨긴다.)
         */
        // <Link key={index} href={'http://walab.handong.edu:8080/sw_mileage' + Excel.endPoint}>
        <Button
          type="button"
          variant="contained"
          id={Excel.name}
          onClick={(e) => handleExcelExport(e, Excel.endPoint)}
        >
          {Excel.name}
        </Button>
        // </Link>
      ))}
      <ExcelImport />
      {/* 
      <ExcelImport type="semesterIn" label="학기별 항목 엑셀 업로드" />
      <ExcelImport type="mileageRecord" label="마일리지 기록 업로드" />
      <ExcelImport type="mileageScholarShip" label="선정 결과 업로드" /> */}
    </Box>
  );
}
