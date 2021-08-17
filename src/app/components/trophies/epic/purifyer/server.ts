import { TrophyServer } from '../../types';
import base from './base';
import { ARAM_HOWLING_ABYSS } from '../../../../lib/riot/queues';

const purifyer: TrophyServer = {
  ...base,
  checkProgress: ({ participant, match }) => {
    const requiredKills = match.info.queueId === ARAM_HOWLING_ABYSS ? 32 : 30;
    return participant.kills / requiredKills;
  },
};

export default purifyer;
