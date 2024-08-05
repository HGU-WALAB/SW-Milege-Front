import React, { useState, useCallback, useEffect } from 'react';
import { Box, Button, Stack } from '@mui/material';
import { DataGrid, GridColDef, GridActionsCellItem, GridRowModesModel } from '@mui/x-data-grid';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import axiosInstance from 'src/utils/axios';
import { useRouter } from 'next/router';
import { RootState } from '../../../redux/store';

interface Student {
  id: number;
  studentName: string;
  sid: string;
  extraPoints: number;
  description1: string;
}

interface CRUDStudentTableProps {
  data: Student[];
  handleClose: () => void;
}

const CRUDStudentTable = ({ data, handleClose }: CRUDStudentTableProps) => {
  const modalType = useSelector((state: RootState) => state.modal.modalType);
  const beforeData = useSelector((state: RootState) => state.modal.beforeData);

  const [rows, setRows] = useState<Student[]>([]);
  const [deletedRows, setDeletedRows] = useState<number[]>([]);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const router = useRouter();

  useEffect(() => {
    if (modalType === 'addMileageRegister') {
      const initialRows: Student[] = data.map((row, index) => ({
        id: index,
        studentName: row[1],
        sid: row[2],
        extraPoints: row[3],
        description1: row[4],
      }));
      setRows(initialRows);
    } else if (modalType === 'managerRegisteredStudents') {
      axiosInstance.get(`/api/mileage/records/${beforeData.id}`).then((res) => {
        setRows(
          res.data.map((row: Student) => ({
            id: row.id,
            studentName: row.studentName,
            sid: row.sid,
            extraPoints: row.extraPoints,
            description1: row.description1,
          }))
        );
      });
    }
  }, [modalType, beforeData, data]);

  const handleDelete = useCallback((id: number) => {
    if (modalType === 'managerRegisteredStudents') {
      setDeletedRows((old) => [...old, id]);
    }
    setRows((old) => old.filter((row) => row.id !== id));
  }, []);

  const handleRegister = async () => {
    if (confirm('등록하시겠습니까?')) {
      try {
        await axiosInstance.post(`/api/mileage/records/${beforeData.semesterItemId}`, {
          studentsInfo: rows.map(({ studentName, sid, extraPoints, description1 }) => ({
            studentName,
            sid,
            extraPoints,
            description1,
          })),
        });
        alert('성공적으로 등록되었습니다.');
        handleClose();
        router.reload();
      } catch (error) {
        alert('등록에 실패했습니다.');
        console.error(error);
      }
    }
  };
  const handleDeleteStudents = async () => {
    if (confirm('삭제하시겠습니까?')) {
      try {
        if (deletedRows.length > 0) {
          const queryString = deletedRows.map((id) => `recordIds=${id}`).join('&');
          await axiosInstance.delete(`/api/mileage/records?${queryString}`);
          alert('성공적으로 삭제되었습니다.');
          handleClose();
          router.reload();
        } else {
          alert('삭제할 항목이 없습니다.');
        }
      } catch (error) {
        alert('삭제에 실패했습니다.');
        console.error(error);
      }
    }
  };

  const columns: GridColDef[] = [
    { field: 'studentName', headerName: '이름', width: 150, editable: false },
    { field: 'sid', headerName: '학번', width: 150, editable: false },
    {
      field: 'extraPoints',
      headerName: '가산점',
      width: 90,
      editable: false,
    },
    {
      field: 'description1',
      headerName: '비고',
      width: 200,
      editable: false,
    },
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
        {modalType === 'addMileageRegister' ? (
          <Button variant="contained" color="primary" onClick={handleRegister}>
            등록하기
          </Button>
        ) : (
          <Button variant="contained" color="primary" onClick={handleDeleteStudents}>
            저장하기
          </Button>
        )}
      </Stack>
    </Box>
  );
};
export default CRUDStudentTable;
