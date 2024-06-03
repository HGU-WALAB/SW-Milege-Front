import React from 'react';
import styled from 'styled-components';
import CRUDStudentTable from '../common/Table/CRUDStudentTable';

const StudentsModal = ({ handleClose }) => {
  return (
    <StyledModal>
      <CRUDStudentTable handleClose={handleClose} data={[]} />
    </StyledModal>
  );
};
export default StudentsModal;

const StyledModal = styled.div`
  padding: 20px;
`;
