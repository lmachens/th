import { TrophyServer } from '../../types';
import base from './base';
import { getParticipantKillsAndAssists } from '../../../../lib/riot/helpers';
import { zip } from '../../../../lib/utils/arrays';
import { ARAM_HOWLING_ABYSS } from '../../../../lib/riot/queues';

const annihilation: TrophyServer = {
  ...base,
  checkProgress: ({ events, participant, match }) => {
    const killsAndAssists = getParticipantKillsAndAssists(
      events,
      participant.participantId
    );

    const annihilations = zip(killsAndAssists, killsAndAssists.slice(4)).filter(
      (event) => event[1] && event[0].timestamp + 25000 >= event[1].timestamp
    ).length;

    if (match.info.queueId === ARAM_HOWLING_ABYSS) {
      return annihilations / 2;
    }
    return annihilations;
  },
};

export default annihilation;
