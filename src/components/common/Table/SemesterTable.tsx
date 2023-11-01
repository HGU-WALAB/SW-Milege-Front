import * as React from 'react';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, TextField } from '@mui/material';
import axiosInstance from 'src/utils/axios';
import { formatDateToISOString, formatDateToISOStringExceptT } from 'src/utils/formatTime';
import { rowSelectionStateInitializer } from '@mui/x-data-grid/internals';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: 'darkGray',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

interface IGetAllSemesterWithStatus {
  count: number;
  list: ISemesterWithStatus[];
}

interface IISemesterWithStatus {
  id: number;
  name: string;
  status: string;
}

const FlexBox = styled(Box)({
  display: 'flex',
  gap: '10px',
  alignItems: 'center',
});

const headRow = ['번호', '학기 이름', '시작일', '마감일', '신청 상태', '설정'];

export default function SemesterTable({ data }: IGetAllSemesterWithStatus) {
  const [isModifying, setIsModifying] = React.useState<boolean[]>(
    new Array(data.list.length).fill(false)
  );
  const [startDate, setStartDate] = React.useState(formatDateToISOStringExceptT(new Date()));
  const [endDate, setEndDate] = React.useState(formatDateToISOStringExceptT(new Date()));

  const handleModify = (semesterId: number, rowIdx: number) => {
    if (isModifying[rowIdx]) {
      modifyApply(semesterId);
    }

    let newIsModifying = new Array(data.list.length).fill(false);
    newIsModifying[rowIdx] = true;

    setIsModifying(newIsModifying);
  };

  const handleCancel = (rowIdx: number) => {
    console.log(data.list.length);
    setIsModifying(new Array(data.list.length).fill(false));
  };

  const modifyApply = (semesterId: number) => {
    const modifyData = {
      semesterId: semesterId,
      applyStart: startDate,
      applyEnd: endDate,
    };
    if (window.confirm('정말 수정하시겠습니까??')) {
      axiosInstance.patch('/api/mileage/semesters/period', modifyData).then((res) => {
        console.log(res);
        setIsModifying(new Array(data.list.length).fill(false));
      });
    }
  };

  const handleEnd = (row) => {
    console.log(formatDateToISOString(new Date()));

    if (window.confirm('정말 마감하시겠습니까??')) {
      const endData = {
        semesterId: row.id,
        applyStart: row.applyStart,
        applyEnd: formatDateToISOString(new Date()),
      };
      console.log(endData);

      axiosInstance.patch('/api/mileage/semesters/period', endData).then((res) => console.log(res));
    }
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <StyledTableRow>
            {headRow.map((elem, index) => (
              <StyledTableCell key={index} align="left">
                {elem}
              </StyledTableCell>
            ))}
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {data.list.map((row, idx) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row" align="left">
                {idx + 1}
              </StyledTableCell>
              <StyledTableCell align="left">{row.name}</StyledTableCell>
              {isModifying[idx] ? (
                <StyledTableCell align="left">
                  <TextField
                    type="datetime-local"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </StyledTableCell>
              ) : (
                <StyledTableCell align="left">{row.status}</StyledTableCell>
              )}
              {isModifying[idx] ? (
                <StyledTableCell align="left">
                  <TextField
                    type="datetime-local"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </StyledTableCell>
              ) : (
                <StyledTableCell align="left">{row.status}</StyledTableCell>
              )}

              <StyledTableCell align="left">{row.status}</StyledTableCell>
              <StyledTableCell align="left">
                {isModifying[idx] ? (
                  <FlexBox>
                    <Button type="button" onClick={() => handleCancel(idx)} variant="contained">
                      취소
                    </Button>
                    <Button
                      type="button"
                      onClick={() => handleModify(row.id, idx)}
                      variant="outlined"
                    >
                      확인
                    </Button>
                  </FlexBox>
                ) : (
                  <FlexBox>
                    <Button
                      type="button"
                      onClick={() => handleModify(row.id, idx)}
                      variant="contained"
                    >
                      수정
                    </Button>
                    <Button type="button" onClick={() => handleEnd(row)} variant="outlined">
                      마감
                    </Button>
                  </FlexBox>
                )}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
