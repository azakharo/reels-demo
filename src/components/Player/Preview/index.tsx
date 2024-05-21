import {FC} from 'react';

// import {
//   PlayerAction,
//   PlayerActionType,
// } from 'src/components/Player/Player.reducer';
import styles from './styles.module.sass';

interface Props {
  // dispatch: Dispatch<PlayerAction>;
  duration: number;
  imageUrl: string;
}

const Preview: FC<Props> = ({duration, imageUrl}) => {
  // const handleMouseEnter = () => {
  //   console.log('Mouse Enter');
  //   dispatch({type: PlayerActionType.LIGHT, payload: false});
  //   dispatch({type: PlayerActionType.PLAY});
  // };
  //
  // const handleMouseLeave = () => {
  //   console.log('Mouse Leave');
  //   dispatch({type: PlayerActionType.LIGHT, payload: true});
  //   dispatch({type: PlayerActionType.PAUSE});
  // };

  return (
    <div
      className={styles.container}
      // onMouseEnter={handleMouseEnter}
      // onMouseLeave={handleMouseLeave}
    >
      <img src={imageUrl} alt={'Фото'} className={styles.image} />

      {duration && <div className={styles.duration}>{duration} сек</div>}
    </div>
  );
};

export default Preview;
