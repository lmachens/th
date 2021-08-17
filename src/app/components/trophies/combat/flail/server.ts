import { TrophyServer } from '../../types';
import base from './base';
import { Participant } from '../../../../lib/riot/types';

const calculateDamagePerGold = (participant: Participant) => {
  return participant.totalDamageDealtToChampions / participant.goldEarned;
};

const flail: TrophyServer = {
  ...base,
  checkProgress: ({ match, participant }) => {
    const sortedParticipants = match.info.participants.sort(
      (participantA, participantB) => {
        return (
          calculateDamagePerGold(participantB) -
          calculateDamagePerGold(participantA)
        );
      }
    );
    const mostDamagePerGoldParticipant = sortedParticipants[0];

    return (
      calculateDamagePerGold(participant) /
      calculateDamagePerGold(mostDamagePerGoldParticipant)
    );
  },
};

export default flail;
