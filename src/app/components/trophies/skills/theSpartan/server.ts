import { TrophyServer } from '../../types';
import base from './base';
import { getLaneOpponent } from '../../../../lib/riot/helpers';

const theSpartan: TrophyServer = {
  ...base,
  checkProgress: ({ match, timeline, participant }) => {
    if (participant.role !== 'SOLO') {
      return 0;
    }
    const frameAt10 = timeline.info.frames[10];
    if (!frameAt10) {
      return 0;
    }
    frameAt10.participantFrames[participant.participantId].xp;
    const xpAt10 =
      frameAt10.participantFrames[participant.participantId].xp || 0;
    const laneOpponent = getLaneOpponent(match.info.participants, participant);

    if (!laneOpponent) {
      return 0;
    }

    const xpAt10OtherLaner =
      frameAt10.participantFrames[laneOpponent.participantId].xp || 0;
    return Number(xpAt10OtherLaner + 1200 <= xpAt10);
  },
};

export default theSpartan;
