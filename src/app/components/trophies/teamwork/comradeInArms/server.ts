import { TrophyServer } from '../../types';
import base from './base';

const comradeInArms: TrophyServer = {
  ...base,
  checkProgress: ({ events, participant }) => {
    const duoKills = events.reduce<{ [teammateId: number]: number }>(
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

    return Math.max(...Object.values(duoKills), 0) / 3;
  },
};

export default comradeInArms;
