import { TablePagination } from '@mui/material';
import React from 'react';

interface IProps {
  page: number;
  count: number;
  rowsPerPage: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function CustomTablePagination({
  setPage,
  page,
  count,
  rowsPerPage,
  setRowsPerPage,
}: IProps) {
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  /**
   * @description 서버 와 클라이언트 사이드의 렌더링이 일치할 수 있도록 하기 위한 코드
   */

  const [hydrated, setHydrated] = React.useState(false);
  React.useEffect(() => {
    setHydrated(true);
  }, []);
  if (!hydrated) {
    // Returns null on first render, so the client and server match
    return null;
  }

  return (
    <TablePagination
      // rowsPerPageOptions={[25, 50, 75]}
      component="div"
      count={count || 0}  // count가 undefined일 때 기본값 0을 설정
      rowsPerPage={rowsPerPage}
      page={page}
      labelRowsPerPage="페이지당 행 수"
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
}
