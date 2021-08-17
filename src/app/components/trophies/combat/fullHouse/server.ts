import { TrophyServer } from '../../types';
import base from './base';
import { ARAM_HOWLING_ABYSS } from '../../../../lib/riot/queues';

const fullHouse: TrophyServer = {
  ...base,
  checkProgress: ({ participant, match }) => {
    let progress = Math.min(1, participant.tripleKills);
    if (match.info.queueId === ARAM_HOWLING_ABYSS) {
      progress += Math.min(1, participant.doubleKills / 3);
    } else {
      progress += Math.min(1, participant.doubleKills);
    }
    return progress / 2;
  },
};

export default fullHouse;
