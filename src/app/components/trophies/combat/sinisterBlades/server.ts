import { TrophyServer } from '../../types';
import base from './base';
import { ARAM_HOWLING_ABYSS } from '../../../../lib/riot/queues';

const sinisterBlades: TrophyServer = {
  ...base,
  checkProgress: ({ participant, match }) => {
    const requiredDoubleKills =
      match.info.queueId === ARAM_HOWLING_ABYSS ? 7 : 4;
    return participant.doubleKills / requiredDoubleKills;
  },
};

export default sinisterBlades;
