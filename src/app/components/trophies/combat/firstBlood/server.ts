import { TrophyServer } from '../../types';
import base from './base';

const firstBlood: TrophyServer = {
  ...base,
  checkProgress: ({ participant }) => {
    return Number(participant.firstBloodKill);
  },
};

export default firstBlood;
