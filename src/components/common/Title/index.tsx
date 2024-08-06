import { Box, Typography } from '@mui/material';

const DOMAIN = process.env.NEXT_PUBLIC_HOST_BASE_DOMAIN;

export default function Title({ type }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Typography color="primary" variant="h5" sx={{ mb: 2 }}>
        {type} {' 리스트'}
      </Typography>
    </Box>
  );
}
