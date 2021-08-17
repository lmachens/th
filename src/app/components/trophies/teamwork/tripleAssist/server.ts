import { TrophyServer } from '../../types';
import base from './base';
import { getParticipantAssists } from '../../../../lib/riot/helpers';
import { zip } from '../../../../lib/utils/arrays';
import { ARAM_HOWLING_ABYSS } from '../../../../lib/riot/queues';

const tripleAssist: TrophyServer = {
  ...base,
  checkProgress: ({ events, participant, match }) => {
    const requiredTripleAssists =
      match.info.queueId === ARAM_HOWLING_ABYSS ? 2 : 1;

    const assists = getParticipantAssists(events, participant.participantId);

    const participantMultiAssistEvents = zip(
      assists,
      assists.slice(1),
      assists.slice(2)
    );

    const tripleAssists = participantMultiAssistEvents.filter((multiAssist) => {
      const firstTwoKillsSpree =
        multiAssist[1] &&
        multiAssist[0].timestamp + 10000 > multiAssist[1].timestamp;
      const secondTwoKillsSpree =
        multiAssist[2] &&
        multiAssist[1].timestamp + 10000 > multiAssist[2].timestamp;

      return firstTwoKillsSpree && secondTwoKillsSpree;
    }).length;

    return tripleAssists / requiredTripleAssists;
  },
};

export default tripleAssist;
