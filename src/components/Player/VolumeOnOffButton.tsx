import {FC, MouseEvent} from 'react';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import {IconButton} from '@mui/material';

interface Props {
  value: boolean;
  onChange: (newValue: boolean) => void;
}

const VolumeOnOffButton: FC<Props> = ({onChange, value}) => {
  const Icon = value ? VolumeUpIcon : VolumeOffIcon;

  return (
    <IconButton
      onClick={(event: MouseEvent<HTMLElement>) => {
        event.stopPropagation();

        onChange(!value);
      }}
      sx={{
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
        },
      }}
    >
      <Icon
        sx={{
          fontSize: 32,
          color: 'rgba(255, 255, 255, 0.7)',
        }}
      />
    </IconButton>
  );
};

export default VolumeOnOffButton;
