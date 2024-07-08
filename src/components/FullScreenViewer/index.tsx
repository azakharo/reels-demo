import React, {FC, useCallback, useState} from 'react';
import {create, InstanceProps} from 'react-modal-promise';
import CloseIcon from '@mui/icons-material/Close';
import {IconButton, Modal} from '@mui/material';

import Player from 'src/components/Player';
import {Reel} from 'src/types';
import styles from './styles.module.sass';

// Returns current reel
interface Props extends InstanceProps<Reel> {
  reels: Reel[];
  initialReel: Reel;
}

const FullScreenViewer: FC<Props> = ({reels, initialReel, onResolve}) => {
  const [currentReel, setCurrentReel] = useState<Reel>(initialReel);
  const {videoUrl, title} = currentReel;

  const currentReelIndex = reels.findIndex(r => r.id === currentReel.id);
  const canGoPrev = currentReelIndex > 0;
  const canGoNext =
    currentReelIndex >= 0 && currentReelIndex < reels.length - 1;

  const handlePrev = useCallback(() => {
    const prevReel = reels[currentReelIndex - 1] as Reel;
    setCurrentReel(prevReel);
  }, [currentReelIndex, setCurrentReel, reels]);

  const handleNext = useCallback(() => {
    const nextReel = reels[currentReelIndex + 1] as Reel;
    setCurrentReel(nextReel);
  }, [currentReelIndex, setCurrentReel, reels]);

  const handleClose = useCallback(() => {
    onResolve(currentReel);
  }, [onResolve, currentReel]);

  return (
    // TODO workaround navigation overlapping on iz.ru
    <Modal onClose={handleClose} open={true} sx={{zIndex: 100_000}}>
      <div className={styles.container}>
        {/* Player */}
        <Player
          url={videoUrl}
          title={title}
          containerClassName={styles.player}
          canGoPrev={canGoPrev}
          onGoPrev={handlePrev}
          canGoNext={canGoNext}
          onGoNext={handleNext}
        />

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
