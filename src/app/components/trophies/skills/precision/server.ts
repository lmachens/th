import { TrophyServer } from '../../types';
import base from './base';
import { getLaneOpponent, getMinionsAtMin } from '../../../../lib/riot/helpers';

const precision: TrophyServer = {
  ...base,
  checkProgress: ({ match, account, participant, timeline }) => {
    if (!['BOTTOM', 'MIDDLE', 'TOP'].includes(participant.teamPosition)) {
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

export default precision;
