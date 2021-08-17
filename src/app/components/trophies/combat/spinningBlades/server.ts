import { TrophyServer } from '../../types';
import base from './base';
import { findPerk, getTrophyProgress } from '../../../../lib/accounts/helpers';

const spinningBlades: TrophyServer = {
  ...base,
  checkProgress: ({ participant, account }) => {
    const trophyProgress = getTrophyProgress(account, 'spinningBlades');
    const pressTheAttack = findPerk(participant, 8005);
    const damage = Math.max(...Object.values(pressTheAttack));

    return damage / 2500 + trophyProgress;
  },
};

export default spinningBlades;
