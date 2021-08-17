import { TrophyServer } from '../../types';
import base from './base';
import { ARAM_HOWLING_ABYSS } from '../../../../lib/riot/queues';

const teamPlayer: TrophyServer = {
  ...base,
  checkProgress: ({ participant, match }) => {
    const requiredAssists = match.info.queueId === ARAM_HOWLING_ABYSS ? 20 : 10;
    return participant.assists / requiredAssists;
  },
};

export default teamPlayer;
