import {Reel} from 'src/types';
import {axi} from './axiosSetup';
import {GetReelsBackendResponseData} from './backendTypes';
import {mapReel} from './mapper';

const getReelsHelper = async (endPointName: string): Promise<Reel[]> => {
  const resp = await axi.get<GetReelsBackendResponseData>(
    `/api/reels/${endPointName}`,
    {
      // basic auth is necessary only on dev stand
      auth: {
        username: 'izve',
        password: 'GHhj33!',
      },
      params: {
        token: 'ea917c4f2445',
      },
    },
  );

  const backendData = resp.data;
  return backendData.object.map(backendReel => mapReel(backendReel));
};

export const getReelsAll = async (): Promise<Reel[]> => {
  return getReelsHelper('all');
};

export const getReelsForMainPage = async (): Promise<Reel[]> => {
  return getReelsHelper('main');
};
