import { TrophyServer } from '../../types';
import base from './base';
import { getTrophyProgress } from '../../../../lib/accounts/helpers';

const theWhale: TrophyServer = {
  ...base,
  checkProgress: ({ match, account, participant }) => {
    const mostCS = Math.max(
      ...match.info.participants.map(
        (participant) =>
          participant.totalMinionsKilled + participant.neutralMinionsKilled
      )
    );

    const hasMostCS =
      participant.totalMinionsKilled + participant.neutralMinionsKilled >=
      mostCS;
    if (!hasMostCS) {
      return 0;
    }

    const trophyProgress = getTrophyProgress(account, 'theWhale');
    return 1 / 3 + trophyProgress;
  },
};

export default theWhale;
