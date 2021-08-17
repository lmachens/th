import { TrophyServer } from '../../types';
import base from './base';

const guardianAngel: TrophyServer = {
  ...base,
  checkProgress: ({ participant }) => {
    return Number(
      participant.totalHeal >= 15000 &&
        participant.totalUnitsHealed >= 5 &&
        participant.wardsPlaced >= 18 &&
        participant.assists >= 12
    );
  },
};

export default guardianAngel;
