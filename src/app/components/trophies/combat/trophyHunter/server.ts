import { ChampionKillEvent } from '../../../../lib/riot/types';
import { TrophyServer } from '../../types';
import base from './base';

const trophyHunter: TrophyServer = {
  ...base,
  checkProgress: ({ events, participant }) => {
    const victimIds = events
      .filter(
        (event) =>
          event.type === 'CHAMPION_KILL' &&
          event.killerId === participant.participantId
      )
      .map((event: ChampionKillEvent) => event.victimId);
    const uniqueVictimIds = victimIds.filter(
      (victimId, index, current) => current.indexOf(victimId) === index
    );
    return uniqueVictimIds.length / 5;
  },
};

export default trophyHunter;
