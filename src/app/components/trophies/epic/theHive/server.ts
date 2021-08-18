import { TrophyServer } from '../../types';
import base from './base';
import { ARAM_HOWLING_ABYSS } from '../../../../lib/riot/queues';
import { ChampionKillEvent } from '../../../../lib/riot/types';

const theHive: TrophyServer = {
  ...base,
  checkProgress: ({ events, participant, match }) => {
    const hiveKills = events.filter(
      (event) =>
        event.type === 'CHAMPION_KILL' &&
        event.assistingParticipantIds &&
        event.assistingParticipantIds.some(
          (assister) => assister === participant.participantId
        ) &&
        event.assistingParticipantIds.length >= 4
    ) as ChampionKillEvent[];
    if (match.info.queueId === ARAM_HOWLING_ABYSS) {
      return hiveKills.length / 12;
    }

    const victimIds = hiveKills.map((event) => event.victimId);
    const uniqueVictims = victimIds.filter(
      (victimId, index, current) => current.indexOf(victimId) === index
    ).length;
    return uniqueVictims / 5;
  },
};

export default theHive;
