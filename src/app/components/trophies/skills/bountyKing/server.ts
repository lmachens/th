import { TrophyServer } from '../../types';
import base from './base';

const bountyKing: TrophyServer = {
  ...base,
  checkProgress: ({ participant }) => {
    return participant.bountyLevel / 10;
  },
};

export default bountyKing;
