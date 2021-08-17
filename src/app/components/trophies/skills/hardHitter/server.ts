import { TrophyServer } from '../../types';
import base from './base';
import { getTrophyProgress } from '../../../../lib/accounts/helpers';

const hardHitter: TrophyServer = {
  ...base,
  checkProgress: ({ participant, account }) => {
    const trophyProgress = getTrophyProgress(account, 'hardHitter');
    return participant.totalDamageDealt / 150000 + trophyProgress;
  },
};

export default hardHitter;
