import { TrophyServer } from '../../types';
import base from './base';

const trinityForce: TrophyServer = {
  ...base,
  checkProgress: ({ events, participant }) => {
    const trinityForceBuy = events.find(
      (event) =>
        event.type === 'ITEM_PURCHASED' &&
        event.participantId === participant.participantId &&
        event.itemId === 3078
    );
    if (!trinityForceBuy) {
      return 0;
    }

    const trinityForceKills = events.filter(
      (event) =>
        event.type === 'CHAMPION_KILL' &&
        event.killerId === participant.participantId &&
        event.timestamp > trinityForceBuy.timestamp &&
        trinityForceBuy.timestamp <= event.timestamp + 180000
    ).length;

    return trinityForceKills;
  },
};

export default trinityForce;
