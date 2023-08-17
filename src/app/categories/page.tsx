import { Box, Typography } from '@mui/material';

export default function page() {
  return (
    <Box
      sx={{
        width: '100%',
        height: '60px',
        px: '50px',
        display: 'flex',
        justifyContent: 'space-between',
        // justifyContents: 'space-between',
        alignItems: 'center',
        backgroundColor: 'primary.main',
      }}
    >
      <Box sx={{ width: '50px' }}>Logo</Box>
      <Box>
        <Typography>SW 중심대 마일리지 시스템</Typography>
      </Box>
      <Box>로그아웃</Box>
    </Box>
  );
}
