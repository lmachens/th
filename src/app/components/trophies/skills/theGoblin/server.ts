import { TrophyServer } from '../../types';
import base from './base';
import { getTrophyProgress } from '../../../../lib/accounts/helpers';

const theGoblin: TrophyServer = {
  ...base,
  checkProgress: ({ match, participant, account }) => {
    const maxJungleCs = Math.max(
      ...match.info.participants.map(
        (participant) => participant.neutralMinionsKilled
      )
    );

    const mostJungleCS = participant.neutralMinionsKilled >= maxJungleCs;
    if (!mostJungleCS) {
      return 0;
    }
    const trophyProgress = getTrophyProgress(account, 'theGoblin');
    return Number(mostJungleCS) / 3 + trophyProgress;
  },
};

export default theGoblin;
