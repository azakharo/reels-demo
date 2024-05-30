import {Reel} from 'src/types';
import {BackendReel} from './backendTypes';

export const mapReel = (backendReel: BackendReel): Reel => {
  const {id, title, duration, video, image} = backendReel;

  return {
    id,
    title,
    duration: duration || 0,
    imageUrl: image.uri,
    videoUrl: video.uri,
  };
};
