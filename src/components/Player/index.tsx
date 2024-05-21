import * as React from 'react';
import ReactPlayer, {ReactPlayerProps} from 'react-player';
import {OnProgressProps} from 'react-player/base';
import {styled} from '@mui/material';
import useFullscreen from 'ahooks/es/useFullscreen';
import useHover from 'ahooks/es/useHover';

import InlineVideoOverlay from 'src/components/Player/InlineVideoOverlay';
import Preview from 'src/components/Player/Preview';
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

interface Props extends ReactPlayerProps {
  title: string;
  externalDuration: number;
}

const Player: React.FC<Props> = ({
  url,
  light,
  title,
  width,
  externalDuration,
  ...restProps
}) => {
  const [state, dispatch] = React.useReducer(reducer, INITIAL_STATE);
  const playerRef = React.useRef<ReactPlayer>(null);
  const wrapperRef = React.useRef<HTMLDivElement>(null);

  const [isFullscreen, {toggleFullscreen}] = useFullscreen(wrapperRef, {
    onExit: () => {
      console.log('exit fullscreen mode');
    },
  });

  const isHovering = useHover(wrapperRef, {
    onEnter: () => {
      if (!isFullscreen) {
        console.log('on enter');
        dispatch({type: PlayerActionType.PREVIEW_HOVER_START});
      }
    },
    onLeave: () => {
      if (!isFullscreen) {
        console.log('on leave');
        dispatch({type: PlayerActionType.INLINE_VIDEO_HOVER_END});
      }
    },
  });

  const isHoveringInCarousel = !isFullscreen && isHovering;

  const handleClickPreview = () => {
    dispatch({type: PlayerActionType.PLAY});
    dispatch({type: PlayerActionType.LIGHT, payload: false});
    setTimeout(() => {
      toggleFullscreen();
    }, 0);
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
    }, 500);
  };

  const handleProgress = (event: OnProgressProps) => {
    dispatch({type: PlayerActionType.SEEK, payload: event.playedSeconds});
  };

  const handleDuration = (duration: number) => {
    dispatch({type: PlayerActionType.DURATION, payload: duration});
  };

  const preview =
    typeof light === 'string' ? (
      <Preview duration={externalDuration} imageUrl={light} />
    ) : undefined;

  return (
    <StyledPlayer
      state={state}
      ref={wrapperRef}
      style={{
        width,
      }}
    >
      <ReactPlayer
        ref={playerRef}
        url={url}
        light={isHoveringInCarousel || isFullscreen ? undefined : preview}
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
      {isFullscreen && <PlayerOverlay state={state} dispatch={dispatch} />}
      {isFullscreen && !state.controls && !state.light && (
        <PlayerControls title={title} state={state} playerRef={playerRef} />
      )}

      {/* This overlay is necessary to catch click while playing video on hover */}
      {!isFullscreen && (
        <InlineVideoOverlay
          onClick={() => {
            console.log('click on video');
            dispatch({type: PlayerActionType.INLINE_VIDEO_CLICK});
            setTimeout(() => {
              toggleFullscreen();
            }, 0);
          }}
        ></InlineVideoOverlay>
      )}
    </StyledPlayer>
  );
};

export default Player;
