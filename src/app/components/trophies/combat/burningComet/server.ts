import { TrophyServer } from '../../types';
import base from './base';
import { findPerk, getTrophyProgress } from '../../../../lib/accounts/helpers';

const burningComet: TrophyServer = {
  ...base,
  checkProgress: ({ account, participant }) => {
    const trophyProgress = getTrophyProgress(account, 'burningComet');
    const arcaneCometPerk = findPerk(participant, 8229);
    const damage = Math.max(...Object.values(arcaneCometPerk));
    return damage / 2500 + trophyProgress;
  },
};

export default burningComet;
