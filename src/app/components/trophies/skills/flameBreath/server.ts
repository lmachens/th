import { TrophyServer } from '../../types';
import base from './base';

const flameBreath: TrophyServer = {
  ...base,
  checkProgress: ({ match, participant }) => {
    if (participant.teamPosition !== 'JUNGLE') {
      return 0;
    }

    const others = match.info.participants.filter(
      (other) => other.participantId !== participant.participantId
    );

    const ownCS =
      participant.totalMinionsKilled + participant.neutralMinionsKilled;

    const otherCSMax = Math.max(
      ...others.map(
        (other) => other.totalMinionsKilled + other.neutralMinionsKilled
      )
    );

    return Number(ownCS > otherCSMax);
  },
};

export default flameBreath;
