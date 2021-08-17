import { TrophyServer } from '../../types';
import base from './base';
import { getTrophyProgress } from '../../../../lib/accounts/helpers';

const theCat: TrophyServer = {
  ...base,
  checkProgress: ({ match, account, participant }) => {
    const minDeaths = Math.min(
      ...match.info.participants.map((participant) => participant.deaths)
    );

    const hasMinDeaths = Number(participant.deaths <= minDeaths);
    if (!hasMinDeaths) {
      return 0;
    }
    const trophyProgress = getTrophyProgress(account, 'theCat');
    return hasMinDeaths / 3 + trophyProgress;
  },
};

export default theCat;
