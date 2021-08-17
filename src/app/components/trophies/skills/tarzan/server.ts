import { TrophyServer } from '../../types';
import base from './base';
import { getOtherParticipants } from '../../../../lib/riot/helpers';

const tarzan: TrophyServer = {
  ...base,
  checkProgress: ({ match, participant }) => {
    const maxNeutralMinionsKilled = Math.max(
      ...match.info.participants.map(
        (participant) => participant.neutralMinionsKilled
      )
    );

    const others = getOtherParticipants(match, participant);
    const otherMaxChampLevel = Math.max(
      ...others.map((other) => other.champLevel)
    );

    return Number(
      participant.neutralMinionsKilled >= maxNeutralMinionsKilled &&
        participant.champLevel > otherMaxChampLevel
    );
  },
};

export default tarzan;
