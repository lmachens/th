import { TrophyServer } from '../../types';
import base from './base';

const darkinBlade: TrophyServer = {
  ...base,
  checkProgress: ({ events, participant }) => {
    const darkinBladeBuy = events.find(
      (event) =>
        event.type === 'ITEM_PURCHASED' &&
        event.participantId === participant.participantId &&
        event.itemId === 3124
    );
    if (!darkinBladeBuy) {
      return 0;
    }

    const darkinBladeKills = events.filter(
      (event) =>
        event.type === 'CHAMPION_KILL' &&
        event.killerId === participant.participantId &&
        event.timestamp > darkinBladeBuy.timestamp &&
        darkinBladeBuy.timestamp <= event.timestamp + 90
    ).length;

    return darkinBladeKills;
  },
};

export default darkinBlade;
