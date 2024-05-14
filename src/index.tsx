import React from 'react';
import {createRoot} from 'react-dom/client';

import ReelVideo from 'src/components/ReelVideo';
import {Reel} from 'src/types';

import './reset.css';

// Find all widget divs
const widgetDivs = document.querySelectorAll('.reels-widget');

const reel: Reel = {
  id: 1,
  title: 'Новая «Русалочка» вызвала негодование критиков',
  duration: 15,
  imageUrl:
    'http://a.iz.env1/sites/default/files/styles/970x546/public/video_item-2024-04/Skabioza_foto13.jpg?itok=o8r3KzAs',
  videoUrl: 'https://www.youtube.com/embed/6ZFahsrOsMw',
};

// Inject our component into each div
widgetDivs.forEach(div => {
  const root = createRoot(div);
  root.render(
    <React.StrictMode>
      <ReelVideo reel={reel} width="264px" height="470px" />
    </React.StrictMode>,
  );
});
