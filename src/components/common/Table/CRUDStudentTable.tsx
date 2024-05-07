import React, { useState, useCallback, useEffect } from 'react';
import { Box, Button, Stack } from '@mui/material';
import BackspaceIcon from '@mui/icons-material/Backspace';
import { DataGrid, GridColDef, GridActionsCellItem, GridRowModesModel } from '@mui/x-data-grid';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import axiosInstance from 'src/utils/axios';
import CancelButton from '../../common/modal/CancelButton';

interface Student {
  id: number;
  name: string;
  sid: string;
  extraPoints: number;
  description1: string;
}

interface CRUDStudentTableProps {
  data: any[];
  handleClose: () => void;
}



export default function CRUDStudentTable({ data, handleClose }: CRUDStudentTableProps) {
  const initialRows: Student[] = data.map((row, index) => ({
    id: index,
    name: row[1],
    sid: row[2],
    extraPoints: row[3],
    description1: row[4],
  }));

  const [rows, setRows] = useState<Student[]>(initialRows);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const beforeData = useSelector((state) => state.modal.beforeData);

  const handleDelete = useCallback((id: number) => {
    setRows((old) => old.filter((row) => row.id !== id));
  }, []);

  const handleRegister = async () => {
    if (confirm('등록하시겠습니까?')) {
      try {
         await axiosInstance.post(`/api/mileage/records/${beforeData.semesterItemId}`, {
          studentsInfo: rows.map(({ name, sid, extraPoints, description1 }) => ({
            name,
            sid,
            extraPoints,
            description1,
          })),
        });
        alert('성공적으로 등록되었습니다.');
        handleClose();
      } catch (error) {
        alert('등록에 실패했습니다.');
        console.error(error);
      }
    }
  };

  const columns: GridColDef[] = [
    { field: 'name', headerName: '이름', width: 150, editable: true },
    { field: 'sid', headerName: '학번', width: 150, editable: true },
    { field: 'extraPoints', headerName: '가산점', width: 90, editable: true },
    { field: 'description1', headerName: '비고', width: 200, editable: true },
    {
      field: 'actions',
      type: 'actions',
      headerName: '삭제',
      width: 100,
      getActions: ({ id }) => [
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => handleDelete(Number(id))}
        />,
      ],
    },
  ];

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        rowHeight={38}
        onRowModesModelChange={setRowModesModel}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 25, page: 0 },
          },
        }}
      />

      <Stack direction="row" spacing={2} justifyContent="center" mt={2}>
        <Button onClick={handleClose} variant="outlined" color="primary">
          취소
        </Button>
        <Button variant="contained" color="primary" onClick={handleRegister}>
          등록하기
        </Button>
      </Stack>
    </Box>
  );
}
