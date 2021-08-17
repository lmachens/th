import { TrophyServer } from '../../types';
import base from './base';

const careful: TrophyServer = {
  ...base,
  checkProgress: ({ match, participant }) => {
    const lessDeathsParticipants = match.info.participants.filter(
      (otherParticipant) =>
        otherParticipant.participantId !== participant.participantId &&
        otherParticipant.deaths < participant.deaths
    ).length;

    return (9 - lessDeathsParticipants) / 9;
  },
};

export default careful;
