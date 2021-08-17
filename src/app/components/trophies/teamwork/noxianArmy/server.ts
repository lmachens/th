import { TrophyServer } from '../../types';
import base from './base';
import { ARAM_HOWLING_ABYSS } from '../../../../lib/riot/queues';

const noxianArmy: TrophyServer = {
  ...base,
  checkProgress: ({ participant, match }) => {
    const requiredKills = match.info.queueId === ARAM_HOWLING_ABYSS ? 10 : 8;
    const requiredDeaths = match.info.queueId === ARAM_HOWLING_ABYSS ? 10 : 8;
    const requiredAssists = match.info.queueId === ARAM_HOWLING_ABYSS ? 5 : 6;
    return Number(
      participant.kills >= requiredKills &&
        participant.deaths <= requiredDeaths &&
        participant.assists >= requiredAssists
    );
  },
};

export default noxianArmy;
