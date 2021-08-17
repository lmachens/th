import { TrophyServer } from '../../types';
import base from './base';
import { ARAM_HOWLING_ABYSS } from '../../../../lib/riot/queues';

const bloodBrothers: TrophyServer = {
  ...base,
  checkProgress: ({ events, participant, match }) => {
    const duoKillsEvents = events.reduce<{ [teammateId: number]: number }>(
      (duoKills, event) => {
        if (
          event.type !== 'CHAMPION_KILL' ||
          (event.killerId !== participant.participantId &&
            !event.assistingParticipantIds?.includes(
              participant.participantId
            )) ||
          event.assistingParticipantIds?.length !== 1
        ) {
          return duoKills;
        }
        const teammateId =
          event.killerId === participant.participantId
            ? event.assistingParticipantIds[0]
            : event.killerId;
        return {
          ...duoKills,
          [teammateId]: (duoKills[teammateId] || 0) + 1,
        };
      },
      {}
    );
    const duoKills = Math.max(...Object.values(duoKillsEvents), 0);
    if (match.info.queueId === ARAM_HOWLING_ABYSS) {
      return duoKills / 5;
    }
    return duoKills / 7;
  },
};

export default bloodBrothers;
