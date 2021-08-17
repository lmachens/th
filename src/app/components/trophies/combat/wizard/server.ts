import { TrophyServer } from '../../types';
import base from './base';

const wizard: TrophyServer = {
  ...base,
  checkProgress: ({ match, participant }) => {
    const others = match.info.participants.filter(
      (other) => other.participantId !== participant.participantId
    );
    const maxTotalDamageDealtToChampions = Math.max(
      ...others.map((other) => other.totalDamageDealtToChampions)
    );

    return Number(
      participant.magicDamageDealtToChampions >= maxTotalDamageDealtToChampions
    );
  },
};

export default wizard;
