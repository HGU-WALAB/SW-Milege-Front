import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { closeModal } from 'src/redux/slices/modal';

export default function CancelButton({ modalType }) {
  const dispatch = useDispatch();
  const handleClose = (e) => {
    dispatch(closeModal(modalType));
  };
  return (
    <Button onClick={handleClose} variant="outlined" color="primary">
      취소
    </Button>
  );
}
