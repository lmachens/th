import { TrophyServer } from '../../types';
import base from './base';
import { getParticipantAssists } from '../../../../lib/riot/helpers';
import { zip } from '../../../../lib/utils/arrays';
import { ARAM_HOWLING_ABYSS } from '../../../../lib/riot/queues';

const pentaAssist: TrophyServer = {
  ...base,
  checkProgress: ({ events, participant, match }) => {
    const assists = getParticipantAssists(events, participant.participantId);

    const participantMultiAssistEvents = zip(
      assists,
      assists.slice(1),
      assists.slice(2),
      assists.slice(3),
      assists.slice(4)
    );

    const pentaAssists = participantMultiAssistEvents.filter((multiAssist) => {
      const firstTwoKillsSpree =
        multiAssist[1] &&
        multiAssist[0].timestamp + 20000 > multiAssist[1].timestamp;
      const secondTwoKillsSpree =
        multiAssist[2] &&
        multiAssist[1].timestamp + 20000 > multiAssist[2].timestamp;
      const thirdTwoKillsSpree =
        multiAssist[3] &&
        multiAssist[2].timestamp + 20000 > multiAssist[3].timestamp;
      const fourthTwoKillsSpree =
        multiAssist[4] &&
        multiAssist[3].timestamp + 20000 > multiAssist[4].timestamp;

      return (
        firstTwoKillsSpree &&
        secondTwoKillsSpree &&
        thirdTwoKillsSpree &&
        fourthTwoKillsSpree
      );
    }).length;

    const requiredPentaAsissts =
      match.info.queueId === ARAM_HOWLING_ABYSS ? 2 : 1;
    return pentaAssists / requiredPentaAsissts;
  },
};

export default pentaAssist;
