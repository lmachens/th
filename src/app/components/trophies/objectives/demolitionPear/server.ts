import { TrophyServer } from '../../types';
import base from './base';

const demolitionPear: TrophyServer = {
  ...base,
  checkProgress: ({ participant }) => {
    return participant.turretKills / 5;
  },
};

export default demolitionPear;
