import { TrophyServer } from '../../types';
import base from './base';
import { getTrophyProgress } from '../../../../lib/accounts/helpers';

const machete: TrophyServer = {
  ...base,
  checkProgress: ({ account, participant }) => {
    const trophyProgress = getTrophyProgress(account, 'machete');
    return participant.totalDamageDealtToChampions / 50000 + trophyProgress;
  },
};

export default machete;
