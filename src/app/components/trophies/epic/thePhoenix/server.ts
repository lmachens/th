import { TrophyServer } from '../../types';
import base from './base';

const thePhoenix: TrophyServer = {
  ...base,
  checkProgress: ({ match, participant }) => {
    const opponentTeam = match.info.teams.find(
      (team) => team.teamId !== participant.teamId
    );

    return Number(
      participant.win && opponentTeam.objectives.inhibitor.kills >= 3
    );
  },
};

export default thePhoenix;
