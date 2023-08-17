import { Button } from '@mui/material';

interface OutlinedButtonProps {
  text: string;
  onClick?: () => void;
  width?: string;
  height?: string;
  px?: string;
  py?: string;
}

export default function OutlinedButton({ text, onClick, width, height, px, py }) {
  return (
    <Button
      variant="outlined"
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
