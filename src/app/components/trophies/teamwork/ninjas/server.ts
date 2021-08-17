import { TrophyServer } from '../../types';
import base from './base';
import { MatchEvent } from '../../../../lib/riot/types';

const ninjas: TrophyServer = {
  ...base,
  checkProgress: ({ events, participant }) => {
    const duoKills = events.reduce<{ [teammateId: number]: MatchEvent[] }>(
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
          [teammateId]: [...(duoKills[teammateId] || []), event],
        };
      },
      {}
    );
    const hasDuoTripleKills = Object.values(duoKills).some(
      (duoKills) =>
        duoKills.length >= 3 &&
        duoKills[0].timestamp + 10000 > duoKills[1].timestamp &&
        duoKills[1].timestamp + 10000 > duoKills[2].timestamp
    );

    return Number(hasDuoTripleKills);
  },
};

export default ninjas;
