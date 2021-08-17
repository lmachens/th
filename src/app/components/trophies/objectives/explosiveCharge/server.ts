import { TrophyServer } from '../../types';
import base from './base';

const explosiveCharge: TrophyServer = {
  ...base,
  checkProgress: ({ participant }) => {
    return participant.damageDealtToTurrets / 10000;
  },
};

export default explosiveCharge;
