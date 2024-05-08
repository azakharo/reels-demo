import React from 'react';
import {createRoot} from 'react-dom/client';

import HelloWorld from 'src/components/HelloWorld';

import './reset.css';

// Find all widget divs
const widgetDivs = document.querySelectorAll('.reels-widget');

// Inject our component into each div
widgetDivs.forEach(div => {
  const root = createRoot(div);
  root.render(
    <React.StrictMode>
      <HelloWorld name={(div as HTMLElement).dataset.name || ''} />
    </React.StrictMode>,
  );
});
