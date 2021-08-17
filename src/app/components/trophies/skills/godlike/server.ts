import { TrophyServer } from '../../types';
import base from './base';

const godlike: TrophyServer = {
  ...base,
  checkProgress: ({ participant }) => {
    return participant.largestKillingSpree / 7;
  },
};

export default godlike;
