import { TrophyServer } from '../../types';
import base from './base';
import { ARAM_HOWLING_ABYSS } from '../../../../lib/riot/queues';

const stomp: TrophyServer = {
  ...base,
  checkProgress: ({ match, participant }) => {
    const requiredDuration =
      match.info.queueId === ARAM_HOWLING_ABYSS ? 16 * 1000 : 22 * 1000;

    return Number(
      match.info.gameDuration < requiredDuration * 60 && participant.win
    );
  },
};

export default stomp;
