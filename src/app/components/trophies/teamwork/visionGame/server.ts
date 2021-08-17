import { TrophyServer } from '../../types';
import base from './base';

const visionGame: TrophyServer = {
  ...base,
  checkProgress: ({ participant }) => {
    return Number(
      participant.visionWardsBoughtInGame >= 4 &&
        participant.wardsPlaced >= 20 &&
        participant.wardsKilled >= 4
    );
  },
};

export default visionGame;
