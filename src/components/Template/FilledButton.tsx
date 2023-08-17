import { Button } from '@mui/material';

interface FilledButtonProps {
  text: string;
  onClick?: () => void;
  width?: string;
  height?: string;
  px?: string;
  py?: string;
}

export default function FilledButton({ text, onClick, width, height, px, py }) {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      sx={{
        width: width,
        height: height,
        px: px,
        py: py,
      }}
    >
      {text}
    </Button>
  );
}
