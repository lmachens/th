import { TrophyServer } from '../../types';
import base from './base';

const controller: TrophyServer = {
  ...base,
  checkProgress: ({ participant }) => {
    return participant.visionWardsBoughtInGame / 6;
  },
};

export default controller;
