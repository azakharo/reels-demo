import React from 'react';
import {createRoot} from 'react-dom/client';
import ModalContainer from 'react-modal-promise';
import {StyledEngineProvider} from '@mui/material';

import ReelsCarousel from 'src/components/ReelsCarousel';
import {Reel} from 'src/types';

import './reset.css';

// Find all widget divs
const widgetDivs = document.querySelectorAll('.reels-widget');

const reels: Reel[] = [
  {
    id: 1,
    title: 'Новая «Русалочка» вызвала негодование критиков',
    duration: 15,
    imageUrl:
      'https://img.freepik.com/free-photo/female-mannequin-gray-studio_155003-12117.jpg?t=st=1715691906~exp=1715695506~hmac=329a9fdc2c053aed24dee86303c4622b93c963ff93335cf20d0123875d649233&w=264',
    videoUrl: 'https://youtube.com/shorts/3iXYXwStYMk?si=oyXxmfT3whxc4xx8',
  },
  {
    id: 2,
    title: 'Обострение на границе Ирана и Афганистана угрожает безопасности РФ',
    duration: 21,
    imageUrl:
      'https://img.freepik.com/free-photo/war-conflict-landscape-with-soldiers-hiding_23-2149766333.jpg?t=st=1715692611~exp=1715696211~hmac=09fee0dcd37518da3cc66d41258b4a724ec18d4a61e7c05ac3eb15105569cf42&w=264',
    videoUrl: 'https://youtube.com/shorts/8i8rWUnL6p4?si=uICJhJs9nG123j9v',
  },
  {
    id: 3,
    title: 'NASA предрекает высадку людей на Марс в 2040 году',
    duration: 34,
    imageUrl:
      'https://img.freepik.com/free-photo/low-angle-shot-tall-city-building-with-blue-sky-background-new-york_181624-20345.jpg?t=st=1715696744~exp=1715700344~hmac=6654e7b922889d92580852ebcde9966dffcbd078ab507070608ab170906466ac&w=264',
    videoUrl:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
  },
  {
    id: 4,
    title: 'Формирование национальных биржевых индикаторов',
    duration: 19,
    imageUrl:
      'https://img.freepik.com/free-photo/broker-looking-laptop-analyzing-stock-market-invest-trading-stocks-graph_169016-47428.jpg?t=st=1715692971~exp=1715696571~hmac=d4142ef672f2d1f5383a3c0b78cd667493e0d43a08f4ae107c9f36fbf39ec819&w=264',
    videoUrl: 'https://youtube.com/shorts/EaEmahoM5qo?si=RSx0r4-5bF_YcZVG',
  },
  {
    id: 5,
    title: 'Педро Санчес о своих досрочных выборах',
    duration: 22,
    imageUrl:
      'https://img.freepik.com/premium-photo/cropped-hand-man-using-mobile-phone_1048944-2087593.jpg?w=264',
    videoUrl: 'https://www.youtube.com/embed/6ZFahsrOsMw',
  },
  {
    id: 6,
    title: 'Страна чудес!',
    duration: 16,
    imageUrl:
      'https://img.freepik.com/free-photo/aerial-view-busy-highway-intersection-full-traffic-daytime_181624-46287.jpg?t=st=1715696464~exp=1715700064~hmac=9cc74ad901e8869e0459aa794cce3cdd7fb9c46029be2fbf22eba98a6656779e&w=264',
    videoUrl: 'https://www.youtube.com/embed/6ZFahsrOsMw',
  },
  {
    id: 7,
    title: 'О самом популярном сайте Рунета',
    duration: 27,
    imageUrl:
      'https://img.freepik.com/free-photo/black-mini-coupe-road_114579-5056.jpg?t=st=1715696575~exp=1715700175~hmac=69998f3443293de7a622df07f740236e56e70bda9ba38cb05ca67cfe2522fcc8&w=264',
    videoUrl: 'https://www.youtube.com/embed/6ZFahsrOsMw',
  },
  {
    id: 8,
    title: 'Никогда такого не было и вот опять',
    duration: 41,
    imageUrl:
      'https://img.freepik.com/free-photo/vertical-shot-white-building-clear-sky_181624-4575.jpg?t=st=1715696722~exp=1715700322~hmac=bf8f12cf26bb123345d46c46b11941fa47f43ba0898813c683418d9034561427&w=264',
    videoUrl: 'https://www.youtube.com/embed/6ZFahsrOsMw',
  },
  {
    id: 9,
    title: 'Хотели как лучше...',
    duration: 15,
    imageUrl:
      'https://img.freepik.com/free-photo/low-angle-shot-tall-city-building-with-blue-sky-background-new-york_181624-20345.jpg?t=st=1715696744~exp=1715700344~hmac=6654e7b922889d92580852ebcde9966dffcbd078ab507070608ab170906466ac&w=264',
    videoUrl: 'https://www.youtube.com/embed/6ZFahsrOsMw',
  },
  {
    id: 10,
    title: 'Что русскому хорошо, то немцу смерть',
    duration: 34,
    imageUrl:
      'https://img.freepik.com/free-photo/nadir-shoot-crystal-building_1112-417.jpg?t=st=1715696762~exp=1715700362~hmac=b636e102fa2df2eb8c4dfe4fd1e00e7da660173d7ca304d21b42967fb6b47759&w=264',
    videoUrl: 'https://www.youtube.com/embed/6ZFahsrOsMw',
  },
];

// Inject our component into each div
widgetDivs.forEach(div => {
  const root = createRoot(div);
  root.render(
    <React.StrictMode>
      <StyledEngineProvider injectFirst>
        <ReelsCarousel reels={reels} />
        <ModalContainer />
      </StyledEngineProvider>
    </React.StrictMode>,
  );
});
