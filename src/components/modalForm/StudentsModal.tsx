import CRUDStudentTable from '../common/Table/CRUDStudentTable';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

export default function StudentsModal({ handleClose }) {

  const beforeData = useSelector((state) => state.modal.beforeData);

  useEffect(() => {
    console.log('beforeData', beforeData);
  }, [beforeData]);

  return (
    <CRUDStudentTable handleClose={handleClose} data={[]} />
  );
}
