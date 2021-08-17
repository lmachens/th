import { TrophyServer } from '../../types';
import base from './base';

const siegeRam: TrophyServer = {
  ...base,
  checkProgress: ({ match, participant }) => {
    const otherTeamParticipants = match.info.participants.filter(
      (otherParticipant) =>
        otherParticipant.participantId !== participant.participantId &&
        otherParticipant.teamId === participant.teamId
    );
    const maxDamageDealtToTurrets = Math.max(
      ...otherTeamParticipants.map(
        (teamParticipant) => teamParticipant.damageDealtToTurrets
      )
    );

    return participant.damageDealtToTurrets > 0
      ? participant.damageDealtToTurrets / maxDamageDealtToTurrets
      : 0;
  },
};

export default siegeRam;
