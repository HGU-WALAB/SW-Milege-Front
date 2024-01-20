import { Box, Typography, Button } from '@mui/material';
import Link from 'next/link';
import { setComponentNum } from 'src/redux/slices/component';
import { dispatch } from 'src/redux/store';

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
