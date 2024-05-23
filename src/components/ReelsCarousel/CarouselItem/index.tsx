import {FC} from 'react';

import {Reel} from 'src/types';
import InlineVideo from './InlineVideo';
import styles from './styles.module.sass';

interface Props {
  reel: Reel;
  width: string; // any valid html size
  onClick: (clickedReel: Reel) => void;
}

const CarouselItem: FC<Props> = ({reel, width, onClick}) => {
  const {title} = reel;

  return (
    <div className={styles.container} style={{width}}>
      <InlineVideo
        reel={reel}
        width={width}
        // TODO rem hard-coded height
        height="470px"
        onClick={onClick}
      />

      <div className={styles.title}>{title}</div>
    </div>
  );
};

export default CarouselItem;
