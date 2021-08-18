import { ARAM_HOWLING_ABYSS } from '../../../../lib/riot/queues';
import { TrophyServer } from '../../types';
import base from './base';

const bombardment: TrophyServer = {
  ...base,
  checkProgress: ({ match, participant }) => {
    const damagePerMinute =
      (60 * 1000 * participant.totalDamageDealtToChampions) /
      match.info.gameDuration;

    if (match.info.queueId === ARAM_HOWLING_ABYSS) {
      return damagePerMinute / 1500;
    }

    return damagePerMinute / 1000;
  },
};

export default bombardment;
