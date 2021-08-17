import { TrophyServer } from '../../types';
import base from './base';

const deadlyVenom: TrophyServer = {
  ...base,
  checkProgress: ({ match, participant }) => {
    const sortedParticipants = match.info.participants.sort(
      (a, b) => b.totalDamageDealtToChampions - a.totalDamageDealtToChampions
    );
    const otherParticipants = sortedParticipants.filter(
      (otherParticipant) =>
        otherParticipant.participantId !== participant.participantId
    );
    const highestDamageParticipant = otherParticipants[0];

    const progress =
      participant.totalDamageDealtToChampions /
      highestDamageParticipant.totalDamageDealtToChampions /
      1.25;

    return progress;
  },
};

export default deadlyVenom;
