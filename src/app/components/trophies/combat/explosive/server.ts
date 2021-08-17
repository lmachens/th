import { TrophyServer } from '../../types';
import base from './base';

const explosive: TrophyServer = {
  ...base,
  checkProgress: ({ participant }) => {
    const progress =
      Number(participant.largestKillingSpree >= 5) +
      Number(participant.largestMultiKill >= 3) +
      Number(participant.largestCriticalStrike >= 800);

    return progress / 3;
  },
};

export default explosive;
