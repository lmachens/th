import { TrophyServer } from '../../types';
import base from './base';
import { getParticipantKillsAndAssists } from '../../../../lib/riot/helpers';

const theWanderer: TrophyServer = {
  ...base,
  checkProgress: ({ events, participant }) => {
    if (!['BOTTOM', 'UTILITY'].includes(participant.teamPosition)) {
      return 0;
    }
    const killsAndAssists = getParticipantKillsAndAssists(
      events,
      participant.participantId
    ).filter((event) => event.timestamp < 15 * 60 * 1000);
    const victimIds = killsAndAssists.map((event) => event.victimId);

    const uniqueVictims = victimIds.filter(
      (victimId, index, current) => current.indexOf(victimId) === index
    ).length;

    return uniqueVictims / 5;
  },
};

export default theWanderer;
