import { TrophyServer } from '../../types';
import base from './base';
import { getTrophyProgress } from '../../../../lib/accounts/helpers';

const bigBrother: TrophyServer = {
  ...base,
  checkProgress: ({ match, account, participant }) => {
    const maxVisionScore = Math.max(
      ...match.info.participants.map((other) => other.visionScore)
    );
    const hasHighestVisionScore = participant.visionScore >= maxVisionScore;

    const trophyProgress = getTrophyProgress(account, 'bigBrother');
    return Number(hasHighestVisionScore) / 3 + trophyProgress;
  },
};

export default bigBrother;
