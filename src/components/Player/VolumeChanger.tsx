import {FC, MouseEvent, useState} from 'react';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import {IconButton, Stack} from '@mui/material';
import Slider from '@mui/material/Slider';

interface Props {
  value: number; // percent
  onChange: (volume: number) => void;
}

const VolumeChanger: FC<Props> = ({onChange, value}) => {
  const [currentValue, setCurrentValue] = useState(value);
  const [doShowSlider, setDoShowSlider] = useState(false);

  const handleChange = (_event: Event, newVolume: number | number[]) => {
    _event.stopPropagation();

    setCurrentValue(newVolume as number);
    onChange(newVolume as number);
  };

  const handleVolumeButtonClick = () => {
    setDoShowSlider(v => !v);
  };

  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={2}
    >
      {/* Volume button */}
      <IconButton
        onClick={(event: MouseEvent<HTMLElement>) => {
          event.stopPropagation();

          handleVolumeButtonClick();
        }}
        sx={{
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
          },
        }}
      >
        <VolumeUpIcon
          sx={{
            fontSize: 32,
            color: 'rgba(255, 255, 255, 0.7)',
          }}
        />
      </IconButton>

      {/* Slider */}
      {doShowSlider && (
        <Slider
          aria-label="Volume"
          value={currentValue}
          onChange={handleChange}
          sx={{
            color: '#d0d0d0',
            width: 150,
          }}
          onClick={(event: MouseEvent<HTMLElement>) => {
            // Do not propagate click further. It may stop/start playing.
            event.stopPropagation();
          }}
        />
      )}
    </Stack>
  );
};

export default VolumeChanger;
