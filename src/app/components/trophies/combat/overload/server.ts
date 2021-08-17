import { TrophyServer } from '../../types';
import base from './base';
import { findPerk, getTrophyProgress } from '../../../../lib/accounts/helpers';

const overload: TrophyServer = {
  ...base,
  checkProgress: ({ participant, account }) => {
    const trophyProgress = getTrophyProgress(account, 'overload');
    const electrocute = findPerk(participant, 8112);
    const damage = Math.max(...Object.values(electrocute));
    return damage / 2500 + trophyProgress;
  },
};

export default overload;
