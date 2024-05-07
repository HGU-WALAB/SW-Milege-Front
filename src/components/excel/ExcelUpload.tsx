import React from 'react';
import { useDropzone } from 'react-dropzone';
import ExcelJS from 'exceljs';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const ExcelUpload = ({ onFileProcessed }) => {
  const onDrop = async (acceptedFiles) => {
    const workbook = new ExcelJS.Workbook();
    const file = acceptedFiles[0];
    const arrayBuffer = await file.arrayBuffer();
    await workbook.xlsx.load(arrayBuffer);
    const worksheet = workbook.getWorksheet(1);
    const rows = [];
    let headerSkipped = false;
    worksheet.eachRow((row) => {
      if (!headerSkipped) {
        headerSkipped = true;
      } else {
        rows.push(row.values);
      }
    });
    onFileProcessed(rows);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <StyledDropzone {...getRootProps()}>
      <input {...getInputProps()} />
      <Typography variant="body2">
        {isDragActive
          ? '여기에 파일을 놓으세요 ...'
          : '파일을 여기로 끌어다 놓거나 클릭하여 파일을 선택합니다.'}
      </Typography>
    </StyledDropzone>
  );
};

export default ExcelUpload;

const StyledDropzone = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(2),
  borderWidth: 2,
  borderRadius: theme.shape.borderRadius,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.secondary,
  outline: 'none',
  transition: theme.transitions.create('border-color', {
    duration: theme.transitions.duration.short,
  }),
  cursor: 'pointer',
  '&:hover': {
    borderColor: theme.palette.primary.main,
    color: theme.palette.primary.main,
  },
}));
