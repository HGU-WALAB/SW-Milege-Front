import * as React from 'react';

import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';

import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { StarIcon } from 'src/theme/overrides/CustomIcons';
import {
  Autocomplete,
  TablePagination,
  TextField,
  useMediaQuery,
  styled,
  Button,
} from '@mui/material';
import CustomTablePagination from './Table/CustomTablePagination';

import { MileageCategoryBoard } from '../../assets/data/board/mileageCategoryBoard';
import { CATEGORY, NUM, ORDER_IDX } from '../../assets/data/fields';

import Modal from './modal/SWModal';
import CustomModal1 from '../Template/CustomModal';
import SWModal from './modal/SWModal';
import {
  ADDCATEGORY,
  ADDGLOBALITEM,
  ADDITEM,
  ADDMANAGER,
  ADDMILEAGEREGISTER,
  ADDSTUDENT,
  ADDTYPE,
  EDITCATEGORY,
  MAGICIANSEMESTERITEM,
} from 'src/assets/data/modal/modals';
import { useDispatch, useSelector } from 'react-redux';
import { dispatch } from 'src/redux/store';
import { setCategory } from 'src/redux/slices/filter';
import CategoryAutoComplete from './Filter/CategoryAutoComplete';
import { useEffect } from 'react';
import { setMileageCategoryList } from 'src/redux/slices/data';
import SemesterDropdown from './Filter/SemesterDropdown';
import { id } from 'date-fns/locale';

import IsVisibleDropdown from './Filter/IsVisibleDropdown';
import ItemAutoComplete from './Filter/ItemAutoComplete';
import SelectedItemsDeleteIcon from './Table/SelectedItemsDeleteIcon';
import StudentNameDropdown from './Filter/StudentNameAutoComplete';
import GradeDropdown from './Filter/GradeDropdown';
import DepartmentDropdown from './Filter/DepartmentDropDown';
import { useRouter } from 'next/router';
import Filtering from './Filter/Filtering';
import Link from 'next/link';
import { setComponentNum } from 'src/redux/slices/component';
import TitleAndRefreshButton from './Title/Title';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import axiosInstance from 'src/utils/axios';
import { setSelectedId } from 'src/redux/slices/table';
import Title from './Title/Title';
import {
  END_ROUTE_CATEGORY,
  END_ROUTE_MANAGE_REGISTER,
  END_ROUTE_MILEAGE_REGISTER,
  END_ROUTE_RESULT,
  END_ROUTE_SEMESTER_ITEM,
  END_ROUTE_VIEW,
  REGISTER,
  RESULT,
  SEMESTER_ITEM,
  VIEW,
} from 'src/routes/paths';

/**
 *  @brief 반응형 구축
 */

const ResponsiveTable = styled(Paper)({
  minWidth: '1200px',
  overflowX: 'scroll',
  padding: '20px',
});

const ResponsiveHeaderCell = styled(TableCell)({
  minWidth: '110px',
});

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array?.map((el, index) => [el, index] as [T, number]);
  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis?.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

/**
 * @number 1번 목록
 * @description 마일리지 카테고리 리스트
 */

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
  headCells: HeadCell[];
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { headCells, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              /**
               * @breif 반응형
               */
              align={'right'}
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;

  type?: string;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected, type } = props;

  // example

  const dispatch = useDispatch();

  return (
    <Box>
      <Title type={type} />

      {/* 필터링 */}

      {/* 카테고리 필터링 */}
      <Filtering />

      {/* 학기 필터링 */}

      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'end',
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
          }),
        }}
      >
        {numSelected > 0 && (
          <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
            {numSelected} selected
          </Typography>
        )}
        {numSelected > 0 && (
          <Tooltip title="Delete">
            <IconButton>
              <SelectedItemsDeleteIcon type={type} />
            </IconButton>
          </Tooltip>
        )}

        {type === '학기별 마일리지 세부 항목' && (
          <SWModal type={typeConverter('학기별 마일리지 세부 항목 마법사')} />
        )}
        <SWModal type={typeConverter(type)} />
      </Toolbar>
    </Box>
  );
}

/**
 *  @brief 타입을 add modal에 알맞는 형태로 변환 시켜줌
 */
