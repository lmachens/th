import { TrophyServer } from '../../types';
import base from './base';

const quadraKill: TrophyServer = {
  ...base,
  checkProgress: ({ participant }) => {
    return participant.quadraKills;
  },
};

export default quadraKill;
