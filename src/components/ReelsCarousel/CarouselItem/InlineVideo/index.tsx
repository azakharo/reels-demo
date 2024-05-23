import {FC, useState} from 'react';
import ReactPlayer from 'react-player';

import {Reel} from 'src/types';
import PreviewImage from '../PreviewImage';
import styles from './styles.module.sass';

interface Props {
  reel: Reel;
  width: string; // any valid html size
  height: string; // any valid html size
  onClick: (clickedReel: Reel) => void;
}

const InlineVideo: FC<Props> = ({reel, width, height, onClick}) => {
  const {duration, imageUrl, videoUrl} = reel;

  const [hovering, setHovering] = useState(false);
  const [playing, setPlaying] = useState(true);

  const previewImage = (
    <PreviewImage
      duration={duration}
      imageUrl={imageUrl}
      width={width}
      height={height}
      onMouseEnter={() => {
        setHovering(true);
        setPlaying(true);
      }}
    />
  );

  if (hovering) {
    return (
      <div
        style={{
          width,
          height,
        }}
        onMouseLeave={() => {
          setHovering(false);
          setPlaying(false);
        }}
        className={styles.videoContainer}
      >
        <ReactPlayer
          url={videoUrl}
          width={width}
          height={height}
          muted={true}
          playing={playing}
        />

        <div
          className={styles.videoOverlay}
          onClick={() => {
            setPlaying(prevPlaying => !prevPlaying);
            onClick(reel);
          }}
        ></div>
      </div>
    );
  }

  return previewImage;
};

export default InlineVideo;
