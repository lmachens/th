import { TrophyServer } from '../../types';
import base from './base';
import { getParticipantDeaths } from '../../../../lib/riot/helpers';

const gloriousEvolution: TrophyServer = {
  ...base,
  checkProgress: ({ match, events, participant }) => {
    const maxDamage = Math.max(
      ...match.info.participants.map(
        (participant) => participant.totalDamageDealtToChampions
      )
    );

    const deaths = getParticipantDeaths(events, participant.participantId);
    const gameLongEnough = match.info.gameDuration > 30 * 60 * 1000;
    const mostDamage = participant.totalDamageDealtToChampions === maxDamage;
    const notDieAfter30Minutes = deaths.every(
      (death) => death.timestamp < match.info.gameDuration - 300000
    );
    return Number(gameLongEnough && mostDamage && notDieAfter30Minutes);
  },
};

export default gloriousEvolution;
