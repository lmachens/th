import { TrophyServer } from '../../types';
import base from './base';

const sigurd: TrophyServer = {
  ...base,
  checkProgress: ({ match, participant }) => {
    const team = match.info.teams.find(
      (team) => team.teamId === participant.teamId
    );

    return Number(
      team.objectives.dragon.first &&
        team.objectives.baron.kills >= 1 &&
        team.objectives.dragon.kills >= 5
    );
  },
};

export default sigurd;
