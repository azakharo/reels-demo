import {ReactElement} from 'react';

export interface PlayerState {
  playing: boolean;
  controls: boolean;
  volume: number;
  light: boolean | string | ReactElement;
  playedSeconds: number;
  duration: number;
  loop: boolean;
  muted: boolean;
  playbackRate: number;
}

export const INITIAL_STATE: PlayerState = {
  playing: false,
  controls: false,
  volume: 0.8,
  // changing this prop doesn't affect "light" prop of the player
  light: false,
  playedSeconds: 0,
  duration: 0,
  loop: false,
  muted: true,
  playbackRate: 1,
};

export enum PlayerActionType {
  PLAY = 'PLAY',
  PAUSE = 'PAUSE',
  TOGGLE_PLAY = 'TOGGLE_PLAY',
  DURATION = 'DURATION',
  SEEK = 'SEEK',
  VOLUME = 'VOLUME',
  LIGHT = 'LIGHT',
  /////////////////////////////////////////////////////////
  // actions related to playing on hover
  PREVIEW_HOVER_START = 'PREVIEW_HOVER_START',
  INLINE_VIDEO_HOVER_END = 'INLINE_VIDEO_HOVER_END',
  INLINE_VIDEO_CLICK = 'INLINE_VIDEO_CLICK',
  /////////////////////////////////////////////////////////
}

export interface PlayAction {
  type: PlayerActionType.PLAY;
}

export interface PauseAction {
  type: PlayerActionType.PAUSE;
}

export interface TogglePlayAction {
  type: PlayerActionType.TOGGLE_PLAY;
}

export interface TogglePlayAction {
  type: PlayerActionType.TOGGLE_PLAY;
}

export interface DurationAction {
  type: PlayerActionType.DURATION;
  payload: number;
}

export interface SeekAction {
  type: PlayerActionType.SEEK;
  payload: number;
}

export interface VolumeAction {
  type: PlayerActionType.VOLUME;
  payload: number;
}

export interface LightAction {
  type: PlayerActionType.LIGHT;
  payload: boolean | string | ReactElement;
}

export interface PreviewHoverStartAction {
  type: PlayerActionType.PREVIEW_HOVER_START;
}

export interface InlineVideoHoverEndAction {
  type: PlayerActionType.INLINE_VIDEO_HOVER_END;
}

export interface InlineVideoClickAction {
  type: PlayerActionType.INLINE_VIDEO_CLICK;
}

export type PlayerAction =
  | PlayAction
  | PauseAction
  | TogglePlayAction
  | DurationAction
  | SeekAction
  | VolumeAction
  | LightAction
  | PreviewHoverStartAction
  | InlineVideoHoverEndAction
  | InlineVideoClickAction;

export const reducer = (
  state: PlayerState,
  action: PlayerAction,
): PlayerState => {
  switch (action.type) {
    case PlayerActionType.PLAY: {
      return {...state, playing: true};
    }
    case PlayerActionType.PAUSE: {
      return {...state, playing: false};
    }
    case PlayerActionType.TOGGLE_PLAY: {
      return {...state, playing: !state.playing};
    }
    case PlayerActionType.DURATION: {
      return {...state, duration: action.payload};
    }
    case PlayerActionType.SEEK: {
      return {...state, playedSeconds: action.payload};
    }
    case PlayerActionType.VOLUME: {
      return {...state, volume: action.payload};
    }
    case PlayerActionType.LIGHT: {
      return {...state, light: action.payload};
    }
    case PlayerActionType.PREVIEW_HOVER_START: {
      return {
        ...state,
        // muted: true,
        playing: true,
        light: false,
      };
    }
    case PlayerActionType.INLINE_VIDEO_HOVER_END: {
      return {
        ...state,
        // muted: false,
        playing: false,
        light: true,
      };
    }
    case PlayerActionType.INLINE_VIDEO_CLICK: {
      return {
        ...state,
        // muted: false,
      };
    }
    default: {
      return state;
    }
  }
};
