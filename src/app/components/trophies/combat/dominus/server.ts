import { TrophyServer } from '../../types';
import base from './base';
import { getLaneOpponent, getMinionsAtMin } from '../../../../lib/riot/helpers';

const dominus: TrophyServer = {
  ...base,
  checkProgress: ({ match, events, participant, timeline }) => {
    const laneOpponent = getLaneOpponent(match.info.participants, participant);
    if (!laneOpponent) {
      return 0;
    }

    const participantMinions = getMinionsAtMin(
      timeline,
      10,
      participant.participantId
    );
    const laneOpponentMinions = getMinionsAtMin(
      timeline,
      10,
      laneOpponent.participantId
    );

    const csLaneDiffAt10 = participantMinions - laneOpponentMinions;

    const soloKillsPre10 = events.filter(
      (event) =>
        event.type === 'CHAMPION_KILL' &&
        event.killerId === participant.participantId &&
        event.assistingParticipantIds?.length === 0 &&
        event.timestamp <= 600000
    ).length;

    const killsPre10 = events.filter(
      (event) =>
        event.type === 'CHAMPION_KILL' &&
        event.killerId === participant.participantId &&
        event.timestamp <= 600000
    ).length;

    return (
      (Number(csLaneDiffAt10 > 10) +
        Number(soloKillsPre10 > 1) +
        Number(killsPre10 > 3)) /
      3
    );
  },
};

export default dominus;
