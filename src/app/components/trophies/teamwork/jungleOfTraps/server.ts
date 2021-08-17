import { TrophyServer } from '../../types';
import base from './base';

const jungleOfTraps: TrophyServer = {
  ...base,
  checkProgress: ({ match, participant }) => {
    const team = match.info.teams.find(
      (team) => team.teamId === participant.teamId
    );

    return Number(
      participant.visionWardsBoughtInGame >= 4 &&
        participant.wardsKilled >= 4 &&
        participant.killingSprees >= 1 &&
        team.objectives.dragon.kills >= 2
    );
  },
};

export default jungleOfTraps;
