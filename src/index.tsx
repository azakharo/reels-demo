import React from 'react';
import {createRoot} from 'react-dom/client';
import ModalContainer from 'react-modal-promise';
import {StyledEngineProvider} from '@mui/material';

import ReelsBlock from 'src/components/ReelsBlock';
import {isProduction} from 'src/utils/env';

import './reset.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

if (isProduction) {
  console.log(`Reels version: ${import.meta.env.VITE_APP_VERSION}`);
}

// Find all widget divs
const widgetDivs = document.querySelectorAll('.reels-widget');

// Inject our component into each div
widgetDivs.forEach(div => {
  const root = createRoot(div);

  root.render(
    <React.StrictMode>
      <StyledEngineProvider injectFirst>
        <ReelsBlock filter={(div as HTMLElement).dataset.filter} />
        <ModalContainer />
      </StyledEngineProvider>
    </React.StrictMode>,
  );
});
