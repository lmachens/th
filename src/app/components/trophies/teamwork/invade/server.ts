import { TrophyServer } from '../../types';
import base from './base';

const invade: TrophyServer = {
  ...base,
  checkProgress: ({ events, participant }) => {
    const hasInvadeKillParticipation = events.some(
      (event) =>
        event.type === 'CHAMPION_KILL' &&
        event.timestamp < 75000 &&
        (event.killerId === participant.participantId ||
          event.assistingParticipantIds?.includes(participant.participantId))
    );

    return Number(hasInvadeKillParticipation);
  },
};

export default invade;
