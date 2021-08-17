import { TrophyServer } from '../../types';
import base from './base';
import { ARAM_HOWLING_ABYSS } from '../../../../lib/riot/queues';
import { getAllKills, getTeam } from '../../../../lib/riot/helpers';

const locusts: TrophyServer = {
  ...base,
  checkProgress: ({ participant, events, match }) => {
    const teamIds = getTeam(match, participant.teamId).map(
      (teammate) => teammate.participantId
    );

    const locustsKillEvents = getAllKills(events).filter(
      (event) =>
        event.assistingParticipantIds?.length >= 4 &&
        teamIds.includes(event.killerId)
    );
    const requiredKills = match.info.queueId === ARAM_HOWLING_ABYSS ? 12 : 10;
    return locustsKillEvents.length / requiredKills;
  },
};

export default locusts;
