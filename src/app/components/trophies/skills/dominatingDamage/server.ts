import { TrophyServer } from '../../types';
import base from './base';
import { getTrophyProgress } from '../../../../lib/accounts/helpers';

const dominatingDamage: TrophyServer = {
  ...base,
  checkProgress: ({ participant, account }) => {
    const trophyProgress = getTrophyProgress(account, 'dominatingDamage');
    return participant.totalDamageDealt / 200000 + trophyProgress;
  },
};

export default dominatingDamage;
