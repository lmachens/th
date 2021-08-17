import { TrophyServer } from '../../types';
import base from './base';

const clothArmor: TrophyServer = {
  ...base,
  checkProgress: ({ participant }) => {
    const damageTankedPerDeath =
      (participant.totalDamageTaken + participant.damageSelfMitigated) /
      Math.max(participant.deaths, 1);

    return damageTankedPerDeath / 10000;
  },
};

export default clothArmor;
