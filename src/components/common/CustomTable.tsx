import React, { useState, useEffect } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
  Paper,
  Checkbox,
  IconButton,
  Tooltip,
  FormControlLabel,
  Switch,
  alpha,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { styled } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import axiosInstance from 'src/utils/axios';
import { setSelectedId } from 'src/redux/slices/table';
import CustomTablePagination from './Table/CustomTablePagination';
import SWModal from './modal/SWModal';
import Filtering from './Filter/Filtering';
import Title from './Title/Title';
import SelectedItemsDeleteIcon from './Table/SelectedItemsDeleteIcon';
import {
  ADDCATEGORY,
  ADDGLOBALITEM,
  ADDITEM,
  ADDMILEAGEREGISTER,
  ADDTYPE,
  MAGICIANSEMESTERITEM,
} from 'src/assets/data/modal/modals';
import {
  END_ROUTE_CATEGORY,
  END_ROUTE_MANAGE_REGISTER,
  END_ROUTE_MILEAGE_REGISTER,
  END_ROUTE_RESULT,
  END_ROUTE_SEMESTER_ITEM,
  END_ROUTE_VIEW,
} from 'src/routes/paths';
import { RootState } from 'src/redux/store';
import { MileageGlobalItemData } from 'src/pages/mileage/item/global';
import { SemesterMileageItemsData } from 'src/pages/mileage/item/semester';
import { MileageRegisterData } from 'src/pages/mileage/register';
import { MileageTypeData } from 'src/pages/mileage/type';
import { MileageCategoryData } from 'src/pages/mileage/category';
import isEqual from 'lodash.isequal';

type Order = 'asc' | 'desc';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T): number {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<T>(order: Order, orderBy: keyof T): (a: T, b: T) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: readonly T[] | undefined, comparator: (a: T, b: T) => number): T[] {
  if (!array) {
    return [];
  }

  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

type Data =
  | MileageGlobalItemData
  | SemesterMileageItemsData
  | MileageRegisterData
  | MileageTypeData
  | MileageCategoryData;

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

interface EnhancedTableProps {
  type?: string;
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
  headCells: HeadCell[];
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    type,
    headCells,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };
  const showCheckbox = type !== '마일리지 적립';

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          {showCheckbox && (
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                'aria-label': 'select all items',
              }}
            />
          )}
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={String(headCell.id)}
            align={'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
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
  const shouldRenderToolbar = type !== '마일리지 적립';

  return (
    <Box>
      <Title type={type} />
      <Filtering />
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'end',
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          visibility: shouldRenderToolbar ? 'visible' : 'hidden',
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
        {type === '학기별 마일리지 항목' && (
          <SWModal type={typeConverter('학기별 마일리지 항목 마법사')} />
        )}
        {type !== '마일리지 조회' && <SWModal type={typeConverter(type)} />}
      </Toolbar>
    </Box>
  );
}

const typeConverter = (type: string) => {
  switch (type) {
    case '마일리지 타입':
      return ADDTYPE;
    case '마일리지 카테고리':
      return ADDCATEGORY;
    case '학기별 마일리지 항목':
      return ADDITEM;
    case '마일리지 항목':
      return ADDGLOBALITEM;
    case '학기별 마일리지 항목 마법사':
      return MAGICIANSEMESTERITEM;
    case '마일리지 조회':
      return ADDMILEAGEREGISTER;
    default:
      return '';
  }
};

