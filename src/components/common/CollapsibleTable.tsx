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
import { ADD, CATEGORY_NAME, ITEM, NUM, REGISTER_NUM, SEMESTER } from '../../assets/data/fields';
import {
  STUDENT_ID,
  POINTS,
  DESCRIPTION,
  STUDENT_NAME,
} from 'src/assets/data/fields';
import { styled } from '@mui/material';
import TitleAndRefreshButton from './Title';
import Filtering from './Filter/Filtering';
import Title from './Title';

const ResponsiveHeadCell = styled(TableCell)({
  minWidth: '110px',
});

function Row({ row }) {
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {[row[NUM], row[SEMESTER], row[CATEGORY_NAME], row[ITEM], row[REGISTER_NUM], row[ADD]].map(
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
                    {['이름', '학번', '마일리지', '비고', '관리'].map(
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
                        student[DESCRIPTION],
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

export default function CollapsibleTable({ rows, type }) {
  return (
    <>
      <Title type={type} />

      <TableContainer component={Paper} sx={{ overflowX: 'scroll' }}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              {['', '번호', '학기', '카테고리명', '항목', '등록 학생 수', '추가'].map(
                (outerHeadElement, index) => (
                  <ResponsiveHeadCell align="left" key={index}>
                    {outerHeadElement}
                  </ResponsiveHeadCell>
                )
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row key={row.item} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
