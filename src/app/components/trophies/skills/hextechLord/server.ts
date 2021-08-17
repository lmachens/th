import { TrophyServer } from '../../types';
import base from './base';

const hextechLord: TrophyServer = {
  ...base,
  checkProgress: ({ participant }) => {
    return participant.goldEarned / 15000;
  },
};

export default hextechLord;
