import { TrophyServer } from '../../types';
import { getParticipantKills } from '../../../../lib/riot/helpers';
import base from './base';

const bloodThirst: TrophyServer = {
  ...base,
  checkProgress: ({ match, events, participant }) => {
    const kills = getParticipantKills(events, participant.participantId);

    const gameLongEnough = match.info.gameDuration > 20 * 60;
    const atLeastOneKill = participant.kills > 0;
    const killTimingsOK = kills.every((kill, index) => {
      let killInTiming = true;
      if (index === 0) {
        // 5 min after minions spawn
        killInTiming = kill.timestamp < 375000;
      } else {
        // less than 5 min between consecutive kills
        killInTiming = kill.timestamp < kills[index - 1].timestamp + 300000;
      }
      if (index === kills.length - 1) {
        // In 5 min before end
        killInTiming =
          killInTiming &&
          kill.timestamp >= match.info.gameDuration * 1000 - 300000;
      }
      return killInTiming;
    });
    const progress =
      Number(gameLongEnough) + Number(atLeastOneKill) + Number(killTimingsOK);
    return progress / 3;
  },
};

export default bloodThirst;
