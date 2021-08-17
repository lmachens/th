import { TrophyServer } from '../../types';
import base from './base';
import { getParticipantKillsAndAssists } from '../../../../lib/riot/helpers';
import { ARAM_HOWLING_ABYSS } from '../../../../lib/riot/queues';

const noxianKnight: TrophyServer = {
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

    const requiredRatio =
      match.info.queueId === ARAM_HOWLING_ABYSS ? 0.85 : 0.6;
    return Number(
      killsAndAssists / teamkills >= requiredRatio &&
        participant.champLevel >= 18
    );
  },
};

export default noxianKnight;
