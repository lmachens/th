import { TrophyServer } from '../../types';
import base from './base';
import { getParticipantAssists } from '../../../../lib/riot/helpers';
import { ARAM_HOWLING_ABYSS } from '../../../../lib/riot/queues';

const theHound: TrophyServer = {
  ...base,
  checkProgress: ({ participant, events, match }) => {
    const participantAssists = getParticipantAssists(
      events,
      participant.participantId
    );
    if (match.info.queueId === ARAM_HOWLING_ABYSS) {
      const assists = participantAssists.filter(
        (assist) => assist.timestamp < 300000
      );
      return assists.length / 8;
    }

    const assists = participantAssists.filter(
      (assist) => assist.timestamp < 600000
    );
    return assists.length / 5;
  },
};

export default theHound;
