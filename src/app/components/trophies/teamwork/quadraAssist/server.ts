import { TrophyServer } from '../../types';
import base from './base';
import { getParticipantAssists } from '../../../../lib/riot/helpers';
import { zip } from '../../../../lib/utils/arrays';
import { ARAM_HOWLING_ABYSS } from '../../../../lib/riot/queues';

const quadraAssist: TrophyServer = {
  ...base,
  checkProgress: ({ events, participant, match }) => {
    const assists = getParticipantAssists(events, participant.participantId);

    const participantMultiAssistEvents = zip(
      assists,
      assists.slice(1),
      assists.slice(2),
      assists.slice(3)
    );

    const quadraAssists = participantMultiAssistEvents.filter((multiAssist) => {
      const firstTwoKillsSpree =
        multiAssist[1] &&
        multiAssist[0].timestamp + 10000 > multiAssist[1].timestamp;
      const secondTwoKillsSpree =
        multiAssist[2] &&
        multiAssist[1].timestamp + 10000 > multiAssist[2].timestamp;
      const thirdTwoKillsSpree =
        multiAssist[3] &&
        multiAssist[2].timestamp + 10000 > multiAssist[3].timestamp;

      return firstTwoKillsSpree && secondTwoKillsSpree && thirdTwoKillsSpree;
    }).length;

    const requiredQuadraKills =
      match.info.queueId === ARAM_HOWLING_ABYSS ? 2 : 1;
    return quadraAssists / requiredQuadraKills;
  },
};

export default quadraAssist;
