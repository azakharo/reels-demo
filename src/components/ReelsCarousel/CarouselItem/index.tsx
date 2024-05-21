import {FC} from 'react';

import Player from 'src/components/Player';
import {Reel} from 'src/types';
import styles from './styles.module.sass';

interface Props {
  reel: Reel;
  width?: string; // any valid html size
}

const CarouselItem: FC<Props> = ({reel, width}) => {
  const {title, videoUrl, imageUrl, duration} = reel;

  return (
    <div className={styles.container} style={{width}}>
      <Player
        url={videoUrl}
        width={width}
        light={imageUrl}
        title={title}
        externalDuration={duration}
      />

      <div className={styles.title}>{title}</div>
    </div>
  );
};

export default CarouselItem;
