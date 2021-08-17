import { TrophyServer } from '../../types';
import base from './base';
import { getParticipantKillsAndAssists } from '../../../../lib/riot/helpers';
import { ARAM_HOWLING_ABYSS } from '../../../../lib/riot/queues';

const teamEffort: TrophyServer = {
  ...base,
  checkProgress: ({ events, participant, match }) => {
    const requiredTeamKills = match.info.queueId === ARAM_HOWLING_ABYSS ? 9 : 3;

    const killsAndAssists = getParticipantKillsAndAssists(
      events,
      participant.participantId
    );

    const teamEffortKills = killsAndAssists.filter(
      (event) => event.assistingParticipantIds?.length >= 4
    ).length;

    return teamEffortKills / requiredTeamKills;
  },
};

export default teamEffort;
