import React, {FC} from 'react';
import {Box} from '@mui/material';
import useRequest from 'ahooks/es/useRequest';

import {getReels} from 'src/api';
import {Reel} from 'src/types';
import {isMobile} from 'src/utils/systemInfo';
import ReelsCarousel from '../ReelsCarousel';

const ReelsBlock: FC = () => {
  const {data, error, loading} = useRequest(getReels);

  if (loading || error) {
    return null;
  }

  return (
    <Box
      sx={{
        padding: '30px',
        backgroundColor: isMobile ? undefined : '#f6f6f6',
      }}
    >
      <ReelsCarousel reels={data as Reel[]} />
    </Box>
  );
};

export default ReelsBlock;
