import { TrophyServer } from '../../types';
import base from './base';
import { ARAM_HOWLING_ABYSS } from '../../../../lib/riot/queues';

const maniac: TrophyServer = {
  ...base,
  checkProgress: ({ participant, match }) => {
    const requiredKills = match.info.queueId === ARAM_HOWLING_ABYSS ? 12 : 10;

    return participant.kills / requiredKills;
  },
};

export default maniac;
