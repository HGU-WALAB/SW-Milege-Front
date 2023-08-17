import { Button } from '@mui/material';

interface TextButtonProps {
  text: string;
  onClick?: () => void;
  width?: string;
  height?: string;
  px?: string;
  py?: string;
}

export default function TextButton({ text, onClick, width, height, px, py }) {
  return (
    <Button
      variant="text"
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
