import { TrophyServer } from '../../types';
import base from './base';

const sandsOfTime: TrophyServer = {
  ...base,
  checkProgress: ({ match }) => {
    return Number(match.info.gameDuration >= 3000 * 1000);
  },
};

export default sandsOfTime;
