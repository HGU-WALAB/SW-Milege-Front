import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, TextField, TablePagination, Switch } from '@mui/material';
import axiosInstance from 'src/utils/axios';
import { formatDateToKorean } from 'src/utils/date/dateConverter';
import SWModal from 'src/components/common/modal/SWModal';
import { MANAGERTARGETSTUDENT } from 'src/assets/data/modal/modals';

const headRow = [
  '번호',
  '학기',
  '신청 시작일',
  '신청 마감일',
  '조회 시작일',
  '조회 마감일',
  '닫힘/열림',
  '설정',
  '대상관리',
];

export default function SemesterTable({ data }) {
  const [isModifying, setIsModifying] = useState(new Array(data.list.length).fill(false));
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [viewStartDate, setViewStartDate] = useState('');
  const [viewEndDate, setViewEndDate] = useState('');
  const [isOpen, setIsOpen] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleModify = (semesterId, rowIdx) => {
    if (isModifying[rowIdx]) {
      modifyApply(semesterId);
    } else {
      setStartDate(data.list[rowIdx].applyStart);
      setEndDate(data.list[rowIdx].applyEnd);
      setViewStartDate(data.list[rowIdx].viewStart);
      setViewEndDate(data.list[rowIdx].viewEnd);
      setIsOpen(data.list[rowIdx].isOpen);

      const newIsModifying = new Array(data.list.length).fill(false);
      newIsModifying[rowIdx] = true;
      setIsModifying(newIsModifying);
    }
  };

  const handleCancel = () => {
    setIsModifying(new Array(data.list.length).fill(false));
  };

  const modifyApply = async (semesterId) => {
    const modifyData = {
      semesterId,
      applyStart: startDate,
      applyEnd: endDate,
      viewStart: viewStartDate,
      viewEnd: viewEndDate,
      isOpen,
    };
    if (window.confirm('정말 수정하시겠습니까?')) {
      // 실제 API 요청은 여기에 추가될 예정
      console.log('수정 데이터:', modifyData);
      setIsModifying(new Array(data.list.length).fill(false));
      window.location.reload();
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="semester table">
        <TableHead>
          <TableRow>
            {headRow.map((elem, index) => (
              <StyledTableCell key={index} align="left">
                {elem}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.list.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, idx) => (
            <TableRow key={row.id}>
              <StyledTableCell component="th" scope="row" align="left">
                {page * rowsPerPage + idx + 1}
              </StyledTableCell>
              <StyledTableCell align="left">{row.name}</StyledTableCell>
              {isModifying[idx] ? (
                <>
                  <StyledTableCell align="left">
                    <TextField
                      type="datetime-local"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value + ':00')}
                      sx={{ width: '200px' }} 
                    />
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <TextField
                      type="datetime-local"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value + ':00')}
                      sx={{ width: '200px' }} 
                    />
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <TextField
                      type="datetime-local"
                      value={viewStartDate}
                      onChange={(e) => setViewStartDate(e.target.value + ':00')}
                      sx={{ width: '200px' }} 
                    />
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <TextField
                      type="datetime-local"
                      value={viewEndDate}
                      onChange={(e) => setViewEndDate(e.target.value + ':00')}
                      sx={{ width: '200px' }} 
                    />
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <Switch
                      checked={isOpen}
                      onChange={(e) => setIsOpen(e.target.checked)}
                      inputProps={{ 'aria-label': '닫힘/열림' }}
                    />
                  </StyledTableCell>
                </>
              ) : (
                <>
                  <StyledTableCell align="left">
                    {formatDateToKorean(row.applyStart)}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {formatDateToKorean(row.applyEnd)}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {formatDateToKorean(row.viewStart)}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {formatDateToKorean(row.viewEnd)}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {row.isOpen ? '열림' : '닫힘'}
                  </StyledTableCell>
                </>
              )}
              <StyledTableCell align="left">
                {isModifying[idx] ? (
                  <Box display="flex" gap="10px">
                    <Button onClick={handleCancel} variant="contained">
                      취소
                    </Button>
                    <Button onClick={() => handleModify(row.id, idx)} variant="outlined">
                      확인
                    </Button>
                  </Box>
                ) : (
                  <Button onClick={() => handleModify(row.id, idx)} variant="contained">
                    수정
                  </Button>
                )}
              </StyledTableCell>
              <StyledTableCell>
                <SWModal type={MANAGERTARGETSTUDENT} />
              </StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
        <TablePagination
          rowsPerPageOptions={[5, 10, 20]}
          count={data.list.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Table>
    </TableContainer>
  );
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.grey[200],
    color: theme.palette.text.secondary,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
