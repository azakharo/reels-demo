import * as React from 'react';
import {styled} from '@mui/material';

const StyledPlayerOverlay = styled('div')`
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
  bottom: 0;
`;

interface Props {
  onClick: () => void;
}

const PlayerOverlay: React.FC<Props> = ({onClick}) => {
  return <StyledPlayerOverlay onClick={onClick}></StyledPlayerOverlay>;
};

export default PlayerOverlay;