const typeConverter = (type) => {
  switch (type) {
    case '마일리지 타입':
      return ADDTYPE;
    case '마일리지 카테고리':
      return ADDCATEGORY;
    case '학기별 마일리지 세부 항목':
      return ADDITEM;
    case '마일리지 세부 항복':
      return ADDGLOBALITEM;

    case '학기별 마일리지 세부 항목 마법사':
      return MAGICIANSEMESTERITEM;
    case '마일리지 조회':
      return ADDMILEAGEREGISTER;
  }
};

/**
 *
 * @brief 테이블 컴포넌트
 * @param originalRows 전체 데이터를 가지고 있는 배열
 * @param headCells 테이블 카테고리들
 * @param type 테이블 타입
 */

export default function EnhancedTable({ originalRows, headCells, type }) {
  const { pathname } = useRouter();

  const checkIsPageRelatedWithSemester = () => {
    if (
      pathname.includes(END_ROUTE_VIEW) ||
      pathname.includes(END_ROUTE_SEMESTER_ITEM) ||
      pathname.includes(END_ROUTE_MILEAGE_REGISTER) ||
      pathname.includes(END_ROUTE_MANAGE_REGISTER) ||
      pathname.includes(END_ROUTE_RESULT)
    )
      return true;
    else return false;
  };

  function sortByDescOrderIdx(data) {
    if (!data || data.length === 0) return;

    // Create a shallow copy of the array
    const sortedData = [...data];

    // Sort the copied array
    return sortedData.sort((a, b) => (b?.orderIdx ?? 0) - (a?.orderIdx ?? 0));
  }

  /**
   * @field 필터링을 거치고 보여주는 값들 (rows)
   */

  const [rows, setRows] = React.useState(originalRows);

  /**
   * @brief 필터링 요소
   */

  const sid = useSelector((state) => state.filter.sid);
  const aid = useSelector((state) => state.filter.aid);
  const category = useSelector((state) => state.filter.category);
  const semester = useSelector((state) => state.filter.semester);
  const isVisible = useSelector((state) => state.filter.isVisible);
  const item = useSelector((state) => state.filter.item);
  const studentName = useSelector((state) => state.filter.studentName);
  const grade = useSelector((state) => state.filter.grade);
  const department = useSelector((state) => state.filter.department);
  const categoryType = useSelector((state) => state.filter.categoryType);

  /**
   * @brief 필터링
   */

  useEffect(() => {
    let copyRows = originalRows;
    if (category && category !== '전체') {
      copyRows = copyRows?.filter((row) => row.category === category);
    }
    if (semester && checkIsPageRelatedWithSemester()) {
      copyRows = copyRows?.filter((row) => row.semester === semester);
    }
    if (isVisible !== '전체') {
      copyRows = copyRows?.filter((row) => row.isVisible === isVisible);
    }
    if (item && item !== '전체') {
      copyRows = copyRows.filter((row) => row?.itemName === item || row?.item === item);
    }
    if (studentName && studentName !== '전체') {
      copyRows = copyRows?.filter(
        (row) => row.name === studentName || row.studentName === studentName
      );
    }
    if (sid && sid !== '전체') {
      copyRows = copyRows?.filter(
        (row) => row.sid === sid || row.id === sid || row.studentId === sid
      );
    }
    if (aid && aid !== '전체') {
      copyRows = copyRows?.filter(
        (row) => aid === row.aid || aid === row.id || aid === row.adminId
      );
    }
    if (grade && grade !== '전체') {
      copyRows = copyRows?.filter((row) => (row.grade + '').slice(0, 1) === grade);
    }
    if (department && department !== '전체') {
      copyRows = copyRows?.filter((row) => row.department === department);
    }
    if (categoryType && categoryType !== '전체') {
      copyRows = copyRows?.filter((row) => row.type === categoryType);
    }
    if (pathname.includes(END_ROUTE_CATEGORY)) copyRows = sortByDescOrderIdx(copyRows);
    setRows(copyRows);
  }, [
    category,
    semester,
    originalRows,
    isVisible,
    item,
    studentName,
    grade,
    department,
    categoryType,
    sid,
    aid,
  ]);

  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('calories');

  // selected를 redux로 전역 상태 관리
  const selected = useSelector((state) => state.table.selectedId);
  const dispatch = useDispatch();
  const setSelected = (newSelected) => dispatch(setSelectedId(newSelected));

  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.num);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy))?.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, rows]
  );

  const router = useRouter();

  const updateNewOrderIdx = (target, newOrderIdx) => {
    const newData = {
      title: target.category,
      orderIdx: newOrderIdx,
      type: target.type,
      description1: target.description1,
    };

    axiosInstance.patch(`/api/mileage/categories/${target.num}`, newData).then((res) => {
      console.log(res);
    });
  };

  const findRowByIndex = (rows, index) => {
    const target = rows.filter((row) => row.num === index);

    return target[0];
  };

  const handleDragEnd = async (result) => {
    const { source, destination } = result;

    const source_index = source.index + page * rowsPerPage;
    const destination_index = destination.index + page * rowsPerPage;

    if (!destination) return;

    let updatedRows = [...rows];

    const [movedRow] = updatedRows.splice(source_index, 1);
    updatedRows.splice(destination_index, 0, movedRow);

    const startIdx = Math.min(source_index, destination_index);
    const endIdx = Math.max(source_index, destination_index);
    for (let i = startIdx; i <= endIdx; i++) {
      const updateRow = {
        ...updatedRows[i],
        orderIdx: rows[i].orderIdx,
      };
      updatedRows = [...updatedRows.slice(0, i), updateRow, ...updatedRows.slice(i + 1)];
    }

    for (let i = startIdx; i <= endIdx; i++) {
      const target = updatedRows[i];
      if (target) {
        updateNewOrderIdx(updatedRows[i], updatedRows[i].orderIdx);
        // target.orderIdx = newOrderIdx; // Update the local state as well
      }
    }

    setRows(updatedRows);
  };

  return (
    <ResponsiveTable>
      <Box>
        <EnhancedTableToolbar numSelected={selected.length} type={type} />

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId={type}>
            {(provided) => (
              <div className={type} {...provided.droppableProps} ref={provided.innerRef}>
                <TableContainer>
                  <Table aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'}>
                    <EnhancedTableHead
                      headCells={headCells}
                      numSelected={selected.length}
                      order={order}
                      orderBy={orderBy}
                      onSelectAllClick={handleSelectAllClick}
                      onRequestSort={handleRequestSort}
                      rowCount={rows?.length}
                    />

                    <TableBody>
                      {visibleRows?.map((row, index) => {
                        const rowValues = Object.values(row);
                        const isItemSelected = isSelected(row?.num);
                        const labelId = `enhanced-table-checkbox-${index}`;

                        return (
                          <Draggable
                            draggableId={type + row?.num}
                            index={index}
                            key={type + row?.num}
                            isDragDisabled={type !== '마일리지 카테고리'}
                          >
                            {(provided, snapshot) => {
                              return (
                                <TableRow
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  style={{
                                    cursor: type === '마일리지 카테고리' ? 'move' : 'pointer',
                                    ...provided.draggableProps.style, // react-beautiful-dnd에서 제공하는 기본 스타일
                                  }}
                                  ref={provided.innerRef}
                                  hover
                                  onClick={(event) => handleClick(event, row?.num)}
                                  role="checkbox"
                                  aria-checked={isItemSelected}
                                  tabIndex={-1}
                                  selected={isItemSelected}
                                >
                                  <TableCell padding="checkbox">
                                    <Checkbox
                                      color="primary"
                                      checked={isItemSelected}
                                      inputProps={{
                                        'aria-labelledby': labelId,
                                      }}
                                    />
                                  </TableCell>

                                  <TableCell
                                    /**
                                     * @brief 반응형
                                     */

                                    component="th"
                                    id={labelId}
                                    scope="row"
                                    padding="none"
                                  >
                                    {index + 1 + page * rowsPerPage}
                                  </TableCell>

                                  {rowValues.slice(1)?.map((rowValue, index) => (
                                    <TableCell key={index} align={'left'}>
                                      {rowValue === true
                                        ? 'Y'
                                        : rowValue === false
                                        ? 'N'
                                        : rowValue}
                                    </TableCell>
                                  ))}
                                </TableRow>
                              );
                            }}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                      {emptyRows > 0 && (
                        <TableRow
                          style={{
                            height: (dense ? 33 : 53) * emptyRows,
                          }}
                        >
                          <TableCell colSpan={6} />
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <CustomTablePagination
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          count={rows?.length}
          page={page}
          setRowsPerPage={setRowsPerPage}
        />
      </Box>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="폭 좁게"
      />
    </ResponsiveTable>
  );
}
