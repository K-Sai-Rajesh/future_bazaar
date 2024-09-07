import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import ModeNightRoundedIcon from '@mui/icons-material/ModeNightRounded';
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';

function ToggleColorMode({ mode, toggleColorMode, ...props }) {
  return (
    <IconButton
      onClick={toggleColorMode}
      color="primary"
      size="small"
      aria-label="Theme toggle button"
      {...props}
    >
      {mode === 'dark' ? (
        <WbSunnyRoundedIcon fontSize="small" />
      ) : (
        <ModeNightRoundedIcon fontSize="small" />
      )}
    </IconButton>
  );
}

export default ToggleColorMode;