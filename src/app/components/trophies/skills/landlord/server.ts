import { TrophyServer } from '../../types';
import base from './base';

const landlord: TrophyServer = {
  ...base,
  checkProgress: ({ participant }) => {
    return (
      (participant.totalMinionsKilled + participant.neutralMinionsKilled) / 300
    );
  },
};

export default landlord;
