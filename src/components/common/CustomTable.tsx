import React, { useState } from 'react';
import { Typography, Paper, IconButton, Tooltip } from '@mui/material';
import { alpha } from '@mui/material/styles';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridColDef,
} from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'src/redux/store';
import { setSelectedId } from 'src/redux/slices/table';
import SWModal from 'src/components/common/modal/SWModal';
import Title from 'src/components/common/Title';
import SelectedItemsDeleteIcon from 'src/components/common/Table/SelectedItemsDeleteIcon';
import {
  ADDCATEGORY,
  ADDGLOBALITEM,
  ADDITEM,
  ADDMILEAGEREGISTER,
  ADDTYPE,
  MAGICIANSEMESTERITEM,
} from 'src/assets/data/modal/modals';
import styled from 'styled-components';

interface EnhancedTableProps<T> {
  originalRows: T[];
  headCells: HeadCell[];
  type: string;
}

interface HeadCell {
  id: string;
  numeric: boolean;
  disablePadding: boolean;
  label: string;
}

const typeConverter = (type: string): string => {
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

const EnhancedTable = <T,>({ originalRows, headCells, type }: EnhancedTableProps<T>) => {
  const [rows] = useState<T[]>(originalRows);
  const selected = useSelector((state: RootState) => state.table.selectedId);
  const dispatch = useDispatch();
  const setSelected = (newSelected: number[]) => dispatch(setSelectedId(newSelected));
  const [dense] = useState(true);

  const columns: GridColDef[] = headCells.map((headCell) => {
    return {
      field: headCell.id,
      headerName: headCell.label,
      flex: 1,
      renderCell: (params) => {
        return params.value;
      },
    };
  });

  const CustomToolbar = () => {
    const shouldRenderToolbar = type !== '마일리지 적립';

    return (
      <GridToolbarContainer
        sx={{
          display: 'flex',
          flexDirection: 'row',
          height: 'auto',
          marginBottom: 2,
          alignItems: 'center',
          justifyContent: 'space-between',
          visibility: shouldRenderToolbar ? 'visible' : 'hidden',
          ...(selected.length > 0 && {
            backgroundColor: (theme) =>
              alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
          }),
        }}
      >
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport
          printOptions={{ disableToolbarButton: false }}
          csvOptions={{ disableToolbarButton: false }}
        />

        {type === '학기별 마일리지 항목' && (
          <SWModal type={typeConverter('학기별 마일리지 항목 마법사')} />
        )}
        {type !== '마일리지 조회' && <SWModal type={typeConverter(type)} />}
        {selected.length > 0 && (
          <Tooltip title="삭제">
            <IconButton>
              <SelectedItemsDeleteIcon type={type} />
              <Typography variant="body2" color="inherit" fontWeight={700} sx={{ marginLeft: 1 }}>
                {selected.length}개 삭제
              </Typography>
            </IconButton>
          </Tooltip>
        )}
      </GridToolbarContainer>
    );
  };

  return (
    <ResponsiveTable>
      <Title type={type} />

      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row: any) => row.num}
        checkboxSelection
        slots={{
          toolbar: CustomToolbar,
        }}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 25,
            },
          },
        }}
        pageSizeOptions={[25, 50, 100]}
        density={dense ? 'compact' : 'standard'}
        onRowSelectionModelChange={(newSelection) => {
          setSelected(newSelection as number[]);
        }}
        localeText={{
          toolbarColumns: '열 선택',
          toolbarFilters: '필터',
          toolbarDensity: '행 간격',
          toolbarDensityCompact: '좁게',
          toolbarDensityStandard: '보통',
          toolbarDensityComfortable: '넓게',
          toolbarExport: '내보내기',
        }}
      />
    </ResponsiveTable>
  );
};

const ResponsiveTable = styled(Paper)`
  min-width: 1200px;
  overflow-x: scroll;
  padding: 20px;
`;

export default EnhancedTable;
