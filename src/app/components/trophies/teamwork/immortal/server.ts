import { TrophyServer } from '../../types';
import base from './base';

const immortal: TrophyServer = {
  ...base,
  checkProgress: ({ match, participant }) => {
    return Number(
      participant.deaths < 1 &&
        match.info.gameDuration >= 1500 &&
        participant.win
    );
  },
};

export default immortal;
