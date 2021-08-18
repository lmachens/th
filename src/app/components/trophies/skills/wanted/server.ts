import { TrophyServer } from '../../types';
import base from './base';

const wanted: TrophyServer = {
  ...base,
  checkProgress: ({ participant }) => {
    return participant.bountyLevel / 1;
  },
};

export default wanted;
