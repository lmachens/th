import { TrophyServer } from '../../types';
import base from './base';

const uncounterable: TrophyServer = {
  ...base,
  checkProgress: ({ participant }) => {
    return participant.trueDamageDealtToChampions / 5000;
  },
};

export default uncounterable;
