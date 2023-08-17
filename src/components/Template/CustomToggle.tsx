import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function CustomToggle() {
  const [alignment, setAlignment] = React.useState('web');

  const handleChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    setAlignment(newAlignment);
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
      sx={{ width: '110px' }}
    >
      <ToggleButton sx={{ width: '50px' }} value="web">
        O
      </ToggleButton>
      <ToggleButton sx={{ width: '50px' }} value="android">
        X
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
