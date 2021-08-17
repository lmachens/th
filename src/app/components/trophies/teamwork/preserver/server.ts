import { TrophyServer } from '../../types';
import base from './base';

const preserver: TrophyServer = {
  ...base,
  checkProgress: ({ match, participant }) => {
    const opponentTeam = match.info.participants.filter(
      (other) => other.teamId !== participant.teamId
    );

    const maxTotalDamageDealtToChampions = Math.max(
      ...opponentTeam.map((participant) => participant.totalHeal)
    );

    return Number(participant.totalHeal >= maxTotalDamageDealtToChampions);
  },
};

export default preserver;
