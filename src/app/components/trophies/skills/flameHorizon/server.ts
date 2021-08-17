import { TrophyServer } from '../../types';
import base from './base';
import { getLaneOpponent } from '../../../../lib/riot/helpers';

const flameHorizon: TrophyServer = {
  ...base,
  checkProgress: ({ match, participant }) => {
    const laneOpponent = getLaneOpponent(match.info.participants, participant);
    if (!laneOpponent) {
      return 0;
    }
    return (
      (participant.totalMinionsKilled + participant.neutralMinionsKilled) /
      (laneOpponent.totalMinionsKilled +
        laneOpponent.neutralMinionsKilled +
        100)
    );
  },
};

export default flameHorizon;
