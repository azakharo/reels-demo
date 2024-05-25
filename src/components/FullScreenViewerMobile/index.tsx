import React, {FC, useCallback, useRef, useState} from 'react';
import {create, InstanceProps} from 'react-modal-promise';
import Slider from 'react-slick';
import CloseIcon from '@mui/icons-material/Close';
import {IconButton, Modal} from '@mui/material';

import Player from 'src/components/Player';
import {Reel} from 'src/types';
import styles from './styles.module.sass';

const carouselSettings = {
  dots: false,
  arrows: false,
  infinite: false,
  speed: 500,
  swipeToSlide: true,
  slidesToShow: 1,
  slidesToScroll: 1,
};

// Returns current reel
interface Props extends InstanceProps<Reel> {
  reels: Reel[];
  initialReel: Reel;
}

const FullScreenViewer: FC<Props> = ({reels, initialReel, onResolve}) => {
  const sliderRef = useRef<Slider | null>(null);
  const [currentReel, setCurrentReel] = useState<Reel>(initialReel);

  const currentReelIndex = reels.findIndex(r => r.id === currentReel.id);
  const canGoPrev = currentReelIndex > 0;
  const canGoNext =
    currentReelIndex >= 0 && currentReelIndex < reels.length - 1;

  const handlePrev = useCallback(() => {
    sliderRef.current?.slickPrev();
  }, []);

  const handleNext = useCallback(() => {
    sliderRef.current?.slickNext();
  }, []);

  const handleAfterChange = useCallback(
    (index: number) => {
      setCurrentReel(reels[index] as Reel);
    },
    [reels],
  );

  const handleClose = useCallback(() => {
    onResolve(currentReel);
  }, [onResolve, currentReel]);

  return (
    <Modal onClose={handleClose} open={true}>
      <div className={styles.container}>
        {/* Player */}
        <Slider
          ref={sliderRef}
          {...carouselSettings}
          lazyLoad="ondemand"
          initialSlide={currentReelIndex}
          afterChange={handleAfterChange}
        >
          {reels.map(reel => {
            if (reel !== currentReel) {
              // The following is necessary for removing already viewed videos.
              // It saves memory and stops playing video.
              return <div key={reel.id}></div>;
            }

            return (
              <Player
                key={reel.id}
                url={reel.videoUrl}
                title={reel.title}
                canGoPrev={canGoPrev}
                onGoPrev={handlePrev}
                canGoNext={canGoNext}
                onGoNext={handleNext}
              />
            );
          })}
        </Slider>

        {/* Close icon */}
        <IconButton
          sx={{
            color: '#fff',
            '&:hover': {
              backgroundColor: '#343434',
            },
          }}
          size="large"
          aria-label="close"
          onClick={handleClose}
          className={styles.closeButton}
        >
          <CloseIcon
            sx={{
              fontSize: 36,
            }}
          />
        </IconButton>
      </div>
    </Modal>
  );
};

export default create(FullScreenViewer);
