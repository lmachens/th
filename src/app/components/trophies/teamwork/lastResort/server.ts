import { TrophyServer } from '../../types';
import base from './base';

const lastResort: TrophyServer = {
  ...base,
  checkProgress: ({ match, participant }) => {
    const team = match.info.teams.find(
      (team) => team.teamId === participant.teamId
    );
    const teammates = match.info.participants.filter(
      (other) =>
        other.participantId !== participant.participantId &&
        other.teamId === team.teamId
    );

    const minTeamDeaths = Math.min(
      ...teammates.map((participant) => participant.deaths)
    );

    const maxKillParticipation = Math.max(
      ...teammates.map((participant) => participant.kills + participant.assists)
    );

    const hasMinDeaths = participant.deaths <= minTeamDeaths;
    const hasHighesKillParticipation =
      participant.kills + participant.assists >= maxKillParticipation;
    const isLoser = !team.win;
    return Number(hasMinDeaths && hasHighesKillParticipation && isLoser);
  },
};

export default lastResort;
