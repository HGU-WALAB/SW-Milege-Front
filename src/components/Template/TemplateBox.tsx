import { Box } from '@mui/system';

interface TheplateBoxProps {
  width?: string;
  height?: string;
  children?: React.ReactNode;
}
export default function TemplateBox({ width, height, children }) {
  return (
    <Box
      sx={{
        px: 5,
        py: 5,
        borderRadius: '10px',
        border: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        width: width,
        height: height,
      }}
    >
      {children}
    </Box>
  );
}
