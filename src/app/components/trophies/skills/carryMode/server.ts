import { TrophyServer } from '../../types';
import base from './base';

const carryMode: TrophyServer = {
  ...base,
  checkProgress: ({ match, participant }) => {
    const team = match.info.teams.find(
      (team) => team.teamId === participant.teamId
    );
    const teammates = match.info.participants.filter(
      (other) =>
        other.teamId === participant.teamId &&
        other.participantId !== participant.participantId
    );

    const teamKills = teammates
      .map((participant) => participant.kills)
      .reduce((current, kills) => current + kills);
    return Number(participant.kills > teamKills / 2 && team.win);
  },
};

export default carryMode;
