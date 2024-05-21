import {FC, RefObject} from 'react';
import ReactPlayer from 'react-player';
import {Box, Slider, styled, Typography} from '@mui/material';
import {format} from 'date-fns';

import {PlayerState} from 'src/components/Player/Player.reducer';
import {limitString} from 'src/utils/limitString';

const titleLengthLimit = 50;
const sliderThumbSize = 12; // px

const StyledPlayerControls = styled('div')`
  position: absolute;
  padding: 16px 20px;
  bottom: 0;
  left: 0;
  width: 100%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  color: #fff;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;

  .video-player__slider {
    color: #be6cfd;
    padding: 5px 0;

    .MuiSlider-track {
      border: none;
    }

    .MuiSlider-thumb {
      width: ${sliderThumbSize}px;
      height: ${sliderThumbSize}px;
      background-color: #be6cfd;

      &:before {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
      }

      &:hover,
      &.Mui-focusVisible,
      &.Mui-active {
        box-shadow: none;
      }
    }

    .MuiSlider-rail {
      background-color: #d0d0d0;
    },
  }
`;

const TimeTypography = styled(Typography)`
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: rgba(255, 255, 255, 0.7);
  pointer-events: none;
`;

interface Props {
  state: PlayerState;
  playerRef: RefObject<ReactPlayer>;
  title: string;
}

const PlayerControls: FC<Props> = ({title, state, playerRef}) => {
  const handleSeek = (_event: Event, newValue: number | number[]) => {
    playerRef.current?.seekTo(newValue as number);
  };

  const renderSeekSlider = () => {
    return (
      <Slider
        aria-label="Time"
        className={'video-player__slider video-player__slider--seek'}
        min={0}
        max={state.duration}
        step={0.01}
        value={state.playedSeconds}
        onChange={handleSeek}
      />
    );
  };

  return (
    <StyledPlayerControls className={'video-player__controls'}>
      <Typography
        sx={{
          fontSize: 21,
          fontWeight: 700,
          lineHeight: '25.2px',
          marginBottom: '19px',
        }}
        title={title.length > titleLengthLimit ? title : undefined}
      >
        {limitString(title, titleLengthLimit)}
      </Typography>

      {renderSeekSlider()}

      <Box display="flex" justifyContent="space-between">
        <TimeTypography variant="body2" color="white">
          {format(new Date(state.playedSeconds * 1000), 'mm:ss')}
        </TimeTypography>

        <TimeTypography variant="body2" color="white">
          {format(new Date(state.duration * 1000), 'mm:ss')}
        </TimeTypography>
      </Box>
    </StyledPlayerControls>
  );
};

export default PlayerControls;
