import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';
import axiosInstance from 'src/utils/axios';
import { useDispatch, useSelector } from 'react-redux';
import { Select } from '@mui/material';
import { setEditingStudent } from 'src/redux/slices/data';
// import {
//   randomCreatedDate,
//   randomTraderName,
//   randomId,
//   randomArrayItem,
// } from '@mui/x-data-grid-generator';

const roles = ['Market', 'Finance', 'Development'];
// const randomRole = () => {
//   return randomArrayItem(roles);
// };

// const initialRows: GridRowsProp = [
//   {
//     id: 1,
//     name: '오인혁',
//     sid: '21800446',
//     points: 5,
//     description1: '설명 1',
//     description2: '설명 2',
//   },
//   {
//     id: 2,
//     name: '한시온',
//     sid: '21800447',
//     points: 30,
//     description1: '설명 14',
//     description2: '설명 28',
//   },
//   {
//     id: 3,
//     name: '장유진',
//     sid: '21800448',
//     points: 5,
//     description1: '설명 13',
//     description2: '설명 25',
//   },
//   {
//     id: 4,
//     name: '장유진2',
//     sid: '21800449',
//     points: 5,
//     description1: '설명 11',
//     description2: '설명 22',
//   },
// ];

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (newModel: (oldModel: GridRowModesModel) => GridRowModesModel) => void;
}

function EditToolbar(props: EditToolbarProps) {
  // const editingRow = useSelector((state) => state.data.editingStudent);
  const dispatch = useDispatch();

  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = 8;
    setRows((oldRows) => [...oldRows, { id, name: '', age: '', isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button startIcon={<AddIcon />} onClick={handleClick}>
        학생 추가
      </Button>
    </GridToolbarContainer>
  );
}

function createDate(
  id: number,
  name: string,
  sid: string,
  counts: number,
  extraPoints: number,
  description1: string,
  modDate: string
) {
  return {
    id: id,
    name: name,
    sid: sid,
    counts: counts,
    extraPoints: extraPoints,
    description1: description1,
    modDate: modDate,
  };
}

const convertUpdatedData = (editedData) => {
  const keys = Object.keys(editedData);

  if (keys.length === 0) return; // 키가 없는 경우 반환

  const firstKey = keys[0]; // 첫 번째 키를 가져옵니다.
  const innerObject = editedData[firstKey];

  if (!innerObject) return; // 해당 키의 객체가 없을 경우 반환

  const extractedValues = Object.keys(innerObject).reduce((accum, key) => {
    accum[key] = innerObject[key].value;
    return accum;
  }, {});

  return extractedValues;
};

export default function CRUDStudentTable() {
  const dispatch = useDispatch();
  // const editingRow = useSelector((state) => state.data.editingStudent);
  // const setEditingRow = () => dispatch(setEditingStudent);
  const [editingRow, setEditingRow] = React.useState();

  const semesterItemId = useSelector((state) => state.modal.clickedItemId);
  React.useEffect(() => {
    const res = axiosInstance
      .get(`/api/mileage/records/filter?semesterItemId=${semesterItemId}`)
      .then((res) => {
        const data = res.data;
        const rows = data.list.map((row: any) =>
          createDate(
            row.id,
            row.studentName,
            row.sid,
            row.counts,
            row.extraPoints,
            row.description1,
            row.modDate
          )
        );
        setRows(rows);
      });
  }, []);

  const [rows, setRows] = React.useState([]);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    // handleEditMode();
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });

    const newData = {
      semesterItemId,
      sid: editingRow?.sid,
      studentName: editingRow?.name,
      counts: editingRow?.counts,
      extraPoints: editingRow?.extraPoints,
      description1: editingRow?.description1,
    };
    const validateDuplicate = () => {
      return rows.map((row) => row.sid).includes(editingRow?.sid);
    };


    !validateDuplicate()
      ? axiosInstance.post('/api/mileage/records', newData).then((res) => {
          console.log(res);
        })
      : axiosInstance.patch(`/api/mileage/records/${id}`, newData).then((res) => {
          console.log(res);
        });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    setRows(rows.filter((row) => row.id !== id));

    axiosInstance.delete(`/api/mileage/records/${id}`).then((res) => {
      console.log(res);
    });
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));

    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns: GridColDef[] = [
    { field: 'name', headerName: '이름', width: 80, editable: true },
    {
      field: 'sid',
      headerName: '학번',
      type: 'string',
      width: 150,
      align: 'left',
      headerAlign: 'left',
      editable: true,
    },
    {
      field: 'counts',
      headerName: '마일리지',
      type: 'string',
      width: 80,
      align: 'left',
      headerAlign: 'left',
      editable: true,
    },
    {
      field: 'extraPoints',
      headerName: '가산점',
      type: 'string',
      width: 80,
      align: 'left',
      headerAlign: 'left',
      editable: true,
    },
    {
      field: 'description1',
      headerName: '비고',
      type: 'string',
      width: 200,
      editable: true,
    },
    
    {
      field: 'modDate',
      headerName: '수정일',
      type: 'string',
      width: 200,
      editable: true,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        height: 500,
        width: '100%',
        '& .actions': {
          color: 'gray',
        },
        '& .textPrimary': {
          color: 'primary.main',
        },
      }}
    >
      <DataGrid
        onStateChange={(newModel) => setEditingRow(convertUpdatedData(newModel.editRows))}
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        // onRowClick={handleEditMode}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
    </Box>
  );
}
