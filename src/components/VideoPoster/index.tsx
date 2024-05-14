import {FC, MouseEventHandler} from 'react';

import styles from './styles.module.sass';

interface Props {
  title: string;
  duration: number;
  imageUrl: string;
  width: string; // any valid html size
  height: string; // any valid html size
  onMouseEnter?: MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: MouseEventHandler<HTMLDivElement>;
}

const VideoPoster: FC<Props> = ({
  title,
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
      <img src={imageUrl} alt={title || 'Фото'} className={styles.image} />

      <div className={styles.infoBlock}>
        <div className={styles.title}>{title}</div>
        {duration ? <div>{duration} сек</div> : <div> </div>}
      </div>
    </div>
  );
};

export default VideoPoster;
