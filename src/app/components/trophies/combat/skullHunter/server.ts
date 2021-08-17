import { TrophyServer } from '../../types';
import base from './base';
import { getTrophyProgress } from '../../../../lib/accounts/helpers';

const skullHunter: TrophyServer = {
  ...base,
  checkProgress: ({ participant, account }) => {
    const trophyProgress = getTrophyProgress(account, 'skullHunter');

    const killsAssists = participant.assists + participant.kills;
    return killsAssists / 20 + trophyProgress;
  },
};

export default skullHunter;
