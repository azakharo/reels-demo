import React, {FC, useState} from 'react';
import Slider from 'react-slick';

import {Reel} from 'src/types';
import openFullScreenViewer from '../FullScreenViewer';
import CarouselItem from './CarouselItem';
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
  const [openedReel, setOpenedReel] = useState<Reel | null>(null);

  const handleItemClick = (clickedReel: Reel) => {
    console.log('clicked', {clickedReel});
    setOpenedReel(clickedReel);

    openFullScreenViewer({
      reel: clickedReel,
    })
      .then(() => {
        console.log('resolved');
        return 0;
      })
      .catch(err => {
        console.error(err);
      });
  };

  console.log({openedReel});

  return (
    <Slider {...carouselSettings} className={styles.root}>
      {reels.map(reel => {
        return (
          <CarouselItem
            key={reel.id}
            reel={reel}
            width="264px"
            onClick={handleItemClick}
          />
        );
      })}
    </Slider>
  );
};

export default ReelsCarousel;
