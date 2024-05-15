import React, {FC} from 'react';
import Slider from 'react-slick';

import ReelVideo from 'src/components/ReelVideo';
import {Reel} from 'src/types';
import styles from './styles.module.sass';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface Props {
  reels: Reel[];
}

const carouselSettings = {
  dots: false,
  arrows: false,
  infinite: true,
  speed: 500,
  variableWidth: true,
  swipeToSlide: true,
};

const ReelsCarousel: FC<Props> = ({reels}) => {
  return (
    <Slider {...carouselSettings} className={styles.root}>
      {reels.map(reel => {
        return (
          <ReelVideo key={reel.id} reel={reel} width="264px" height="470px" />
        );
      })}
    </Slider>
  );
};

export default ReelsCarousel;
