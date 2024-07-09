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
  // For mobile and tablet only.
  // If user tap on the screen (on free space, not on any button), we need to show the controls.
  // This state is for that.
  // It's reset to false after timeout or on subsequent click.
  isTapped: boolean;
}

// noinspection RedundantConditionalExpressionJS
export const INITIAL_STATE: PlayerState = {
  playing: true,
  controls: false,
  volume: 0.8,
  // changing this prop doesn't affect "light" prop of the player
  light: false,
  playedSeconds: 0,
  duration: 0,
  loop: false,
  muted: false,
  playbackRate: 1,
  isTapped: false,
};

export enum PlayerActionType {
  PLAY = 'PLAY',
  PAUSE = 'PAUSE',
  TOGGLE_PLAY = 'TOGGLE_PLAY',
  DURATION = 'DURATION',
  SEEK = 'SEEK',
  VOLUME = 'VOLUME',
  LIGHT = 'LIGHT',
  TAP = 'TAP',
  ENDED = 'ENDED',
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

export interface EndedAction {
  type: PlayerActionType.ENDED;
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

export interface TapAction {
  type: PlayerActionType.TAP;
  payload: boolean;
}

export type PlayerAction =
  | PlayAction
  | PauseAction
  | TogglePlayAction
  | DurationAction
  | SeekAction
  | VolumeAction
  | LightAction
  | TapAction
  | EndedAction;

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
    case PlayerActionType.ENDED: {
      return {...state, playing: false, playedSeconds: 0};
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
    case PlayerActionType.TAP: {
      return {...state, isTapped: action.payload};
    }
    default: {
      return state;
    }
  }
};
