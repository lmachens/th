import { TrophyServer } from '../../types';
import base from './base';
import { getTeammates } from '../../../../lib/riot/helpers';

const noxianShield: TrophyServer = {
  ...base,
  checkProgress: ({ match, participant }) => {
    const teammates = getTeammates(match, participant);
    const minTeamDeaths = Math.min(
      ...teammates.map((participant) => participant.deaths)
    );

    const maxTeamDamageTanked = Math.max(
      ...teammates.map(
        (participant) =>
          participant.totalDamageTaken + participant.damageSelfMitigated
      )
    );

    const hasLeastDeaths = participant.deaths <= minTeamDeaths;
    const hasMostTankedDamage =
      participant.totalDamageTaken + participant.damageSelfMitigated >=
      maxTeamDamageTanked;
    return Number(hasLeastDeaths && hasMostTankedDamage);
  },
};

export default noxianShield;
