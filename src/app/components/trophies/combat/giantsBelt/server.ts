import { TrophyServer } from '../../types';
import base from './base';

const giantsBelt: TrophyServer = {
  ...base,
  checkProgress: ({ participant }) => {
    const damageTankedPerDeath =
      (participant.totalDamageTaken + participant.damageSelfMitigated) /
      Math.max(participant.deaths, 1);

    return Number(damageTankedPerDeath >= 20000);
  },
};

export default giantsBelt;
