import { TrophyServer } from '../../types';
import base from './base';
import { getTrophyProgress } from '../../../../lib/accounts/helpers';

const firstBloodKing: TrophyServer = {
  ...base,
  checkProgress: ({ participant, account }) => {
    if (!participant.firstBloodKill) {
      return 0;
    }
    const trophyProgress = getTrophyProgress(account, 'firstBloodKing');
    return Number(participant.firstBloodKill) / 3 + trophyProgress;
  },
};

export default firstBloodKing;
