import { TrophyServer } from '../../types';
import base from './base';
import { getLevelUps, getParticipantKills } from '../../../../lib/riot/helpers';
import { ARAM_HOWLING_ABYSS } from '../../../../lib/riot/queues';

const unleashThePower: TrophyServer = {
  ...base,
  checkProgress: ({ events, participant, match }) => {
    const requiredTimelimt =
      match.info.queueId === ARAM_HOWLING_ABYSS ? 20000 : 30000;

    const levelUps = getLevelUps(events, participant.participantId);
    const levelSix = levelUps[5];
    if (!levelSix) {
      return 0;
    }
    const kills = getParticipantKills(events, participant.participantId);

    const hasKillInTimeframe = kills.some(
      (kill) =>
        kill.timestamp > levelSix.timestamp &&
        kill.timestamp - requiredTimelimt < levelSix.timestamp
    );

    return Number(hasKillInTimeframe);
  },
};

export default unleashThePower;
