import { TrophyServer } from '../../types';
import base from './base';
import { calcTotalGoldFrames } from '../../../../lib/riot/helpers';
import { zip } from '../../../../lib/utils/arrays';

const rivalry: TrophyServer = {
  ...base,
  checkProgress: ({ match, timeline, participant }) => {
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

    const isRivalry = teamGoldDiffFrames
      .slice(0, 15)
      .every((diff) => Math.abs(diff) < 2000);

    return Number(isRivalry && participant.win);
  },
};

export default rivalry;
