import { TrophyServer } from '../../types';
import base from './base';

const quackery: TrophyServer = {
  ...base,
  checkProgress: ({ participant }) => {
    return Number(
      participant.totalHeal >= 15000 && participant.totalUnitsHealed >= 5
    );
  },
};

export default quackery;
