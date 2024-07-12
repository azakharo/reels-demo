import React, {FC} from 'react';
import {Box, Divider} from '@mui/material';
import useRequest from 'ahooks/es/useRequest';

import {getReelsAll, getReelsForMainPage} from 'src/api';
import {Reel} from 'src/types';
import {isMobile} from 'src/utils/systemInfo';
import ReelsCarousel from '../ReelsCarousel';

interface Props {
  filter?: string;
}

const ReelsBlock: FC<Props> = ({filter}) => {
  const isForMainPage = filter === 'main';
  const apiMethod = isForMainPage ? getReelsForMainPage : getReelsAll;
  const {data, error, loading} = useRequest(apiMethod);

  if (loading || error) {
    return null;
  }

  const reelsCarousel = (
    <ReelsCarousel
      reels={data as Reel[]}
      slideWidth={isForMainPage ? undefined : '184px'}
      slideHeight={isForMainPage ? undefined : '327px'}
    />
  );

  if (isForMainPage) {
    return (
      <Box
        sx={{
          padding: '30px',
          backgroundColor: isMobile ? undefined : '#f6f6f6',
        }}
      >
        {reelsCarousel}
      </Box>
    );
  }

  return (
    <>
      <Divider />

      <Box
        sx={{
          padding: '30px',
        }}
      >
        {reelsCarousel}
      </Box>
    </>
  );
};

export default ReelsBlock;
