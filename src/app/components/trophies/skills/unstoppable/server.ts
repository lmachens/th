import { TrophyServer } from '../../types';
import base from './base';

const unstoppable: TrophyServer = {
  ...base,
  checkProgress: ({ participant }) => {
    return participant.largestKillingSpree / 5;
  },
};

export default unstoppable;
