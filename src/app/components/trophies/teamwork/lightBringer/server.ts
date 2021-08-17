import { TrophyServer } from '../../types';
import base from './base';
import { getTrophyProgress } from '../../../../lib/accounts/helpers';

const lightBringer: TrophyServer = {
  ...base,
  checkProgress: ({ participant, account }) => {
    const trophyProgress = getTrophyProgress(account, 'lightBringer');
    return participant.wardsPlaced / 25 + trophyProgress;
  },
};

export default lightBringer;
