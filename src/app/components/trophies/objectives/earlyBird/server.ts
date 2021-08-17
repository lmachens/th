import { TrophyServer } from '../../types';
import base from './base';

const earlyBird: TrophyServer = {
  ...base,
  checkProgress: ({ participant }) => {
    if (
      !participant.firstBloodKill ||
      (!participant.firstTowerAssist && !participant.firstTowerKill)
    ) {
      return 0;
    }
    return 1;
  },
};

export default earlyBird;
