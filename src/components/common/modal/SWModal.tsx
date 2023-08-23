import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { closeCategoryModal, openCategoryModal } from 'src/redux/slices/modal';

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

const selectorConverter = (type, state) => {
  switch (type) {
    case 'addCategory':
      return state.modal.isCategoryModal;
  }
};

const dispatchModalOpenConverter = () => {};
const dispatchModalCloseConverter = () => {};

export default function SWModal({ type }) {
  const dispatch = useDispatch();
  const open = useSelector((state) => selectorConverter(type, state));

  const handleOpen = () => dispatch(openCategoryModal());
  const handleClose = () => dispatch(closeCategoryModal());

  return (
    <div>
      <IconButton
        onClick={() => {
          handleOpen();
        }}
      >
        <AddIcon />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
