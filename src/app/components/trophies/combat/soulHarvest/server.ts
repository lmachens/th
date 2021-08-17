import { TrophyServer } from '../../types';
import base from './base';
import { findPerk, getTrophyProgress } from '../../../../lib/accounts/helpers';

const soulHarvest: TrophyServer = {
  ...base,
  checkProgress: ({ participant, account }) => {
    const trophyProgress = getTrophyProgress(account, 'soulHarvest');
    const darkHarvest = findPerk(participant, 8128);
    const damage = Math.max(...Object.values(darkHarvest));
    return damage / 2000 + trophyProgress;
  },
};

export default soulHarvest;
