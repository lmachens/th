import { TrophyServer } from '../../types';
import base from './base';

const healer: TrophyServer = {
  ...base,
  checkProgress: ({ participant }) => {
    return Number(
      participant.totalHeal >= 25000 && participant.totalUnitsHealed >= 5
    );
  },
};

export default healer;
