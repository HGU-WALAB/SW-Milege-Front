import { Box, Button, TextField } from '@mui/material';
import FilledButton from 'src/components/Template/FilledButton';
import OutlinedButton from 'src/components/Template/OutlinedButton';
import TextButton from 'src/components/Template/TextButton';

export default function Template() {
  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        p: '20px',
        display: 'flex',
        flexWrap: 'true',
        gap: '50px',
      }}
    >
      <Box
        sx={{
          px: 5,
          py: 5,
          borderRadius: '10px',
          border: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          width: '400px',
          height: '200px',
        }}
      >
        <FilledButton text="FilledButton" px="20px" py="5px" />
        <OutlinedButton variant="outlined" text="outlinedButton" px="20px" py="5px" />
        <TextButton variant="text" text="textButton" px="20px" py="5px" />
      </Box>

      <Box
        sx={{
          px: 5,
          py: 5,
          borderRadius: '10px',
          border: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          width: '400px',
          height: '200px',
        }}
      >
        <TextField label="TextField" variant="outlined" />

        <TextField label="TextField" variant="standard" />
      </Box>
    </Box>
  );
}
