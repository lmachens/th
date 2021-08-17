import { TrophyServer } from '../../types';
import base from './base';
import { ARAM_HOWLING_ABYSS } from '../../../../lib/riot/queues';

const feedThem: TrophyServer = {
  ...base,
  checkProgress: ({ match, participant, events }) => {
    const assists = events.reduce<{ [teammateId: number]: number }>(
      (assists, event) => {
        if (
          event.type !== 'CHAMPION_KILL' ||
          !event.assistingParticipantIds?.includes(participant.participantId)
        ) {
          return assists;
        }
        const teammateId = event.killerId;
        return {
          ...assists,
          [teammateId]: (assists[teammateId] || 0) + 1,
        };
      },
      {}
    );
    if (match.info.queueId === ARAM_HOWLING_ABYSS) {
      const validAssists = Object.values(assists).filter(
        (assist) => assist >= 3
      ).length;
      return validAssists / 4;
    }
    return Object.keys(assists).length / 4;
  },
};

export default feedThem;
