import { TrophyServer } from '../../types';
import base from './base';

const pentaKill: TrophyServer = {
  ...base,
  checkProgress: ({ participant }) => {
    return participant.pentaKills;
  },
};

export default pentaKill;
