import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { ADD, ITEM, NUM, REGISTER_NUM, SEMESTER } from '../../assets/data/fields';
import {
  STUDENT_ID,
  POINTS,
  DESCRIPTION1,
  DESCRIPTION2,
  STUDENT_NAME,
} from 'src/assets/data/fields';

// function createData(
//   name: string,
//   calories: number,
//   fat: number,
//   carbs: number,
//   protein: number,
//   price: number,
// ) {
//   return {
//     name,
//     calories,
//     fat,
//     carbs,
//     protein,
//     price,
//     history: [
//       {
//         date: '2020-01-05',
//         customerId: '11091700',
//         amount: 3,
//       },
//       {
//         date: '2020-01-02',
//         customerId: 'Anonymous',
//         amount: 1,
//       },
//     ],
//   };
// }

function Row({ row }) {
  console.log('dd', row);
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {[row[NUM], row[SEMESTER], row[ITEM], row[REGISTER_NUM], row[ADD]].map(
          (outerBodyElement, index) => (
            <TableCell align="left" key={index}>
              {outerBodyElement}
            </TableCell>
          )
        )}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                등록된 학생
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    {['이름', '학번', '포인트', '추가설명1', '추가설명2', '관리'].map(
                      (headElement) => (
                        <TableCell>{headElement}</TableCell>
                      )
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.students.map((student) => (
                    <TableRow key={student.studentId}>
                      {[
                        student[STUDENT_NAME],
                        student[STUDENT_ID],
                        student[POINTS],
                        student[DESCRIPTION1],
                        student[DESCRIPTION2],
                        student['edit'],
                      ].map((bodyElement, index) => (
                        <TableCell component="th" scope="row" key={index}>
                          {bodyElement}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
//   createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
//   createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
//   createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
// ];

export default function CollapsibleTable({ rows }) {
  console.log(rows);
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            {['', '번호', '학기', '항목', '등록 학생 수', '추가'].map((outerHeadElement, index) => (
              <TableCell align="left" key={index}>
                {outerHeadElement}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.item} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
