import React, {FC, useRef} from 'react';
import Slider from 'react-slick';

import {Reel} from 'src/types';
import {isMobileOrTablet} from 'src/utils/systemInfo';
import openFullScreenViewer from '../FullScreenViewer';
import openFullScreenViewerMobile from '../FullScreenViewerMobile';
import CarouselItem from './CarouselItem';
import styles from './styles.module.sass';

const isPhoneOrTablet = isMobileOrTablet();

const openFullScreen = isPhoneOrTablet
  ? openFullScreenViewerMobile
  : openFullScreenViewer;

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
  const sliderRef = useRef<Slider>(null);

  const handleItemClick = (clickedReel: Reel) => {
    openFullScreen({
      reels,
      initialReel: clickedReel,
    })
      .then((lastViewedReel: Reel) => {
        const reelIndex = reels.findIndex(r => r.id === lastViewedReel.id);
        sliderRef.current?.slickGoTo(reelIndex, true);
        return 0;
      })
      .catch(err => {
        console.warn('Unexpected: onResolve() must be always used', err);
      });
  };

  return (
    <Slider {...carouselSettings} className={styles.root} ref={sliderRef}>
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
