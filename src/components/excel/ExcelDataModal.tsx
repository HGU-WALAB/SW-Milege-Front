import React, { useState } from 'react';
import ExcelUpload from './ExcelUpload';
import CRUDStudentTable from '../../components/common/Table/CRUDStudentTable';

export interface Student {
  id: number;
  studentName: string;
  sid: string;
  extraPoints: number;
  description: string;
}

const ExcelDataModal = ({ handleClose }) => {
  const [excelData, setExcelData] = useState([]);
  const [uploaded, setUploaded] = useState(false);

  const handleFileProcessed = (data: Student[]) => {
    setExcelData(data);
    setUploaded(true);
  };

  return (
    <div>
      {!uploaded ? (
        <ExcelUpload onFileProcessed={handleFileProcessed} />
      ) : (
        <CRUDStudentTable handleClose={handleClose} data={excelData} />
      )}
    </div>
  );
};

export default ExcelDataModal;
