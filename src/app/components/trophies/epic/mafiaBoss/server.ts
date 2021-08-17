import { TrophyServer } from '../../types';
import base from './base';
import { ARAM_HOWLING_ABYSS } from '../../../../lib/riot/queues';

const mafiaBoss: TrophyServer = {
  ...base,
  checkProgress: ({ participant, match }) => {
    const requiredAssists = match.info.queueId === ARAM_HOWLING_ABYSS ? 40 : 30;
    return participant.assists / requiredAssists;
  },
};

export default mafiaBoss;
