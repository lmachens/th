import { TrophyServer } from '../../types';
import base from './base';

const tripleKill: TrophyServer = {
  ...base,
  checkProgress: ({ participant }) => {
    return Number(participant.tripleKills > 0);
  },
};

export default tripleKill;
