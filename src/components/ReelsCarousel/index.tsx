import React, {FC} from 'react';
import Slider from 'react-slick';

import CarouselItem from 'src/components/ReelsCarousel/CarouselItem';
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
  infinite: false,
  speed: 500,
  variableWidth: true,
  swipeToSlide: true,
};

const ReelsCarousel: FC<Props> = ({reels}) => {
  return (
    <Slider {...carouselSettings} className={styles.root}>
      {reels.map(reel => {
        return <CarouselItem key={reel.id} reel={reel} width="264px" />;
      })}
    </Slider>
  );
};

export default ReelsCarousel;
