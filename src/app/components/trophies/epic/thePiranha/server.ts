import { TrophyServer } from '../../types';
import base from './base';
import { getTrophyProgress } from '../../../../lib/accounts/helpers';

const thePiranha: TrophyServer = {
  ...base,
  checkProgress: ({ match, account, participant }) => {
    const maxDamage = Math.max(
      ...match.info.participants.map(
        (participant) => participant.totalDamageDealtToChampions
      )
    );

    const mostDamage = participant.totalDamageDealtToChampions === maxDamage;

    if (!mostDamage) {
      return 0;
    }
    const trophyProgress = getTrophyProgress(account, 'thePiranha');
    return Number(mostDamage) / 3 + trophyProgress;
  },
};

export default thePiranha;
