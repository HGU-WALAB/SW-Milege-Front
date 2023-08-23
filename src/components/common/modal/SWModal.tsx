import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { closeCategoryModal, openCategoryModal } from 'src/redux/slices/modal';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

// const selectorConverter = (type, state) => {
//   switch (type) {
//     case 'addCategory':
//       return state.modal.isCategoryModal;
//   }
// };

// const dispatchModalOpenConverter = () => {};
// const dispatchModalCloseConverter = () => {};

const IconConverter = (type) => {
  const slicedType = type.slice(0, 3);
  switch (slicedType) {
    case 'add':
      return <AddIcon />;
    case 'edi':
      return <EditIcon />;
    case 'del':
      return <DeleteIcon />;
  }
};

const titleConverter = (type) => {
  switch (type) {
    case 'addCategory':
      return '마일리지 카테고리 추가';
    case 'editCategory':
      return '마일리지 카테고리 수정';
    case 'deleteCategory':
      return '마일리지 카테고리 삭제';
  }
};

export default function SWModal({ type }) {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.modal.isCategoryModal);

  const handleOpen = () => dispatch(openCategoryModal());
  const handleClose = () => dispatch(closeCategoryModal());

  return (
    <div>
      <IconButton
        onClick={() => {
          handleOpen();
        }}
      >
        {IconConverter(type)}
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {titleConverter(type)}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
