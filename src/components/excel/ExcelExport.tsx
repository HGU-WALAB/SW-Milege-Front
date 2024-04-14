import { Box, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setComponentNum } from 'src/redux/slices/component';
import axiosInstance from 'src/utils/axios';
import { useRouter } from 'next/router';
import { PATH_API, PATH_PAGES } from 'src/routes/paths';

export default function ExcelExport() {
  const semester = useSelector((state) => state.filter.semester);

  const dispatch = useDispatch();
  const setMenuButton = (data) => dispatch(setComponentNum(data));
  const { pathname } = useRouter();

  const Excels = [
    // TODO: (백엔드) 엑셀 데이터 다운로드 구현후 주석 해제하기.
    // {
    //   name: '엑셀로 내려받기',
    //   endPoint: PATH_API.excel.download.category,
    //   allowPaths: [PATH_PAGES.mileage.category],
    // },
    // {
    //   name: '엑셀로 내려받기',
    //   endPoint: PATH_API.excel.download.semesterItem(semester),
    //   allowPaths: [PATH_PAGES.mileage.semesterItem],
    // },
    // {
    //   name: '엑셀로 내려받기',
    //   endPoint: PATH_API.excel.download.globalItem,
    //   allowPaths: [PATH_PAGES.mileage.globalItem],
    // },
    {
      name: '장학금 신청자 목록 다운로드',
      endPoint: PATH_API.excel.download.register(semester),
      allowPaths: [PATH_PAGES.manage.register],
    },
    {
      name: '엑셀양식 다운로드',
      endPoint: PATH_API.excel.download.format.item,
      allowPaths: [PATH_PAGES.mileage.globalItem],
    },
    {
      name: '선정 결과 업로드 양식 다운로드',
      endPoint: PATH_API.excel.download.format.result,
      allowPaths: [PATH_PAGES.mileage.result],
    },
    {
      name: '엑셀양식 다운로드',
      endPoint: PATH_API.excel.download.format.record,
      allowPaths: [PATH_PAGES.mileage.register],
    },
  ];

  const handleExcelExport = async (e, endPoint, name) => {
    try {
      const response = await axiosInstance.get(endPoint, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const filename = response.headers['content-disposition'].split('attachment;filename=', 2)[1];

      const link = document.createElement('a');
      link.href = url;
      link.download = filename;

      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('다운로드 중 에러 발생', error);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '10px', mt: '30px' }}>
      {Excels.filter((AllExcel) =>
        AllExcel.allowPaths.some((path) => path?.includes(pathname)),
      )?.map((Excel, index) => (
        <Button
          type="button"
          variant="contained"
          id={Excel.name}
          onClick={(e) => handleExcelExport(e, Excel.endPoint, Excel.name)}>
          {Excel.name}
        </Button>
      ))}
    </Box>
  );
}
