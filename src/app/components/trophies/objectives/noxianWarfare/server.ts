import { TrophyServer } from '../../types';
import base from './base';
import { getTrophyProgress } from '../../../../lib/accounts/helpers';

const noxianWarfare: TrophyServer = {
  ...base,
  checkProgress: ({ match, account, participant }) => {
    const mostDestructs =
      participant.inhibitorKills + participant.turretKills >=
      Math.max(
        ...match.info.participants.map(
          (other) => other.inhibitorKills + other.turretKills
        )
      );

    if (!mostDestructs) {
      return 0;
    }
    const trophyProgress = getTrophyProgress(account, 'noxianWarfare');
    return Number(mostDestructs) / 3 + trophyProgress;
  },
};

export default noxianWarfare;
