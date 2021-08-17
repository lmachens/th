import { TrophyServer } from '../../types';
import base from './base';
import { calcTotalGoldFrames } from '../../../../lib/riot/helpers';
import { zip } from '../../../../lib/utils/arrays';

const thorsHammer: TrophyServer = {
  ...base,
  checkProgress: ({ match, participant, timeline }) => {
    const team = match.info.teams.find(
      (team) => team.teamId === participant.teamId
    );
    const opponent = match.info.teams.find(
      (team) => team.teamId !== participant.teamId
    );

    const teamGoldFrames = calcTotalGoldFrames(timeline, team.teamId);
    const opponentGoldFrames = calcTotalGoldFrames(timeline, opponent.teamId);
    const teamGoldDiffFrames = zip(teamGoldFrames, opponentGoldFrames).map(
      (frame) => frame[0] - frame[1]
    );
    const teamGoldChangeFrames = zip(
      teamGoldDiffFrames.slice(0, teamGoldDiffFrames.length - 1),
      teamGoldDiffFrames.slice(1)
    ).map((frame) => frame[1] - frame[0]);
    const maxGoldSwing = Math.max(...teamGoldChangeFrames);

    return maxGoldSwing / 5000;
  },
};

export default thorsHammer;
