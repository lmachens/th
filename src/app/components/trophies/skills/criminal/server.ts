import { TrophyServer } from '../../types';
import base from './base';

const criminal: TrophyServer = {
  ...base,
  checkProgress: ({ participant }) => {
    return participant.bountyLevel / 3;
  },
};

export default criminal;
