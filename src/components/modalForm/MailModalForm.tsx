import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Iconify from '../../components/iconify';
import { useRef } from 'react';
import { styled } from 'styled-components';
import emailjs from '@emailjs/browser';
import EmailIcon from '@mui/icons-material/Email';
import {
  FormLabel,
  IconButton,
  InputLabel,
  Paper,
  TextField,
  TextareaAutosize,
} from '@mui/material';

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

export default function MailModalForm() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_MAIL_SERVICE_ID,
        process.env.NEXT_PUBLIC_MAIL_TEMPLATE_ID,
        form.current,
        process.env.NEXT_PUBLIC_MAIL_PUBLIC_KEY
      )
      .then(
        (result) => {
          alert('성공적으로 이메일이 전송되었습니다.');
          form.current.reset();
        },
        (error) => {
          console.log(error.text);
          alert('이메일이 전송이 실패되었습니다.');
        }
      );
  };

  return (
    <div>
      <IconButton onClick={handleOpen}>
        <EmailIcon sx={{ color: 'white' }} />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box> */}

        <Paper
          sx={{
            maxWidth: '500px',
            minWidth: '500px',
            padding: ' 50px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '50px',
          }}
        >
          <Typography variant="h4">피드백 & 문의 하기</Typography>
          <form
            ref={form}
            onSubmit={sendEmail}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              width: '100%',
            }}
          >
            <Typography variant="h6" s>
              답변 받으실 이메일
            </Typography>
            <TextField type="email" name="user_email" placeholder="ex)abcd@naver.com" required />

            <Typography variant="h6">문의 제목</Typography>
            <TextField
              type="text"
              name="ask_title"
              placeholder="제목을 입력해주세요.(20자 이내)"
              maxLength={20}
              required
            />

            <Typography variant="h6">문의 내용</Typography>
            <TextField
              name="ask_message"
              placeholder="제목을 입력해주세요."
              required
              multiline
              rows={4}
            />

            <Button type="submit" variant="contained">
              문의하기
            </Button>
          </form>
        </Paper>
      </Modal>
    </div>
  );
}
