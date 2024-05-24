import * as React from 'react';
import ReactPlayer, {ReactPlayerProps} from 'react-player';
import {OnProgressProps} from 'react-player/base';
import {styled} from '@mui/material';

import {VideoCarousel} from 'src/components/Player/types';
import {
  INITIAL_STATE,
  PlayerActionType,
  PlayerState,
  reducer,
} from './Player.reducer';
import PlayerControls from './PlayerControls';
import PlayerOverlay from './PlayerOverlay';

interface StyledPlayerProps {
  state: PlayerState;
  width?: string; // any valid html size
}

const StyledPlayer = styled('div')<StyledPlayerProps>`
  position: relative;
  border-radius: 8px;
  aspect-ratio: 9 / 16;
  width: ${({width}) => width};
  background-color: black;

  video,
  iframe {
    border-radius: 8px;
  }

  &:hover {
    .video-player__overlay,
    .video-player__controls {
      opacity: 1;
    }
  }

  .video-player__controls {
    opacity: ${({state}) => (state.light ? '0' : state.playing ? '0' : '1')};
  }
`;

interface Props extends ReactPlayerProps, VideoCarousel {
  title: string;
  containerClassName?: string;
}

const Player: React.FC<Props> = ({
  url,
  light,
  title,
  width,
  containerClassName,
  canGoPrev,
  onGoPrev,
  canGoNext,
  onGoNext,
  ...restProps
}) => {
  const [state, dispatch] = React.useReducer(reducer, INITIAL_STATE);
  const playerRef = React.useRef<ReactPlayer>(null);
  const wrapperRef = React.useRef<HTMLDivElement>(null);

  const handleClickPreview = () => {
    dispatch({type: PlayerActionType.PLAY});
    dispatch({type: PlayerActionType.LIGHT, payload: false});
  };

  const handlePause = () => {
    dispatch({type: PlayerActionType.PAUSE});
  };

  const handlePlay = () => {
    dispatch({type: PlayerActionType.PLAY});
  };

  const handleEnded = () => {
    dispatch({type: PlayerActionType.TOGGLE_PLAY});
    // Seek to 0 has to be done with a delay. Otherwise doesn't work.
    setTimeout(() => {
      dispatch({type: PlayerActionType.SEEK, payload: 0});
    }, 1000);
  };

  const handleProgress = (event: OnProgressProps) => {
    dispatch({type: PlayerActionType.SEEK, payload: event.playedSeconds});
  };

  const handleDuration = (duration: number) => {
    dispatch({type: PlayerActionType.DURATION, payload: duration});
  };

  return (
    <StyledPlayer
      state={state}
      ref={wrapperRef}
      style={{
        width,
      }}
      className={containerClassName}
    >
      <ReactPlayer
        ref={playerRef}
        url={url}
        light={light}
        playIcon={<div></div>}
        controls={state.controls}
        loop={state.loop}
        muted={state.muted}
        playing={state.playing}
        playbackRate={state.playbackRate}
        volume={state.volume}
        onPlay={handlePlay}
        onEnded={handleEnded}
        onPause={handlePause}
        onDuration={handleDuration}
        onProgress={handleProgress}
        onClickPreview={handleClickPreview}
        width="100%"
        height="100%"
        {...restProps}
      />

      <PlayerOverlay
        state={state}
        dispatch={dispatch}
        canGoPrev={canGoPrev}
        onGoPrev={onGoPrev}
        canGoNext={canGoNext}
        onGoNext={onGoNext}
      />

      {!state.controls && !state.light && (
        <PlayerControls title={title} state={state} playerRef={playerRef} />
      )}
    </StyledPlayer>
  );
};

export default Player;
