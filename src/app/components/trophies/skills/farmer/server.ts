import { TrophyServer } from '../../types';
import base from './base';

const farmer: TrophyServer = {
  ...base,
  checkProgress: ({ participant }) => {
    return (
      (participant.totalMinionsKilled + participant.neutralMinionsKilled) / 200
    );
  },
};

export default farmer;
