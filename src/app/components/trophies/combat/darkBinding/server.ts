import { TrophyServer } from '../../types';
import base from './base';

const darkBinding: TrophyServer = {
  ...base,
  checkProgress: ({ participant }) => {
    return participant.timeCCingOthers / 100;
  },
};

export default darkBinding;
