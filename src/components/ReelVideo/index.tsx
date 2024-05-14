import {FC, useState} from 'react';
import ReactPlayer from 'react-player';

import VideoPoster from 'src/components/VideoPoster';
import {Reel} from 'src/types';
import styles from './styles.module.sass';

interface Props {
  reel: Reel;
  width: string; // any valid html size
  height: string; // any valid html size
}

const ReelVideo: FC<Props> = ({reel, width, height}) => {
  const {title, duration, imageUrl, videoUrl} = reel;

  const [hovering, setHovering] = useState(false);
  const [playing, setPlaying] = useState(true);

  const previewImage = (
    <VideoPoster
      title={title}
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
          }}
        ></div>
      </div>
    );
  }

  return previewImage;
};

export default ReelVideo;
