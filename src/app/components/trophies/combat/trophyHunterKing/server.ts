import { TrophyServer } from '../../types';
import base from './base';
import { getTrophyProgress } from '../../../../lib/accounts/helpers';
import { ChampionKillEvent } from '../../../../lib/riot/types';

const trophyHunterKing: TrophyServer = {
  ...base,
  checkProgress: ({ events, participant, account }) => {
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
    const trophyHunt = uniqueVictimIds.length >= 5;
    if (!trophyHunt) {
      return 0;
    }
    const trophyProgress = getTrophyProgress(account, 'trophyHunterKing');
    return Number(trophyHunt) / 3 + trophyProgress;
  },
};

export default trophyHunterKing;
