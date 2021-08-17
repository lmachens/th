import { TrophyServer } from '../../types';
import base from './base';
import { getTeammates } from '../../../../lib/riot/helpers';

const unbreakableWill: TrophyServer = {
  ...base,
  checkProgress: ({ match, participant }) => {
    if (participant.teamPosition !== 'UTILITY') {
      return 0;
    }

    const team = getTeammates(match, participant);
    const maxAssists = Math.max(
      ...team.map((participant) => participant.assists)
    );
    const maxDamageSelfMitigated = Math.max(
      ...team.map((participant) => participant.damageSelfMitigated)
    );

    return Number(
      participant.assists >= maxAssists &&
        participant.damageSelfMitigated >= maxDamageSelfMitigated
    );
  },
};

export default unbreakableWill;
