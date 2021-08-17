import { TrophyServer } from '../../types';
import base from './base';

const superiorEquipment: TrophyServer = {
  ...base,
  checkProgress: ({ participant }) => {
    const damageDealtToTakenRatio =
      participant.totalDamageDealtToChampions /
      Math.max(1, participant.totalDamageTaken);

    return damageDealtToTakenRatio / 1.67;
  },
};

export default superiorEquipment;
