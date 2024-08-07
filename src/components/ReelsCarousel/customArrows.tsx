import React, {FC} from 'react';
import {CustomArrowProps} from 'react-slick';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import {IconButton} from '@mui/material';
import {darken} from '@mui/material/styles';

const bg = '#fff';
const darkenBg = darken(bg, 0.125);
const size = 32;

const commonButtonStyles = {
  position: 'absolute',
  top: `calc(50% - ${size}px)`,
  color: '#000',
  backgroundColor: bg,
  '&:hover': {
    backgroundColor: darkenBg,
  },
  boxShadow: '0px 2px 2px 0px #00000026',
};

const iconStyles = {
  fontSize: size,
};

export const NextArrow: FC<CustomArrowProps> = ({
  onClick,
  currentSlide,
  slideCount,
}) => {
  if (!slideCount || currentSlide === slideCount - 1) {
    return null;
  }

  return (
    <IconButton
      onClick={onClick}
      sx={{
        ...commonButtonStyles,
        right: 5,
      }}
    >
      <NavigateNextIcon sx={iconStyles} />
    </IconButton>
  );
};

export const PrevArrow: FC<CustomArrowProps> = ({
  onClick,
  currentSlide,
  slideCount,
}) => {
  if (!slideCount || currentSlide === 0) {
    return null;
  }

  return (
    <IconButton
      onClick={onClick}
      sx={{
        ...commonButtonStyles,
        left: 5,
        zIndex: 1, // prevent slide overlapping of this button
      }}
    >
      <NavigateBeforeIcon sx={iconStyles} />
    </IconButton>
  );
};
