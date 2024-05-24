import * as React from 'react';
import {Dispatch, MouseEvent} from 'react';
import PauseRounded from '@mui/icons-material/PauseRounded';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import NextIcon from '@mui/icons-material/SkipNext';
import PrevIcon from '@mui/icons-material/SkipPrevious';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import {IconButton, Stack, styled} from '@mui/material';

import {
  PlayerAction,
  PlayerActionType,
  PlayerState,
} from 'src/components/Player/Player.reducer';
import {VideoCarousel} from 'src/components/Player/types';

const buttonColor = 'rgba(255, 255, 255, 0.7)';

const commonIconButtonStyles = {
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
};

const playPauseIconStyles = {
  fontSize: 64,
  color: 'white',
};

const prevNextIconStyles = {
  fontSize: 48,
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

interface Props extends VideoCarousel {
  state: PlayerState;
  dispatch: Dispatch<PlayerAction>;
}

const PlayerOverlay: React.FC<Props> = ({
  state,
  dispatch,
  canGoPrev,
  onGoPrev,
  canGoNext,
  onGoNext,
}) => {
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
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        justifyContent={onGoNext && onGoPrev ? 'space-between' : 'center'}
        sx={{
          width: '100%',
        }}
        p={2}
      >
        {/* Prev button */}
        {onGoPrev && (
          <IconButton
            onClick={event => {
              event.stopPropagation();
              onGoPrev();
            }}
            sx={commonIconButtonStyles}
            disabled={!canGoPrev}
          >
            {canGoPrev && <PrevIcon sx={prevNextIconStyles} />}
          </IconButton>
        )}

        {/* Play / Pause button */}
        <IconButton onClick={handleOverlayClick} sx={commonIconButtonStyles}>
          {state.playing ? (
            <PauseRounded sx={playPauseIconStyles} />
          ) : (
            <PlayArrowRounded sx={playPauseIconStyles} />
          )}
        </IconButton>

        {/* Next button */}
        {onGoNext && (
          <IconButton
            onClick={event => {
              event.stopPropagation();
              onGoNext();
            }}
            sx={commonIconButtonStyles}
            disabled={!canGoNext}
          >
            {canGoNext && <NextIcon sx={prevNextIconStyles} />}
          </IconButton>
        )}
      </Stack>

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
