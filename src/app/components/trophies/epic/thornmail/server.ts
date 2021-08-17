import { TrophyServer } from '../../types';
import base from './base';

const thornmail: TrophyServer = {
  ...base,
  checkProgress: ({ participant }) => {
    const damageTankedPerDeath =
      (participant.totalDamageTaken + participant.damageSelfMitigated) /
      Math.max(participant.deaths, 1);

    return damageTankedPerDeath / 40000;
  },
};

export default thornmail;
