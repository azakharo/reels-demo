import {FC, MouseEventHandler} from 'react';

import styles from './styles.module.sass';

interface Props {
  duration: number;
  imageUrl: string;
  width: string; // any valid html size
  height: string; // any valid html size
  onMouseEnter?: MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: MouseEventHandler<HTMLDivElement>;
}

const PreviewImage: FC<Props> = ({
  duration,
  imageUrl,
  width,
  height,
  onMouseEnter,
  onMouseLeave,
}) => {
  return (
    <div
      className={styles.container}
      style={{width, height}}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <img src={imageUrl} alt={'Фото'} className={styles.image} />

      {duration && <div className={styles.duration}>{duration} сек</div>}
    </div>
  );
};

export default PreviewImage;
