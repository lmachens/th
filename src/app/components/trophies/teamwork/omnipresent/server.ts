import { TrophyServer } from '../../types';
import base from './base';
import { getParticipantKillsAndAssists } from '../../../../lib/riot/helpers';
import { ARAM_HOWLING_ABYSS } from '../../../../lib/riot/queues';

const omnipresent: TrophyServer = {
  ...base,
  checkProgress: ({ match, events, participant }) => {
    const teamParticipantIds = match.info.participants
      .filter((other) => other.teamId === participant.teamId)
      .map((teammate) => teammate.participantId);

    const killsAndAssists = getParticipantKillsAndAssists(
      events,
      participant.participantId
    ).length;

    const teamkills = events.filter(
      (event) =>
        event.type === 'CHAMPION_KILL' &&
        teamParticipantIds.includes(event.killerId)
    ).length;

    const killRatio = match.info.queueId === ARAM_HOWLING_ABYSS ? 0.9 : 0.8;
    return Number(killsAndAssists / teamkills >= killRatio);
  },
};

export default omnipresent;
