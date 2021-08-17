import { TrophyServer } from '../../types';
import base from './base';
import { getOtherParticipants } from '../../../../lib/riot/helpers';

const overfed: TrophyServer = {
  ...base,
  checkProgress: ({ match, participant }) => {
    const maxGoldSpentOthers = Math.max(
      ...getOtherParticipants(match, participant).map(
        (other) => other.goldSpent
      )
    );
    return Number(participant.goldSpent >= 1.25 * maxGoldSpentOthers);
  },
};

export default overfed;
