import { TrophyServer } from '../../types';
import base from './base';
import { getTrophyProgress } from '../../../../lib/accounts/helpers';

const damageDealer: TrophyServer = {
  ...base,
  checkProgress: ({ participant, account }) => {
    const trophyProgress = getTrophyProgress(account, 'damageDealer');
    return participant.totalDamageDealt / 100000 + trophyProgress;
  },
};

export default damageDealer;
