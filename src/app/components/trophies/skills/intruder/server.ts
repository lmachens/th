import { getLaneOpponent, getMinionsAtMin } from '../../../../lib/riot/helpers';
import { TrophyServer } from '../../types';
import base from './base';

const intruder: TrophyServer = {
  ...base,
  checkProgress: ({ match, account, participant, timeline }) => {
    if (participant.teamPosition !== 'JUNGLE') {
      return 0;
    }
    const opponent = getLaneOpponent(match.info.participants, participant);
    if (!opponent) {
      console.warn(
        `Can not find lane opponent for ${account.summoner.name} as ${participant.role} ${participant.lane}`
      );
      return 0;
    }

    const participantMinions = getMinionsAtMin(
      timeline,
      10,
      participant.participantId
    );
    const opponentMinions = getMinionsAtMin(
      timeline,
      10,
      opponent.participantId
    );

    const creepsDiffAt10 = participantMinions - opponentMinions;
    return creepsDiffAt10 / 15;
  },
};

export default intruder;
