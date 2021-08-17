import { TrophyServer } from '../../types';
import base from './base';
import { calcTotalGoldFrames } from '../../../../lib/riot/helpers';
import { zip } from '../../../../lib/utils/arrays';

const chaliceOfRecovery: TrophyServer = {
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

    const teamMaxGoldDown = Math.min(...teamGoldDiffFrames);
    return Number(teamMaxGoldDown <= -4000 && team.win);
  },
};

export default chaliceOfRecovery;
