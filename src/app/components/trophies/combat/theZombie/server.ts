import { TrophyServer } from '../../types';
import base from './base';
import {
  getParticipantKills,
  getParticipantDeaths,
} from '../../../../lib/riot/helpers';
import { ARAM_HOWLING_ABYSS } from '../../../../lib/riot/queues';

const theZombie: TrophyServer = {
  ...base,
  checkProgress: ({ events, participant, match }) => {
    const requiredKills = match.info.queueId === ARAM_HOWLING_ABYSS ? 3 : 2;

    const deaths = getParticipantDeaths(events, participant.participantId);
    const kills = getParticipantKills(events, participant.participantId);
    const zombieKills = kills.filter((kill) =>
      deaths.some(
        (death) =>
          kill.timestamp > death.timestamp &&
          kill.timestamp < 10000 + death.timestamp
      )
    ).length;

    return zombieKills / requiredKills;
  },
};

export default theZombie;
