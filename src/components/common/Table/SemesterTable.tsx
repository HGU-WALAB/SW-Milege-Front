import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button } from '@mui/material';
import axiosInstance from 'src/utils/axios';
import { formatDateToISOString } from 'src/utils/formatTime';
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

const [isModifing, setIsModifing] = React.useState(false);
const [startDate, setStartDate] = React.useState();
const [endDate, setEndDate] = React.useState();

const handleModify = (semesterId: number) => {
  if (isModifing) {
    modifyApply(semesterId);
  }

  setIsModifing(true);
};

const handleCancel = () => {
    setIsModifing(false);
}

const modifyApply = (semesterId : number) => {
  const modifyData = {
    semesterId: semesterId,
    applyStart: startDate,
    applyEnd: endDate,
  };
  if(window.confirm("정말 수정하시겠습니까??")){
    axiosInstance.patch('/api/mileage/semesters/period', endData).then((res) => 
    console.log(res);
    setIsModifing(false);
  );
  }
  
};

const handleEnd = (row) => {
  console.log(formatDateToISOString(new Date()));

  if(window.confirm("정말 마감하시겠습니까??")){
    const endData = {
        semesterId: row.id,
        applyStart: row.applyStart,
        applyEnd: formatDateToISOString(new Date()),
      };
      console.log(endData);
    
      axiosInstance.patch('/api/mileage/semesters/period', endData).then((res) => console.log(res));
  }
  
};

const headRow = ['번호', '학기 이름', '신청 상태', '설정'];

export default function SemesterTable({ data }: IGetAllSemesterWithStatus) {
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
              <StyledTableCell align="left">{row.status}</StyledTableCell>
              <StyledTableCell align="left">
                {isModifing ? ( 
                <FlexBox>
                    <Button type="button" onClick={handleCancel} variant="contained">
                       취소
                     </Button>
                     <Button type="button" onClick={() => handleModify(row.id)} variant="outlined">
                       확인
                     </Button>
                   </FlexBox>) : (
                     <FlexBox>
                     <Button type="button" onClick={() => handleModify(row.id)} variant="contained">
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