export default function EnhancedTable({ originalRows = [], headCells, type }) {
  const { pathname } = useRouter();
  const checkIsPageRelatedWithSemester = () =>
    pathname.includes(END_ROUTE_VIEW) ||
    pathname.includes(END_ROUTE_SEMESTER_ITEM) ||
    pathname.includes(END_ROUTE_MILEAGE_REGISTER) ||
    pathname.includes(END_ROUTE_MANAGE_REGISTER) ||
    pathname.includes(END_ROUTE_RESULT);

  function sortByDescOrderIdx(data) {
    if (!data || data.length === 0) return;

    const sortedData = [...data];
    return sortedData.sort((a, b) => (b?.orderIdx ?? 0) - (a?.orderIdx ?? 0));
  }

  const [rows, setRows] = useState(originalRows);

  const sid = useSelector((state: RootState) => state.filter.sid);
  const aid = useSelector((state: RootState) => state.filter.aid);
  const category = useSelector((state: RootState) => state.filter.category);
  const semester = useSelector((state: RootState) => state.filter.semester);
  const isVisible = useSelector((state: RootState) => state.filter.isVisible);
  const item = useSelector((state: RootState) => state.filter.item);
  const studentName = useSelector((state: RootState) => state.filter.studentName);
  const grade = useSelector((state: RootState) => state.filter.grade);
  const department = useSelector((state: RootState) => state.filter.department);
  const categoryType = useSelector((state: RootState) => state.filter.categoryType);

  useEffect(() => {
    const filterRows = () => {
      let copyRows = originalRows;
      if (category && category !== '전체') {
        copyRows = copyRows.filter((row) => row.category === category);
      }
      if (semester && checkIsPageRelatedWithSemester()) {
        copyRows = copyRows.filter((row) => row.semester === semester);
      }
      if (isVisible !== '전체') {
        copyRows = copyRows.filter((row) => row.isVisible === isVisible);
      }
      if (item && item !== '전체') {
        copyRows = copyRows.filter((row) => row?.itemName === item || row?.item === item);
      }
      if (studentName && studentName !== '전체') {
        copyRows = copyRows.filter(
          (row) => row.name === studentName || row.studentName === studentName
        );
      }
      if (sid && sid !== '전체') {
        copyRows = copyRows.filter(
          (row) => row.sid === sid || row.id === sid || row.studentId === sid
        );
      }
      if (aid && aid !== '전체') {
        copyRows = copyRows.filter(
          (row) => aid === row.aid || aid === row.id || aid === row.adminId
        );
      }
      if (grade && grade !== '전체') {
        copyRows = copyRows.filter((row) => (row.grade + '').slice(0, 1) === grade);
      }
      if (department && department !== '전체') {
        copyRows = copyRows.filter((row) => row.department === department);
      }
      if (categoryType && categoryType !== '전체') {
        copyRows = copyRows.filter((row) => row.type === categoryType);
      }
      if (pathname.includes(END_ROUTE_CATEGORY)) copyRows = sortByDescOrderIdx(copyRows);
      return copyRows;
    };

    const filteredRows = filterRows();
    if (!isEqual(rows, filteredRows)) {
      setRows(filteredRows);
    }
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
    pathname,
  ]);

  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof Data>('calories' as keyof Data);

  const selected = useSelector((state: RootState) => state.table.selectedId);
  const dispatch = useDispatch();
  const setSelected = (newSelected) => dispatch(setSelectedId(newSelected));

  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const showCheckbox = type !== '마일리지 적립';

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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, rows]
  );

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
                      type={type}
                      headCells={headCells}
                      numSelected={selected.length}
                      order={order}
                      orderBy={orderBy}
                      onSelectAllClick={handleSelectAllClick}
                      onRequestSort={handleRequestSort}
                      rowCount={rows?.length}
                    />
                    <TableBody>
                      {visibleRows.map((row, index) => {
                        const rowValues = Object.values(row);
                        const isItemSelected = isSelected(row.num);
                        const labelId = `enhanced-table-checkbox-${index}`;

                        return (
                          <Draggable
                            draggableId={type + row.num}
                            index={index}
                            key={type + row.num}
                            isDragDisabled={type !== '마일리지 카테고리'}
                          >
                            {(provided, snapshot) => (
                              <TableRow
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={{
                                  cursor: type === '마일리지 카테고리' ? 'move' : 'pointer',
                                  ...provided.draggableProps.style,
                                }}
                                ref={provided.innerRef}
                                hover
                                onClick={(event) => handleClick(event, row.num)}
                                role="checkbox"
                                aria-checked={isItemSelected}
                                tabIndex={-1}
                                selected={isItemSelected}
                              >
                                <TableCell padding="checkbox">
                                  {showCheckbox && (
                                    <Checkbox
                                      color="primary"
                                      checked={isItemSelected}
                                      inputProps={{
                                        'aria-labelledby': labelId,
                                      }}
                                    />
                                  )}
                                </TableCell>
                                <TableCell component="th" id={labelId} scope="row" padding="none">
                                  {index + 1 + page * rowsPerPage}
                                </TableCell>
                                {rowValues.slice(1).map((rowValue: React.ReactNode, index) => (
                                  <TableCell key={index} align="left">
                                    {rowValue === true ? 'Y' : rowValue === false ? 'N' : rowValue}
                                  </TableCell>
                                ))}
                              </TableRow>
                            )}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                      {emptyRows > 0 && (
                        <TableRow style={{ height: (dense ? 23 : 33) * emptyRows }}>
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

const ResponsiveTable = styled(Paper)({
  minWidth: '1200px',
  overflowX: 'scroll',
  padding: '20px',
});
