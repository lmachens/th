import { TrophyServer } from '../../types';
import base from './base';

const skullMedal: TrophyServer = {
  ...base,
  checkProgress: ({ participant }) => {
    return Number(
      participant.killingSprees >= 2 && participant.inhibitorKills >= 2
    );
  },
};

export default skullMedal;
