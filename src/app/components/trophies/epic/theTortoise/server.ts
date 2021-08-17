import { TrophyServer } from '../../types';
import base from './base';
import { ARAM_HOWLING_ABYSS } from '../../../../lib/riot/queues';

const theTortoise: TrophyServer = {
  ...base,
  checkProgress: ({ match, participant }) => {
    const requiredTimelimit =
      match.info.queueId === ARAM_HOWLING_ABYSS ? 1200 : 1800;
    if (
      !participant.longestTimeSpentLiving &&
      match.info.gameDuration >= requiredTimelimit
    ) {
      return 1;
    }

    return participant.longestTimeSpentLiving / requiredTimelimit;
  },
};

export default theTortoise;
