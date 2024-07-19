import { Box, Button } from '@mui/material';
import axiosInstance from 'src/utils/axios';

interface ExcelExportProps {
  readonly endpoint: string;
  readonly queryParams?: object;
  readonly buttonText?: string;
}

export default function ExcelExport({
  endpoint,
  queryParams,
  buttonText = '엑셀로 내려받기',
}: ExcelExportProps) {
  const handleExcelExport = async (apiEndpoint: string) => {
    try {
      const response = await axiosInstance.get(apiEndpoint, {
        responseType: 'blob',
        params: queryParams,
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
      <Button variant="contained" onClick={() => handleExcelExport(endpoint)}>
        {buttonText}
      </Button>
    </Box>
  );
}
