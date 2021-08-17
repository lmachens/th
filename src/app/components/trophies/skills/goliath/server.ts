import { TrophyServer } from '../../types';
import base from './base';

const goliath: TrophyServer = {
  ...base,
  checkProgress: ({ match, participant }) => {
    const otherParticipants = match.info.participants.filter(
      (otherParticipant) =>
        otherParticipant.participantId !== participant.participantId
    );

    const otherMaxChampLevel = Math.max(
      ...otherParticipants.map((participant) => participant.kills)
    );

    return Number(participant.champLevel > otherMaxChampLevel);
  },
};

export default goliath;
