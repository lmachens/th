import { TrophyServer } from '../../types';
import base from './base';
import { ARAM_HOWLING_ABYSS } from '../../../../lib/riot/queues';

const kitchenKnife: TrophyServer = {
  ...base,
  checkProgress: ({ participant, match }) => {
    const requiredDamage =
      match.info.queueId === ARAM_HOWLING_ABYSS ? 35000 : 30000;
    return participant.totalDamageDealtToChampions / requiredDamage;
  },
};

export default kitchenKnife;
