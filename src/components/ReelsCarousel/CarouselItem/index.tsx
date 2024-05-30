import {FC} from 'react';

import {Reel} from 'src/types';
import {isMobileOrTablet} from 'src/utils/systemInfo';
import InlineVideo from './InlineVideo';
import PreviewImage from './PreviewImage';
import styles from './styles.module.sass';

// TODO rem hard-coded height
const height = '470px';

interface Props {
  reel: Reel;
  width: string; // any valid html size
  onClick: (clickedReel: Reel) => void;
}

const CarouselItem: FC<Props> = ({reel, width, onClick}) => {
  const {title, duration, imageUrl} = reel;

  return (
    <div className={styles.container} style={{width}}>
      {isMobileOrTablet ? (
        <PreviewImage
          duration={duration}
          imageUrl={imageUrl}
          width={width}
          height={height}
          onClick={() => onClick(reel)}
        />
      ) : (
        <InlineVideo
          reel={reel}
          width={width}
          height={height}
          onClick={onClick}
        />
      )}

      <div className={styles.title}>{title}</div>
    </div>
  );
};

export default CarouselItem;
