import { TrophyServer } from '../../types';
import base, { REQUIRED_MINUTES } from './base';
import { minutesToMilliseconds } from '../../../../lib/utils/dates';

const theViking: TrophyServer = {
  ...base,
  checkProgress: ({ events, participant }) => {
    const hasSoloKillBefore10 = events.some(
      (event) =>
        event.type === 'CHAMPION_KILL' &&
        event.killerId === participant.participantId &&
        (!event.assistingParticipantIds ||
          event.assistingParticipantIds.length === 0) &&
        event.timestamp <= minutesToMilliseconds(REQUIRED_MINUTES)
    );

    if (
      !hasSoloKillBefore10 ||
      (!participant.firstTowerKill && !participant.firstTowerAssist)
    ) {
      return 0;
    }
    return 1;
  },
};

export default theViking;
