import { TrophyServer } from '../../types';
import base from './base';
import { getParticipantKillsAndAssists } from '../../../../lib/riot/helpers';

const rockSurfing: TrophyServer = {
  ...base,
  checkProgress: ({ events, participant }) => {
    if (participant.teamPosition !== 'MIDDLE') {
      return 0;
    }

    const killsAndAssists = getParticipantKillsAndAssists(
      events,
      participant.participantId
    );

    const rockSurfingKills = killsAndAssists.filter((kill) => {
      const isOnBotlane =
        kill.position.x - kill.position.y >= 8000 ||
        kill.position.x >= 13000 ||
        kill.position.y <= 2000;
      const isEarlyEnough = kill.timestamp <= 10 * 60 * 1000;
      return isOnBotlane && isEarlyEnough;
    }).length;

    return Number(rockSurfingKills >= 2);
  },
};

export default rockSurfing;
