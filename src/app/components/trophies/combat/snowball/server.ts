import { TrophyServer } from '../../types';
import base from './base';
import { ARAM_HOWLING_ABYSS } from '../../../../lib/riot/queues';

const snowball: TrophyServer = {
  ...base,
  checkProgress: ({ events, participant, match }) => {
    const requiredKills = match.info.queueId === ARAM_HOWLING_ABYSS ? 7 : 5;
    const snowballKills = events.filter(
      (event) =>
        event.type === 'CHAMPION_KILL' &&
        event.killerId === participant.participantId &&
        event.timestamp < 720000
    ).length;

    return snowballKills / requiredKills;
  },
};

export default snowball;
