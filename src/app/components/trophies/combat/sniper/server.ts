import { TrophyServer } from '../../types';
import base from './base';

const sniper: TrophyServer = {
  ...base,
  checkProgress: ({ match, participant }) => {
    const maxTotalDamageDealtToChampions = Math.max(
      ...match.info.participants.map(
        (participant) => participant.totalDamageDealtToChampions
      )
    );
    const minTotalDamageTaken = Math.min(
      ...match.info.participants.map(
        (participant) => participant.totalDamageTaken
      )
    );

    return Number(
      participant.totalDamageDealtToChampions >=
        maxTotalDamageDealtToChampions &&
        participant.totalDamageTaken === minTotalDamageTaken
    );
  },
};

export default sniper;
