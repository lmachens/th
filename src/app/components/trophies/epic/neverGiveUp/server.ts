import { TrophyServer } from '../../types';
import base from './base';

const neverGiveUp: TrophyServer = {
  ...base,
  checkProgress: ({ match, participant }) => {
    const opponentTeam = match.info.teams.find(
      (team) => team.teamId !== participant.teamId
    );

    return Number(
      participant.win && opponentTeam.objectives.inhibitor.kills >= 1
    );
  },
};

export default neverGiveUp;
