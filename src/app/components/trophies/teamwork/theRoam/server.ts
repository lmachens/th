import { TrophyServer } from '../../types';
import base from './base';
import {
  getParticipantDeaths,
  getParticipantKillsAndAssists,
} from '../../../../lib/riot/helpers';

const theRoam: TrophyServer = {
  ...base,
  checkProgress: ({ match, participant, events }) => {
    if (participant.teamPosition !== 'UTILITY') {
      return 0;
    }
    const middleX = 7435;
    const middleY = 7490;
    const adc = match.info.participants.find(
      (teammate) =>
        teammate.teamPosition === 'BOTTOM' &&
        teammate.teamId === participant.teamId
    );

    if (!adc) {
      return 0;
    }

    const adcDeaths = getParticipantDeaths(events, adc.participantId);
    const killParticipations = getParticipantKillsAndAssists(
      events,
      participant.participantId
    );

    const roamingKills = killParticipations.filter((kill) => {
      const before10Mins = kill.timestamp <= 60 * 10000;
      const midLane =
        Math.sqrt(
          (kill.position.x - middleX) * (kill.position.x - middleX) +
            (kill.position.y - middleY) * (kill.position.y - middleY)
        ) <= 2000;
      // adc didnt die +- 10 sec of that roaming kill
      const noADCDeath20Sec = !adcDeaths.some(
        (death) =>
          death.timestamp + 10000 < kill.timestamp &&
          death.timestamp - 10000 > kill.timestamp
      );
      return before10Mins && midLane && noADCDeath20Sec;
    }).length;

    return roamingKills;
  },
};

export default theRoam;
