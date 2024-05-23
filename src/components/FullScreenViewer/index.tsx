import React, {FC} from 'react';
import {create, InstanceProps} from 'react-modal-promise';
import CloseIcon from '@mui/icons-material/Close';
import {IconButton, Modal} from '@mui/material';

import Player from 'src/components/Player';
import {DialogDefaultResolveResult, Reel} from 'src/types';
import styles from './styles.module.sass';

interface Props extends InstanceProps<DialogDefaultResolveResult> {
  reel: Reel;
}

const FullScreenViewer: FC<Props> = ({reel, onResolve}) => {
  const {videoUrl, title} = reel;

  return (
    <Modal onClose={() => onResolve()} open={true}>
      <div className={styles.container}>
        {/* Player */}
        <Player
          url={videoUrl}
          title={title}
          containerClassName={styles.player}
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
          onClick={() => onResolve()}
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
