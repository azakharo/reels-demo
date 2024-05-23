import * as React from 'react';
import {Dispatch, MouseEvent} from 'react';
import PauseRounded from '@mui/icons-material/PauseRounded';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import {IconButton, styled} from '@mui/material';

import {
  PlayerAction,
  PlayerActionType,
  PlayerState,
} from 'src/components/Player/Player.reducer';

const buttonColor = 'rgba(255, 255, 255, 0.7)';

const commonIconButtonStyles = {
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
};

const playPauseIconStyles = {
  fontSize: 64,
  color: buttonColor,
};

interface StyledPlayerOverlayProps {
  state: PlayerState;
}

const StyledPlayerOverlay = styled('div')<StyledPlayerOverlayProps>`
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0;
  top: 0;
  bottom: 0;
  background-color: ${({state}) =>
    state.light || state.playing ? 'transparent' : 'rgba(0, 0, 0, 0.4)'};
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

interface Props {
  state: PlayerState;
  dispatch: Dispatch<PlayerAction>;
}

const PlayerOverlay: React.FC<Props> = ({state, dispatch}) => {
  const handleOverlayClick = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();

    dispatch({type: PlayerActionType.TOGGLE_PLAY});
  };

  return (
    <StyledPlayerOverlay
      state={state}
      className={'video-player__overlay'}
      onClick={handleOverlayClick}
    >
      {/* Play / Pause button */}
      <IconButton onClick={handleOverlayClick} sx={commonIconButtonStyles}>
        {state.playing ? (
          <PauseRounded sx={playPauseIconStyles} />
        ) : (
          <PlayArrowRounded sx={playPauseIconStyles} />
        )}
      </IconButton>

      {/* Volume button */}
      <IconButton
        onClick={(event: MouseEvent<HTMLElement>) => {
          event.stopPropagation();

          alert('Не реализовано');
        }}
        sx={{
          position: 'absolute',
          top: 12,
          left: 12,
          ...commonIconButtonStyles,
        }}
      >
        <VolumeUpIcon
          sx={{
            fontSize: 32,
            color: buttonColor,
          }}
        />
      </IconButton>
    </StyledPlayerOverlay>
  );
};

export default PlayerOverlay;
