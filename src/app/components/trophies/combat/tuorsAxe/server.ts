import { TrophyServer } from '../../types';
import base from './base';

const tuorsAxe: TrophyServer = {
  ...base,
  checkProgress: ({ match, participant }) => {
    const sortedParticipants = match.info.participants.sort(
      (participantA, participantB) => {
        return (
          participantB.totalDamageDealtToChampions -
          participantA.totalDamageDealtToChampions
        );
      }
    );
    const mostDamageParticipant = sortedParticipants[0];
    if (participant.participantId !== mostDamageParticipant.participantId) {
      return 0;
    }
    const secondMostDamageParticipant = sortedParticipants[1];

    return (
      (participant.totalDamageDealtToChampions / 1.5) *
      secondMostDamageParticipant.totalDamageDealtToChampions
    );
  },
};

export default tuorsAxe;
