import * as React from 'react';
import {Dispatch, MouseEvent, useEffect, useMemo, useRef} from 'react';
import PauseRounded from '@mui/icons-material/PauseRounded';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import NextIcon from '@mui/icons-material/SkipNext';
import PrevIcon from '@mui/icons-material/SkipPrevious';
import {Box, IconButton, Stack, styled, useMediaQuery} from '@mui/material';

import {
  PlayerAction,
  PlayerActionType,
  PlayerState,
} from 'src/components/Player/Player.reducer';
import {VideoCarousel} from 'src/components/Player/types';
import {isMobileOrTablet} from 'src/utils/systemInfo';
import VolumeOnOffButton from './VolumeOnOffButton';

const buttonColor = 'rgba(255, 255, 255, 0.7)';
const commonIconButtonStyles = {
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
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
  onVolumeOnOffChange?: (newValue: boolean) => void;
}

const PlayerOverlay: React.FC<Props> = ({
  state,
  dispatch,
  canGoPrev,
  onGoPrev,
  canGoNext,
  onGoNext,
  onVolumeOnOffChange,
}) => {
  const isLandscapeOrientation = useMediaQuery('(orientation: landscape)');
  const isMobileOrTableLandscape = isLandscapeOrientation && isMobileOrTablet;

  const playPauseIconStyles = useMemo(
    () => ({
      fontSize: isMobileOrTableLandscape ? 32 : 64,
      color: 'white',
    }),
    [isMobileOrTableLandscape],
  );

  const prevNextIconStyles = useMemo(
    () => ({
      fontSize: isMobileOrTableLandscape ? 24 : 48,
      color: buttonColor,
    }),
    [isMobileOrTableLandscape],
  );

  const refTappedStateTimeout = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const handleOverlayClick = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();

    if (isMobileOrTablet) {
      const currentTapState = state.isTapped;
      dispatch({type: PlayerActionType.TAP, payload: !state.isTapped});
      if (!currentTapState) {
        if (refTappedStateTimeout.current !== null) {
          clearTimeout(refTappedStateTimeout.current);
          refTappedStateTimeout.current = null;
        }

        // we have just set tapped to true
        refTappedStateTimeout.current = setTimeout(() => {
          dispatch({type: PlayerActionType.TAP, payload: false});
        }, 2000);
      }
    } else {
      dispatch({type: PlayerActionType.TOGGLE_PLAY});
    }
  };

  useEffect(() => {
    return () => {
      if (refTappedStateTimeout.current !== null) {
        clearTimeout(refTappedStateTimeout.current);
        refTappedStateTimeout.current = null;
      }
    };
  }, []);

  const handleVolumeOnOffChange = (newVolume: boolean) => {
    dispatch({type: PlayerActionType.VOLUME, payload: newVolume ? 0.8 : 0});
    onVolumeOnOffChange?.(newVolume);
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
        <IconButton
          onClick={event => {
            event.stopPropagation();
            dispatch({type: PlayerActionType.TOGGLE_PLAY});
          }}
          sx={commonIconButtonStyles}
        >
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

      <Box
        sx={{
          position: 'absolute',
          top: 12,
          left: 12,
        }}
      >
        <VolumeOnOffButton
          value={state.volume > 0}
          onChange={handleVolumeOnOffChange}
        />
      </Box>
    </StyledPlayerOverlay>
  );
};

export default PlayerOverlay;
