import { TrophyServer } from '../../types';
import base from './base';

const silverBullets: TrophyServer = {
  ...base,
  checkProgress: ({ match, participant }) => {
    const others = match.info.participants.filter(
      (other) => other.participantId !== participant.participantId
    );
    const maxTotalDamageDealtToChampions = Math.max(
      ...others.map((other) => other.totalDamageDealtToChampions)
    );

    return Number(
      participant.physicalDamageDealtToChampions >=
        maxTotalDamageDealtToChampions
    );
  },
};

export default silverBullets;
