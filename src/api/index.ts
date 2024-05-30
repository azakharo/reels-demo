import {Reel} from 'src/types';
import {axi} from './axiosSetup';
import {GetReelsBackendResponseData} from './backendTypes';
import {mapReel} from './mapper';

export const getReels = async (): Promise<Reel[]> => {
  const resp = await axi.get<GetReelsBackendResponseData>('/api/0/reels/all', {
    // basic auth is necessary only on dev stand
    auth: {
      username: 'izve',
      password: 'GHhj33!',
    },
    params: {
      token: 'ea917c4f2445',
    },
  });

  const backendData = resp.data;
  return backendData.object.map(backendReel => mapReel(backendReel));
};
